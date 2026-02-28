"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ✅ Generate Cover Letter
export async function generateCoverLetter(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  if (!user.industry) {
    throw new Error("Please complete your profile before generating a cover letter.");
  }

  const prompt = `
Write a professional cover letter for a ${data.jobTitle} position at ${data.companyName}.

About the candidate:
- Industry: ${user.industry}
- Years of Experience: ${user.experience || "Not specified"}
- Skills: ${user.skills?.join(", ") || "Not specified"}
- Professional Background: ${user.bio || "Not specified"}

Job Description:
${data.jobDescription}

Requirements:
1. Professional and enthusiastic tone
2. Highlight relevant skills and achievements
3. Show understanding of company needs
4. Maximum 400 words
5. Proper business letter format in markdown
6. Include measurable achievements where possible
7. Align experience with job requirements

Return ONLY the cover letter in markdown format.
`;

  try {
    

    //const content = result.response.text().trim();
   const result = await genAI.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
});

const content = result.text.trim();
    const coverLetter = await db.coverLetter.create({
      data: {
        content,
        jobDescription: data.jobDescription,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        status: "completed",
        userId: user.id,
      },
    });

    return coverLetter;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw new Error("Failed to generate cover letter");
  }
}

// ✅ Get All Cover Letters
export async function getCoverLetters() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return db.coverLetter.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

// ✅ Get Single Cover Letter
export async function getCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return db.coverLetter.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });
}

// ✅ Delete Cover Letter (Safe Version)
export async function deleteCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const existing = await db.coverLetter.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) throw new Error("Cover letter not found");

  return db.coverLetter.delete({
    where: { id },
  });
}