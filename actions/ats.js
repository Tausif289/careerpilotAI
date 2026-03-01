"use server";

import { GoogleGenAI } from "@google/genai";
import { auth, currentUser } from "@clerk/nextjs/server";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function getCurrentUserEmail() {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await currentUser();
  return user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
    ?.emailAddress;
}

/**
 * Analyze resume + job description using Gemini AI SDK
 */
export async function analyzeATS({ resume, jd }) {
  if (!resume || !jd) throw new Error("Resume and JD are required");

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const prompt = `
You are a professional ATS and resume analyzer.

Analyze the following resume and job description.
Return ONLY valid JSON in this format:

{
  "score": number (0-100),
  "roleMatch": number (0-100),
  "breakdown": [
    {"category": "Skills", "score": number},
    {"category": "Experience", "score": number},
    {"category": "Education", "score": number},
    {"category": "Keywords", "score": number}
  ],
  "missingKeywords": [array of keywords missing in resume],
  "suggestions": [array of actionable advice],
  "skillGaps": [array of skills to improve],
  "toneSuggestions": [array of readability/tone advice],
  "formattingIssues": [array of formatting issues],
  "tailoredSuggestions": [array of personalized advice],
  "rewrittenSnippets": [
    {"original": "text from resume", "suggested": "optimized text for JD"}
  ],
  "careerAdvice": [array of career growth advice],
  "coverLetter": "A full tailored cover letter"
}

Resume:
"""${resume}"""

Job Description:
"""${jd}"""
`;

  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = result.text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    console.error("Gemini ATS Analysis Error:", err);
    throw new Error("Failed to analyze resume");
  }
}