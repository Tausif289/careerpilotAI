"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
        
        {/* Gradient Glow Background */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500" />

        <CardHeader className="relative">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Performance Trend
          </CardTitle>
          <CardDescription className="text-gray-400">
            AI-powered analysis of your quiz progression
          </CardDescription>
        </CardHeader>

        <CardContent className="relative">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.1} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                />
                
                <YAxis 
                  domain={[0, 100]} 
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                />

                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      return (
                        <div className="bg-black/80 backdrop-blur-lg border border-white/10 rounded-xl p-3 shadow-xl">
                          <p className="text-sm font-semibold text-white">
                            {payload[0].value}%
                          </p>
                          <p className="text-xs text-gray-400">
                            {payload[0].payload.date}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* Gradient Area Under Line */}
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="none"
                  fill="url(#scoreGradient)"
                />

                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="url(#scoreGradient)"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}