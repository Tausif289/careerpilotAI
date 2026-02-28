"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights }) => {
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    median: range.median / 1000,
    max: range.max / 1000,
  }));

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-emerald-400" };
      case "neutral":
        return { icon: LineChart, color: "text-amber-400" };
      case "negative":
        return { icon: TrendingDown, color: "text-rose-400" };
      default:
        return { icon: LineChart, color: "text-gray-400" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd MMM yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="relative min-h-screen  text-white overflow-hidden p-8">

      {/* Animated AI Background */}
      

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-10"
      >
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          AI Industry Intelligence
        </h1>

        <Badge className="border-indigo-500/40 text-indigo-300 bg-indigo-500/10 backdrop-blur-md">
          Updated {lastUpdatedDate}
        </Badge>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Market Outlook */}
        <motion.div whileHover={{ scale: 1.04 }}>
          <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl shadow-indigo-900/30">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="text-gray-400 text-sm">
                Market Outlook
              </CardTitle>
              <OutlookIcon className={`h-5 w-5 ${outlookColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {insights.marketOutlook}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Next update {nextUpdateDistance}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Growth */}
        <motion.div whileHover={{ scale: 1.04 }}>
          <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl shadow-emerald-900/30">
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-gray-400 text-sm">
                Industry Growth
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {insights.growthRate.toFixed(1)}%
              </div>
              <Progress
                value={insights.growthRate}
                className="mt-4 bg-gray-800/60"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Demand */}
        <motion.div whileHover={{ scale: 1.04 }}>
          <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl shadow-blue-900/30">
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-gray-400 text-sm">
                Demand Level
              </CardTitle>
              <BriefcaseIcon className="h-5 w-5 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {insights.demandLevel}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Skills */}
        <motion.div whileHover={{ scale: 1.04 }}>
          <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl shadow-purple-900/30">
            <CardHeader>
              <CardTitle className="text-gray-400 text-sm">
                Top Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {insights.topSkills.map((skill) => (
                <Badge
                  key={skill}
                  className="bg-indigo-600/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-600/40 transition"
                >
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Salary Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-10"
      >
        <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-indigo-900/40">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Salary Intelligence
            </CardTitle>
            <CardDescription className="text-gray-400">
              AI-generated salary benchmarks (USD thousands)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[420px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryData}>
                  <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                  <XAxis stroke="#94a3b8" dataKey="name" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="min" fill="#475569" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="median" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="max" fill="#a855f7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardView;