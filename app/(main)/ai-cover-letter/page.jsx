import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="min-h-screen px-6 md:px-12 py-10 space-y-10">

      {/* HERO HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30">
              <Sparkles className="h-6 w-6 text-indigo-500" />
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              My Cover Letters
            </h1>
          </div>

          <p className="text-muted-foreground max-w-xl">
            Manage and review your AI-generated cover letters.
            Edit, improve, and track your job applications effortlessly.
          </p>
        </div>

        <Link href="/ai-cover-letter/new">
          <Button className="h-12 px-6 text-lg font-semibold rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition-transform shadow-lg">
            <Plus className="h-5 w-5 mr-2" />
            Create New
          </Button>
        </Link>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 md:p-10 shadow-2xl">
        <CoverLetterList coverLetters={coverLetters} />
      </div>

    </div>
  );
}
