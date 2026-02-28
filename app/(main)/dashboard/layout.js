"use client";

import { BarLoader } from "react-spinners";
import { Suspense } from "react";
import { motion } from "framer-motion";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">

    

      {/* Content Wrapper */}
      <div className="px-8 py-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-10"
        >
     <div className="flex flex-col items-center justify-center text-center py-12">
  <h1
    className="text-5xl md:text-6xl font-extrabold tracking-tight 
    bg-gradient-to-r from-white via-indigo-400 to-purple-400 
    bg-clip-text text-transparent"
  >
    The Future of Industry Analytics
  </h1>

  <p className="text-gray-400 mt-4 text-sm md:text-base tracking-wide max-w-2xl">
    Intelligent forecasting. Competitive edge. Zero guesswork.
  </p>
</div>

          {/* AI Indicator */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 
            bg-white/5 backdrop-blur-xl border border-white/10 
            rounded-full shadow-lg shadow-indigo-900/30">
            
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-300">
              AI Active
            </span>
          </div>
        </motion.div>

        {/* Suspense Wrapper */}
        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <BarLoader width={"100%"} color="#6366f1" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-40 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 animate-pulse"
                  />
                ))}
              </div>
            </div>
          }
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {children}
          </motion.div>
        </Suspense>
      </div>
    </div>
  );
}