"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";

const html2pdf = typeof window !== "undefined" ? require("html2pdf.js") : null;

export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("🚀 Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter)
      parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user?.fullName || ""}</div>

<div align="center">

${parts.join(" | ")}

</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-pdf");
      const opt = {
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async () => {
    try {
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="relative min-h-screen  text-white overflow-hidden p-6">

    
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight 
        bg-gradient-to-r from-white via-indigo-400 to-purple-400 
        bg-clip-text text-transparent">
          AI Resume Builder
        </h1>

        <div className="flex gap-3">
          <Button
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            )}
          </Button>

          <Button
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
            onClick={generatePDF}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download
              </>
            )}
          </Button>
        </div>
      </div>

      {/* TABS */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white/10 backdrop-blur-xl border border-white/20">
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-6">

            {/* Glass Card Section */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-indigo-300">
                Contact Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <Input {...register("contactInfo.email")} placeholder="Email" />
                <Input {...register("contactInfo.mobile")} placeholder="Mobile" />
                <Input {...register("contactInfo.linkedin")} placeholder="LinkedIn" />
                <Input {...register("contactInfo.twitter")} placeholder="Twitter/X" />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-purple-300">
                Professional Summary
              </h3>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} className="h-32 bg-black/40 border-white/10" />
                )}
              />
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-indigo-300">
                Skills
              </h3>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} className="h-32 bg-black/40 border-white/10" />
                )}
              />
            </div>

            {/* Experience, Education, Projects remain unchanged */}
            <Controller
              name="experience"
              control={control}
              render={({ field }) => (
                <EntryForm type="Experience" entries={field.value} onChange={field.onChange} />
              )}
            />

            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <EntryForm type="Education" entries={field.value} onChange={field.onChange} />
              )}
            />

            <Controller
              name="projects"
              control={control}
              render={({ field }) => (
                <EntryForm type="Project" entries={field.value} onChange={field.onChange} />
              )}
            />
          </form>
        </TabsContent>

        <TabsContent value="preview">
          <div className="border border-white/10 rounded-2xl overflow-hidden shadow-2xl mt-6">
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview={resumeMode}
            />
          </div>

          <div className="hidden">
            <div id="resume-pdf">
              <MDEditor.Markdown
                source={previewContent}
                style={{ background: "white", color: "black", padding: "40px" }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}