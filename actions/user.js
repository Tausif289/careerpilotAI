"use server";

import { db } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Clerk user not found");

  const email =
    clerkUser.emailAddresses.find(
      (e) => e.id === clerkUser.primaryEmailAddressId
    )?.emailAddress;

  if (!email) throw new Error("Email not found");

  // Find or create user
  let user = await db.user.findFirst({
    where: {
      OR: [
        { clerkUserId: userId },
        { email: email },
      ],
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        clerkUserId: userId,
        email: email,
      },
    });
  } else if (!user.clerkUserId) {
    user = await db.user.update({
      where: { id: user.id },
      data: { clerkUserId: userId },
    });
  }

  try {

    // ✅ 1️⃣ Check industry insight first (NO transaction yet)
    let industryInsight = await db.industryInsight.findUnique({
      where: { industry: data.industry },
    });

    // ✅ 2️⃣ If missing → generate AI OUTSIDE transaction
    let insightsData = null;

    if (!industryInsight) {
      try {
        insightsData = await generateAIInsights(data.industry);
      } catch (error) {
        console.error("Gemini failed:", error);
      }
    }

    // ✅ 3️⃣ Now fast DB transaction only
    const result = await db.$transaction(async (tx) => {

      if (!industryInsight && insightsData) {
        industryInsight = await tx.industryInsight.create({
          data: {
            industry: data.industry,
            ...insightsData,
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      }

      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          industry: data.industry,
          experience: Number(data.experience),
          bio: data.bio,
          skills: data.skills,
        },
      });

      return { updatedUser, industryInsight };
    });

    revalidatePath("/");
    return result.updatedUser;

  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { industry: true },
    });

    return {
      isOnboarded: !!user?.industry,
    };

  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}