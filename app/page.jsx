import React from "react";
import Link from "next/link";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen  from-slate-950 via-slate-900 to-black text-white overflow-hidden">

      
      <HeroSection />

      {/* ================= FEATURES ================= */}
      <section className="w-full  relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Powerful AI Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border border-white/10 bg-white/5 backdrop-blur-xl hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 rounded-2xl"
              >
                <CardContent className="pt-10 pb-10 text-center flex flex-col items-center">
                  <div className="mb-6 p-4 rounded-xl bg-white/10 group-hover:bg-white/20 transition">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="w-full py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">
              Four intelligent steps to accelerate your career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-xl opacity-30 rounded-full"></div>
                  <div className="relative w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-lg">
                    {item.icon}
                  </div>
                </div>

                <p className="text-sm text-indigo-400 font-semibold">
                  Step {index + 1}
                </p>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-gray-400 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* ================= CTA ================= */}
<section className="relative w-full py-32 overflow-hidden">

  {/* Background Gradient (Logo Colors) */}
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400"></div>

  {/* Glow Orbs */}
  <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-white/10 rounded-full blur-[120px]"></div>
  <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-white/10 rounded-full blur-[120px]"></div>

  <div className="relative container mx-auto px-6 text-center">

    {/* Badge */}
    <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full 
        bg-white/20 border border-white/30 text-white text-sm backdrop-blur-md">
      🚀 AI-Powered Career Acceleration
    </div>

    {/* Headline */}
    <h2 className="text-4xl md:text-6xl font-extrabold 
        bg-gradient-to-r from-white via-white/90 to-white/80
        bg-clip-text text-transparent mb-6 leading-tight">
      Design Your Career.
      <br className="hidden md:block" />
      Let AI Engineer Your Success.
    </h2>

    {/* Subtext */}
    <p className="text-white/90 max-w-2xl mx-auto mb-10 text-lg md:text-xl leading-relaxed">
      Unlock intelligent resume building, predictive industry insights,
      and AI-driven interview mastery — all in one powerful platform.
    </p>

    {/* CTA Button */}
    <Link href="/dashboard">
      <Button
        size="lg"
        className="
          group relative px-10 py-6
          rounded-2xl
          bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500
          text-white font-semibold tracking-wide
          shadow-[0_15px_40px_rgba(139,92,246,0.5)]
          hover:shadow-[0_20px_60px_rgba(139,92,246,0.6)]
          hover:scale-105
          transition-all duration-300
          overflow-hidden
        "
      >
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300 blur-xl"></span>

        Activate My AI Career System
        <ArrowRight className="ml-3 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Link>

    {/* Small trust text */}
    <p className="mt-6 text-sm text-white/70">
      No credit card required • Start free • Upgrade anytime
    </p>

  </div>
</section>

  {/* ================= TESTIMONIALS ================= */}
<section className="relative w-full py-24 overflow-hidden">
  <div className="relative container mx-auto px-6">

    {/* Section Header */}
    <div className="text-center max-w-3xl mx-auto mb-20">
      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
        Trusted by Ambitious Professionals
      </h2>
      <p className="text-gray-400">
        See how CareerPilot AI is transforming careers worldwide
      </p>
    </div>

    {/* Testimonials Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

      {testimonial.map((item, index) => (
        <Card
          key={index}
          className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
        >
          <CardContent className="p-0">

            {/* Stars */}
            <div className="flex mb-4 text-indigo-400">
              {"★★★★★"}
            </div>

            {/* Quote */}
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              “{item.quote}”
            </p>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.author}
                className="w-12 h-12 rounded-full object-cover border border-white/20"
              />
              <div>
                <p className="text-white font-semibold text-sm">
                  {item.author}
                </p>
                <p className="text-gray-400 text-xs">
                  {item.role}{item.company ? `, ${item.company}` : ""}
                </p>
              </div>
            </div>

          </CardContent>
        </Card>
      ))}

    </div>
  </div>
</section>

    </div>
  );
}