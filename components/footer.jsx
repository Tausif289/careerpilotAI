import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="
        relative mt-24 overflow-hidden
        bg-slate-950/80 backdrop-blur-xl
        border-t border-white/10
        shadow-lg shadow-black/20
      "
    >
      {/* 🔥 Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-indigo-600/20 blur-[150px] rounded-full top-[-150px] left-[-150px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[130px] rounded-full bottom-[-150px] right-[-150px]" />
      </div>

      <div className="relative container mx-auto px-6 py-16">
        {/* Top Grid */}
        <div className="grid md:grid-cols-4 gap-10 text-gray-300">
          
          {/* Brand Section */}
          <div>
            <Link href="/" className="group">
              <h1
                className="
                  text-3xl md:text-4xl 
                  font-extrabold tracking-tight 
                  bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
                  bg-clip-text text-transparent
                  drop-shadow-sm
                  transition-all duration-300 
                  group-hover:scale-105
                "
              >
                Career<span className="text-white">Pilot</span>
                <span
                  className="
                    ml-2 px-2 py-0.5 text-xs md:text-sm font-bold 
                    bg-gradient-to-r from-indigo-500 to-purple-500 
                    text-white rounded-md shadow-md
                  "
                >
                  AI
                </span>
              </h1>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Empowering ambitious professionals with AI-driven career intelligence,
              smart resume engineering, and predictive growth insights.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-indigo-400 transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-indigo-400 transition">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/ai-cover-letter" className="hover:text-indigo-400 transition">
                  AI Cover Letter
                </Link>
              </li>
              <li>
                <Link href="/interview" className="hover:text-indigo-400 transition">
                  Interview Prep
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-indigo-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-indigo-400 transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-indigo-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="p-2 rounded-xl bg-white/5 hover:bg-indigo-600/30 transition"
              >
                <Twitter className="h-5 w-5 text-gray-300 hover:text-white transition" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-xl bg-white/5 hover:bg-indigo-600/30 transition"
              >
                <Linkedin className="h-5 w-5 text-gray-300 hover:text-white transition" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-xl bg-white/5 hover:bg-indigo-600/30 transition"
              >
                <Github className="h-5 w-5 text-gray-300 hover:text-white transition" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CareerPilot AI.
          <span className="text-gray-400"> All rights reserved.</span>
          <div className="mt-2 text-xs text-gray-600">
            Designed for professionals who think ahead.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;