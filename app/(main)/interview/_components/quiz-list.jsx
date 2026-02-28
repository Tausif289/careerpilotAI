"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult from "./quiz-result";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">

          {/* Gradient Glow Background */}
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500" />

          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Recent Quizzes
                </CardTitle>
                <CardDescription className="text-gray-400">
                  AI-generated insights from your previous attempts
                </CardDescription>
              </div>

              <Button
                onClick={() => router.push("/interview/mock")}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition rounded-full px-6"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Start New Quiz
              </Button>
            </div>
          </CardHeader>

          <CardContent className="relative">
            <div className="space-y-4">
              {assessments?.map((assessment, i) => (
                <motion.div
                  key={assessment.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Card
                    className="cursor-pointer bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/40 transition-all duration-300 rounded-xl shadow-md"
                    onClick={() => setSelectedQuiz(assessment)}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-2xl font-semibold">
                        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                          Quiz {i + 1}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-gray-400" />
                      </CardTitle>

                      <CardDescription className="flex justify-between w-full text-gray-400 text-sm">
                        <div className="font-medium text-white">
                          {assessment.quizScore.toFixed(1)}%
                        </div>
                        <div>
                          {format(
                            new Date(assessment.createdAt),
                            "MMMM dd, yyyy HH:mm"
                          )}
                        </div>
                      </CardDescription>
                    </CardHeader>

                    {assessment.improvementTip && (
                      <CardContent>
                        <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-sm text-gray-300">
                          💡 {assessment.improvementTip}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Dialog */}
      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Quiz Performance Details
            </DialogTitle>
          </DialogHeader>

          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}