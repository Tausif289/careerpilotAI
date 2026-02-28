"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Eye,
  Trash2,
  Sparkles,
  Calendar,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteCoverLetter } from "@/actions/cover-letter";

export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  if (!coverLetters?.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center shadow-xl">
        <div className="flex justify-center mb-4">
          <Sparkles className="h-8 w-8 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">
          No Cover Letters Yet
        </h2>
        <p className="text-muted-foreground">
          Start generating AI-powered cover letters to stand out.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {coverLetters.map((letter, index) => (
        <motion.div
          key={letter.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl hover:border-indigo-500/40 transition-all duration-300"
        >
          {/* Header Section */}
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {letter.jobTitle}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {letter.companyName}
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(letter.createdAt), "PPP")}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition">
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-indigo-500/10"
                onClick={() =>
                  router.push(`/ai-cover-letter/${letter.id}`)
                }
              >
                <Eye className="h-4 w-4" />
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete Cover Letter?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete your cover letter
                      for {letter.jobTitle} at {letter.companyName}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(letter.id)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {/* Preview Text */}
          <div className="mt-4 text-sm text-muted-foreground line-clamp-3">
            {letter.jobDescription}
          </div>
        </motion.div>
      ))}
    </div>
  );
}