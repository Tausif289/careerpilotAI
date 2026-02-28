"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, PlayCircle } from "lucide-react";
const HeroSection = () => {
  return (
    <section className="relative w-full pt-40 pb-20 overflow-hidden">

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 from-indigo-50 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-black" />

      {/* Glow Effects */}


      <div className="container mx-auto px-6 text-center">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight"
        >
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Unlock Your Career Potential
          </span>
          <br />
          with Intelligent AI Guidance
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground"
        >
          From resume optimization to interview mastery, our AI-driven platform
          delivers personalized strategies that accelerate your professional growth.
        </motion.p>

        {/* Subtext */}


        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-8 flex justify-center gap-4 flex-wrap"
        >


          {/* Primary CTA */}
          <Link href="/dashboard">
            <Button
              size="lg"
              className="
      group relative px-10 py-6
      rounded-2xl
      bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600
      text-white font-semibold tracking-wide
      shadow-[0_10px_30px_rgba(99,102,241,0.4)]
      hover:shadow-[0_15px_40px_rgba(99,102,241,0.6)]
      hover:scale-105
      transition-all duration-300
      overflow-hidden
    "
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300 blur-xl"></span>

              <Sparkles className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">
                Launch Your AI Career Journey
              </span>
            </Button>
          </Link>

          {/* Secondary CTA */}
         <Link href="/interview">
  <Button
    size="lg"
    variant="outline"
    className="
      group px-10 py-6
      rounded-2xl
      border border-white/20
      bg-white/5 backdrop-blur-lg
      text-gray-200 font-semibold tracking-wide
      hover:bg-white/10
      hover:scale-105
      hover:border-indigo-400
      transition-all duration-300
    "
  >
    <PlayCircle className="w-5 h-5 mr-2 text-indigo-400 group-hover:text-indigo-300 transition" />
    Prepare with AI-Powered Pilot
  </Button>
</Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="relative mt-16 flex justify-center"
        >
          <div className="relative group">

            {/* Floating Glow Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border">
              <Image
                src="/aiimage.webp"
                width={1280}
                height={720}
                alt="Dashboard Preview"
                className="rounded-2xl group-hover:scale-[1.02] transition duration-500"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;