"use client";

import { useState } from "react";
import { analyzeATS } from "@/actions/ats";

export default function ATSCheckerPage() {
  const [resume, setResume] = useState("");
  const [jd, setJD] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!resume || !jd) return alert("Please paste Resume and Job Description");

    setLoading(true);
    setResult(null);

    try {
      const data = await analyzeATS({ resume, jd });
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while analyzing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen from-[#0f172a] via-[#111827] to-[#1e293b] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 px-4 md:px-0">
  <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
    AI-Powered ATS Checker
  </h1>
  <p className="text-gray-400 mt-4 text-lg md:text-xl max-w-xl mx-auto">
    Check how well your resume matches the job description and optimize it for success.
  </p>
</div>


        {/* Input Areas */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-blue-400">Your Resume</h2>
            <textarea
              placeholder="Paste your resume..."
              className="w-full h-72 bg-transparent border border-white/20 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-purple-400">Job Description</h2>
            <textarea
              placeholder="Paste job description..."
              className="w-full h-72 bg-transparent border border-white/20 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={jd}
              onChange={(e) => setJD(e.target.value)}
            />
          </div>
        </div>

        {/* Analyze Button */}
        <div className="text-center mt-10">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="px-10 py-4 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition transform duration-200 shadow-lg"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl space-y-12">
            {/* ATS Score & Role Match */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 justify-center">
              <div className="flex flex-col items-center">
                <div className="relative w-44 h-44">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="88" cy="88" r="75" stroke="#374151" strokeWidth="15" fill="transparent"/>
                    <circle
                      cx="88"
                      cy="88"
                      r="75"
                      stroke="#3b82f6"
                      strokeWidth="15"
                      fill="transparent"
                      strokeDasharray="471"
                      strokeDashoffset={471 - (471 * result.score)/100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
                    {result.score}%
                  </div>
                </div>
                <p className="text-gray-400 mt-4">ATS Compatibility Score</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-gray-300 text-lg">
                  Role Match: <span className="font-bold text-white">{result.roleMatch}%</span>
                </p>
              </div>
            </div>

            {/* Keywords, Suggestions & Skill Gaps */}
            <div className="grid md:grid-cols-3 gap-10">
              <div>
                <h3 className="text-xl font-semibold text-red-400 mb-4">Missing Keywords</h3>
                <div className="flex flex-wrap gap-3">
                  {result.missingKeywords?.map((word, i) => (
                    <span key={i} className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm">{word}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-4">AI Suggestions</h3>
                <ul className="space-y-3">
                  {result.suggestions?.map((item, i) => (
                    <li key={i} className="bg-green-500/20 p-3 rounded-lg text-sm">{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-4">Skill Gaps</h3>
                <ul className="flex flex-wrap gap-3">
                  {result.skillGaps?.map((skill, i) => (
                    <li key={i} className="bg-yellow-500/20 px-4 py-2 rounded-full text-sm">{skill}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tone & Formatting */}
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-semibold text-indigo-400 mb-4">Readability & Tone</h3>
                <ul className="space-y-2">
                  {result.toneSuggestions?.map((item, i) => (
                    <li key={i} className="bg-indigo-500/20 p-3 rounded-lg text-sm">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-pink-400 mb-4">Formatting Issues</h3>
                <ul className="space-y-2">
                  {result.formattingIssues?.map((item, i) => (
                    <li key={i} className="bg-pink-500/20 p-3 rounded-lg text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tailored Suggestions */}
            {result.tailoredSuggestions?.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-teal-400 mb-4">Tailored Resume Suggestions</h3>
                <ul className="space-y-2">
                  {result.tailoredSuggestions.map((item, i) => (
                    <li key={i} className="bg-teal-500/20 p-3 rounded-lg text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Optimized Resume Snippets */}
            {result.rewrittenSnippets?.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Optimized Resume Snippets</h3>
                <ul className="space-y-3">
                  {result.rewrittenSnippets.map((item, i) => (
                    <li key={i} className="bg-blue-500/20 p-3 rounded-lg text-sm">
                      <strong>Original:</strong> {item.original} <br/>
                      <strong>Suggested:</strong> {item.suggested}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Career Growth Advice */}
            {result.careerAdvice?.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-orange-400 mb-4">Career Growth Suggestions</h3>
                <ul className="space-y-2">
                  {result.careerAdvice.map((item, i) => (
                    <li key={i} className="bg-orange-500/20 p-3 rounded-lg text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Generated Cover Letter */}
            {result.coverLetter && (
              <div>
                <h3 className="text-xl font-semibold text-purple-300 mb-4">Generated Cover Letter</h3>
                <textarea
                  className="w-full h-72 bg-transparent border border-white/20 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={result.coverLetter}
                  readOnly
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}