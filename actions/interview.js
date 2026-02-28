"use server";

import { db } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ✅ Helper to always get DB user safely
async function getCurrentDbUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email =
    clerkUser.emailAddresses.find(
      (e) => e.id === clerkUser.primaryEmailAddressId
    )?.emailAddress;

  if (!email) return null;

  return await db.user.upsert({
    where: { email },
    update: { clerkUserId: userId },
    create: {
      email,
      clerkUserId: userId,
    },
  });
}

export async function generateQuiz() {
  const user = await getCurrentDbUser();
  if (!user) throw new Error("Unauthorized");

  const prompt = `
Generate 10 technical interview questions for a ${
    user.industry || "technology"
  } professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }.

Each question must be multiple choice with 4 options.

Return ONLY valid JSON:
{
  "questions": [
    {
      "question": "string",
      "options": ["string","string","string","string"],
      "correctAnswer": "string",
      "explanation": "string"
    }
  ]
}
`;

  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = result.text;

    const cleanedText = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const quiz = JSON.parse(cleanedText);

    return quiz.questions || [];
  } catch (error) {
    console.error("Error generating quiz:", error);
    return [];
  }
}

export async function saveQuizResult(questions, answers, score) {
  const user = await getCurrentDbUser();
  if (!user) throw new Error("Unauthorized");

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  let improvementTip = null;

  if (wrongAnswers.length > 0) {
    try {
      const wrongQuestionsText = wrongAnswers
        .map(
          (q) =>
            `Question: "${q.question}"\nCorrect: "${q.answer}"\nUser: "${q.userAnswer}"`
        )
        .join("\n\n");

      const tipPrompt = `
Provide a short improvement tip (max 2 sentences)
for a ${user.industry || "technical"} candidate based on:

${wrongQuestionsText}
`;

      const tipResult = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: tipPrompt,
      });

      improvementTip = tipResult.text.trim();
    } catch (err) {
      console.error("Tip generation failed:", err);
    }
  }

  try {
    return await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });
  } catch (error) {
    console.error("Error saving quiz:", error);
    throw new Error("Failed to save quiz result");
  }
}

export async function getAssessments() {
  const user = await getCurrentDbUser();
  if (!user) return [];

  try {
    return await db.assessment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching assessments:", error);
    return [];
  }
}