"use client";

import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import { motion } from "framer-motion";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen  text-white overflow-hidden">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-12">



        {/* 🔄 Suspense Loader */}
        <Suspense
          fallback={
            <div className="space-y-6">
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
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </Suspense>
      </div>
    </div>
  );
}