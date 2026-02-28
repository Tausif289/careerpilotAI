"use client";

import { useEffect, useState } from "react";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Sparkles,
  TrendingUp,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (!result) return;

    let start = 0;
    const end = result.quizScore;
    const duration = 1000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setAnimatedScore(start);
    }, 16);

    return () => clearInterval(timer);
  }, [result]);

  if (!result) return null;

  const getPerformanceLabel = () => {
    if (result.quizScore >= 85) return "Outstanding Performance 🚀";
    if (result.quizScore >= 70) return "Strong Performance 💪";
    if (result.quizScore >= 50) return "Good Effort 👍";
    return "Keep Practicing 📚";
  };

  const getScoreGradient = () => {
    if (result.quizScore >= 85)
      return "from-emerald-400 to-teal-500";
    if (result.quizScore >= 70)
      return "from-blue-400 to-indigo-500";
    if (result.quizScore >= 50)
      return "from-yellow-400 to-orange-500";
    return "from-red-400 to-pink-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl space-y-8"
    >
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 shadow-md">
          <Trophy className="h-8 w-8 text-yellow-500" />
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
            Quiz Results
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered performance breakdown
          </p>
        </div>
      </div>

      {/* MAIN CARD */}
      <CardContent className="space-y-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        {/* SCORE SECTION */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="flex flex-col items-center space-y-5"
        >
          {/* Animated Score Circle */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${getScoreGradient()} blur-xl opacity-40`}
            />
            <div className="relative bg-background rounded-full w-36 h-36 flex items-center justify-center shadow-inner">
              <span className="text-4xl font-extrabold">
                {animatedScore.toFixed(0)}%
              </span>
            </div>
          </div>

          <Progress value={result.quizScore} className="h-3 w-full max-w-lg" />

          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            {getPerformanceLabel()}
          </div>
        </motion.div>

        {/* IMPROVEMENT TIP */}
        {result.improvementTip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <p className="font-semibold text-indigo-400">
                AI Improvement Suggestion
              </p>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {result.improvementTip}
            </p>
          </motion.div>
        )}

        {/* QUESTIONS */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">
              Detailed Question Review
            </h3>
          </div>

          {result.questions.map((q, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4 hover:shadow-xl hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium text-base">
                  {index + 1}. {q.question}
                </p>

                {q.isCorrect ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <span className="font-medium">Your answer:</span>{" "}
                  {q.userAnswer}
                </p>

                {!q.isCorrect && (
                  <p>
                    <span className="font-medium">Correct answer:</span>{" "}
                    {q.answer}
                  </p>
                )}
              </div>

              <div className="text-sm bg-muted/50 p-4 rounded-xl">
                <p className="font-medium mb-1">Explanation</p>
                <p className="text-muted-foreground leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter>
          <Button
            onClick={onStartNew}
            className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] transition-transform duration-200 shadow-lg"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </motion.div>
  );
}