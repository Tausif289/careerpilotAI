"use client";

import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  const cards = [
    {
      title: "Average Score",
      value: `${getAverageScore()}%`,
      subtitle: "Across all assessments",
      icon: Trophy,
      glow: "from-yellow-400 to-orange-500",
    },
    {
      title: "Questions Practiced",
      value: getTotalQuestions(),
      subtitle: "Total questions solved",
      icon: Brain,
      glow: "from-indigo-400 to-purple-500",
    },
    {
      title: "Latest Score",
      value: `${getLatestAssessment()?.quizScore.toFixed(1) || 0}%`,
      subtitle: "Most recent performance",
      icon: Target,
      glow: "from-emerald-400 to-cyan-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03]">
              
              {/* Glow Background */}
              <div
                className={`absolute inset-0 opacity-10 bg-gradient-to-br ${card.glow}`}
              />

              <CardContent className="relative p-6">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-400 tracking-wide">
                    {card.title}
                  </p>

                  <div
                    className={`p-2 rounded-xl bg-gradient-to-br ${card.glow}`}
                  >
                    <Icon className="h-5 w-5 text-black" />
                  </div>
                </div>

                {/* Value */}
                <div className="text-4xl font-extrabold bg-gradient-to-r from-white via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  {card.value}
                </div>

                {/* Subtitle */}
                <p className="text-xs text-gray-500 mt-2">
                  {card.subtitle}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}