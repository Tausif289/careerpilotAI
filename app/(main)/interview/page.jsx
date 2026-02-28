import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/stats-cards";
import QuizList from "./_components/quiz-list";
import PerformanceChart from "./_components/performancechart";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();

  return (
    <div className="relative min-h-screen overflow-hidden">

     

      {/* Page Header */}
      <div className="mb-12 text-center md:text-left">
        <h1
          className="text-5xl md:text-6xl font-extrabold tracking-tight
          bg-gradient-to-r from-white via-indigo-400 to-purple-500
          bg-clip-text text-transparent animate-gradient-x"
        >
          AI-Powered Interview Preparation
        </h1>

        <p className="mt-4 text-gray-400 text-lg max-w-3xl">
          Smart analytics. Performance tracking. Intelligent feedback.  
          Master your interviews with data-driven precision.
        </p>

        {/* Decorative Divider */}
        <div className="mt-6 h-[2px] w-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto md:mx-0" />
      </div>

      {/* Dashboard Content */}
      <div className="space-y-10">

        {/* Stats Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 
        rounded-2xl p-6 shadow-xl hover:shadow-indigo-500/10 transition-all">
          <StatsCards assessments={assessments} />
        </div>

        {/* Performance Chart */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 
        rounded-2xl p-6 shadow-xl hover:shadow-purple-500/10 transition-all">
          <div className="mb-4">
            <h2 className="text-xl font-semibold 
            bg-gradient-to-r from-indigo-400 to-purple-400 
            bg-clip-text text-transparent">
              Performance Intelligence
            </h2>
            <p className="text-sm text-gray-400">
              Visual insights into your assessment progress and improvement trends.
            </p>
          </div>

          <PerformanceChart assessments={assessments} />
        </div>

        {/* Quiz List */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 
        rounded-2xl p-6 shadow-xl hover:shadow-indigo-500/10 transition-all">
          <div className="mb-4">
            <h2 className="text-xl font-semibold 
            bg-gradient-to-r from-indigo-400 to-purple-400 
            bg-clip-text text-transparent">
              Practice Assessments
            </h2>
            <p className="text-sm text-gray-400">
              Strengthen weak areas and simulate real interview environments.
            </p>
          </div>

          <QuizList assessments={assessments} />
        </div>
      </div>
    </div>
  );
}
