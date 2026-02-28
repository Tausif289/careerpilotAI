"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  };

  if (generatingQuiz) {
    return (
      <div className="px-2 mt-6">
        <BarLoader width={"100%"} color="#6366f1" />
      </div>
    );
  }

  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (!quizData) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card className="mx-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Ready to test your knowledge?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              This AI-powered quiz contains 10 personalized questions based on
              your industry and skills. Choose wisely and unlock insights.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={generateQuizFn}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 rounded-full"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Start Quiz
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  const question = quizData[currentQuestion];
  const progress =
    ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="mx-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden">

        {/* Progress Bar */}
        <div className="h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white">
            Question {currentQuestion + 1} of {quizData.length}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-lg font-medium text-white">
            {question.question}
          </p>

          <RadioGroup
            onValueChange={handleAnswer}
            value={answers[currentQuestion]}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer border border-white/10"
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="cursor-pointer text-gray-300"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30"
            >
              <p className="font-semibold text-indigo-300">
                AI Explanation
              </p>
              <p className="text-gray-300 mt-2">
                {question.explanation}
              </p>
            </motion.div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {!showExplanation && (
            <Button
              onClick={() => setShowExplanation(true)}
              variant="outline"
              disabled={!answers[currentQuestion]}
              className="border-white/20 hover:bg-white/10"
            >
              Show Explanation
            </Button>
          )}

          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion] || savingResult}
            className="ml-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 rounded-full px-6"
          >
            {currentQuestion < quizData.length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}