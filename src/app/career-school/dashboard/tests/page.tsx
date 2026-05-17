"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  FileText,
  Play,
  Trophy,
  ChevronDown,
  ChevronUp,
  Tag,
} from "lucide-react";

const availableTests = [
  {
    id: 1,
    title: "Quantitative Aptitude - Set A",
    category: "Aptitude",
    duration: "45 min",
    questions: 30,
  },
  {
    id: 2,
    title: "Data Structures & Algorithms",
    category: "Coding",
    duration: "60 min",
    questions: 25,
  },
  {
    id: 3,
    title: "Verbal Ability & Reading Comprehension",
    category: "Verbal",
    duration: "30 min",
    questions: 40,
  },
  {
    id: 4,
    title: "Logical Reasoning - Advanced",
    category: "Reasoning",
    duration: "40 min",
    questions: 20,
  },
  {
    id: 5,
    title: "System Design Fundamentals",
    category: "Coding",
    duration: "90 min",
    questions: 15,
  },
];

const myResults = [
  {
    id: 1,
    name: "Quantitative Aptitude - Set A",
    category: "Aptitude",
    score: 85,
    date: "2026-05-10",
    sections: [
      { name: "Arithmetic", score: 90, total: 10 },
      { name: "Algebra", score: 80, total: 10 },
      { name: "Geometry", score: 85, total: 10 },
    ],
  },
  {
    id: 2,
    name: "Data Structures & Algorithms",
    category: "Coding",
    score: 72,
    date: "2026-05-08",
    sections: [
      { name: "Arrays & Strings", score: 80, total: 8 },
      { name: "Trees & Graphs", score: 60, total: 9 },
      { name: "Dynamic Programming", score: 75, total: 8 },
    ],
  },
  {
    id: 3,
    name: "Verbal Ability",
    category: "Verbal",
    score: 55,
    date: "2026-05-05",
    sections: [
      { name: "Grammar", score: 70, total: 15 },
      { name: "Reading Comprehension", score: 40, total: 15 },
      { name: "Vocabulary", score: 55, total: 10 },
    ],
  },
  {
    id: 4,
    name: "Logical Reasoning - Basic",
    category: "Reasoning",
    score: 92,
    date: "2026-05-01",
    sections: [
      { name: "Patterns", score: 95, total: 7 },
      { name: "Puzzles", score: 90, total: 7 },
      { name: "Deductions", score: 90, total: 6 },
    ],
  },
];

const leaderboard = [
  { rank: 1, name: "Priya Sharma", score: 94, avatar: "PS" },
  { rank: 2, name: "Rahul Verma", score: 91, avatar: "RV" },
  { rank: 3, name: "Anita Das", score: 88, avatar: "AD" },
  { rank: 4, name: "Vikram Singh", score: 85, avatar: "VS" },
  { rank: 5, name: "Neha Gupta", score: 83, avatar: "NG" },
];

const categoryColors: Record<string, string> = {
  Aptitude: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Coding:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Verbal:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Reasoning:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
};

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 70
      ? "text-green-600 dark:text-green-400"
      : "text-amber-600 dark:text-amber-400";
  return <span className={`font-bold ${color}`}>{score}%</span>;
}

export default function TestsPage() {
  const [activeTab, setActiveTab] = useState<"available" | "results">(
    "available"
  );
  const [expandedResult, setExpandedResult] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Tests & Results
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Take tests and track your performance
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["available", "results"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {tab === "available" ? "Available Tests" : "My Results"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "available" && (
          <motion.div
            key="available"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            {availableTests.map((test, i) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {test.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[test.category]}`}
                    >
                      {test.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {test.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText size={14} /> {test.questions} questions
                    </span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                  <Play size={14} /> Start Test
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Results Table */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="text-left px-5 py-3 font-medium text-slate-600 dark:text-slate-400">
                        Test Name
                      </th>
                      <th className="text-left px-5 py-3 font-medium text-slate-600 dark:text-slate-400">
                        Category
                      </th>
                      <th className="text-left px-5 py-3 font-medium text-slate-600 dark:text-slate-400">
                        Score
                      </th>
                      <th className="text-left px-5 py-3 font-medium text-slate-600 dark:text-slate-400">
                        Date
                      </th>
                      <th className="px-5 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {myResults.map((result) => (
                      <tr key={result.id}>
                        <td className="px-5 py-4 text-slate-900 dark:text-white font-medium">
                          {result.name}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[result.category]}`}
                          >
                            {result.category}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <ScoreBadge score={result.score} />
                        </td>
                        <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                          {result.date}
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() =>
                              setExpandedResult(
                                expandedResult === result.id
                                  ? null
                                  : result.id
                              )
                            }
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                          >
                            {expandedResult === result.id ? (
                              <ChevronUp size={18} />
                            ) : (
                              <ChevronDown size={18} />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Expanded Section Analysis */}
              <AnimatePresence>
                {expandedResult && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 px-5 py-4"
                  >
                    <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Section-wise Analysis
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {myResults
                        .find((r) => r.id === expandedResult)
                        ?.sections.map((section) => (
                          <div
                            key={section.name}
                            className="rounded-lg bg-white dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-700"
                          >
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {section.name}
                            </p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">
                              {section.score}%
                            </p>
                            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1">
                              <div
                                className={`h-full rounded-full ${section.score >= 70 ? "bg-green-500" : "bg-amber-500"}`}
                                style={{ width: `${section.score}%` }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Leaderboard */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={20} className="text-amber-500" />
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Leaderboard - Top 5
                </h3>
              </div>
              <div className="space-y-3">
                {leaderboard.map((student, i) => (
                  <motion.div
                    key={student.rank}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        student.rank === 1
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                          : student.rank === 2
                            ? "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                            : student.rank === 3
                              ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {student.rank}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                      {student.avatar}
                    </div>
                    <span className="flex-1 font-medium text-slate-900 dark:text-white text-sm">
                      {student.name}
                    </span>
                    <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                      {student.score}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
