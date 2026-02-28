"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/quiz";
import { motion } from "framer-motion";

export default function MockInterviewPage() {
  return (
    <div className="relative min-h-screen py-10 px-4">

      {/* Background Glow Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl space-y-8">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-4"
        >
          <Link href="/interview">
            <Button
              variant="ghost"
              className="gap-2 pl-0 text-muted-foreground hover:text-white transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Interview Preparation
            </Button>
          </Link>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm w-fit">
              <Sparkles className="h-4 w-4" />
              AI-Powered Mock Interview
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Mock Interview
            </h1>

            <p className="text-muted-foreground text-lg max-w-2xl">
              Challenge yourself with intelligent, industry-specific questions
              designed to simulate real interview scenarios.
            </p>
          </div>
        </motion.div>

        {/* Quiz Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-8 shadow-2xl"
        >
          <Quiz />
        </motion.div>
      </div>
    </div>
  );
}