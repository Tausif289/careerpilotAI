import { UserPlus, FileEdit, Users, LineChart } from "lucide-react";

export const howItWorks = [
  {
    title: "AI-Powered Profile Intelligence",
    description:
      "Our system analyzes your background, skills, and career goals to build a dynamic professional blueprint tailored to your growth trajectory.",
    icon: <UserPlus className="w-8 h-8 text-indigo-400" />,
  },
  {
    title: "Smart Resume & Document Generation",
    description:
      "Generate ATS-optimized resumes and high-converting cover letters using advanced language models trained on real hiring patterns.",
    icon: <FileEdit className="w-8 h-8 text-indigo-400" />,
  },
  {
    title: "Adaptive Interview Simulation",
    description:
      "Experience real-time AI mock interviews that adapt to your responses and simulate company-specific hiring scenarios.",
    icon: <Users className="w-8 h-8 text-indigo-400" />,
  },
  {
    title: "Predictive Career Analytics",
    description:
      "Track performance insights, skill gaps, and hiring probability with intelligent analytics designed to maximize your success rate.",
    icon: <LineChart className="w-8 h-8 text-indigo-400" />,
  },
];