import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Menu } from "lucide-react";
import { checkUser } from "@/lib/checkuser";

const Header = async () => {
  await checkUser();

  return (
    <header
      className="fixed top-0 w-full z-50 
        bg-slate-950/80 backdrop-blur-xl 
        border-b border-white/10 
        shadow-lg shadow-black/20"
    >
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
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
              className="ml-2 px-2 py-0.5 text-xs md:text-sm font-bold 
                bg-gradient-to-r from-indigo-500 to-purple-500 
                text-white rounded-md shadow-md"
            >
              AI
            </span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <SignedIn>
            {[
              { name: "Dashboard", href: "/dashboard" },
              { name: "Resume Builder", href: "/resume" },
              { name: "Cover Letter", href: "/ai-cover-letter" },
              { name: "Interview Prep", href: "/interview" },
              { name: "ATS Checker", href: "/ats-checker" }, // NEW LINK
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  relative px-4 py-2
                  text-base font-semibold tracking-wide
                  text-gray-200
                  transition-all duration-300
                  hover:text-white
                  hover:scale-105

                  after:absolute after:left-0 after:-bottom-1
                  after:h-[3px] after:w-0
                  after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500
                  after:rounded-full
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                {link.name}
              </Link>
            ))}
          </SignedIn>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <SignedIn>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-300">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 rounded-2xl 
                    bg-slate-900 border border-white/10 
                    shadow-2xl shadow-black/40 p-2"
                >
                  {[
                    { name: "Dashboard", href: "/dashboard" },
                    { name: "Resume Builder", href: "/resume" },
                    { name: "Cover Letter", href: "/ai-cover-letter" },
                    { name: "Interview Prep", href: "/interview" },
                    { name: "ATS Checker", href: "/ats-checker" }, // NEW LINK
                  ].map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href} className="hover:text-indigo-400">
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedIn>
          </div>

          {/* Auth Buttons */}
          <SignedOut>
            <SignInButton>
              <Button
                variant="outline"
                className="rounded-xl border-white/20 
                  text-gray-300 hover:bg-white/10 
                  hover:border-indigo-500 transition"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-950",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;