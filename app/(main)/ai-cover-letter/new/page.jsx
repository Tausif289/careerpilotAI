import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterGenerator from "../_components/cover-letter-generator";

export default function NewCoverLetterPage() {
  return (
    <div className="min-h-screen px-6 md:px-12 py-10 space-y-10">

      {/* Header Section */}
      <div className="space-y-6">

        <Link href="/ai-cover-letter">
          <Button
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30">
            <Sparkles className="h-6 w-6 text-indigo-500" />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Create Cover Letter
            </h1>

            <p className="text-muted-foreground max-w-2xl">
              Generate a tailored, AI-powered cover letter customized to the
              job role, company, and your professional experience.
            </p>
          </div>
        </div>
      </div>

      {/* Generator Container */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 md:p-10 shadow-2xl">
        <CoverLetterGenerator />
      </div>

    </div>
  );
}