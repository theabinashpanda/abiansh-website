"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Award, Send } from "lucide-react";

interface StudentScore {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
}

interface TestResult {
  id: number;
  testName: string;
  category: string;
  totalSubmissions: number;
  averageScore: number;
  published: boolean;
  date: string;
  students: StudentScore[];
}

const mockResults: TestResult[] = [
  {
    id: 1,
    testName: "DSA Fundamentals Quiz",
    category: "Technical",
    totalSubmissions: 45,
    averageScore: 72,
    published: true,
    date: "2026-05-15",
    students: [
      { name: "Arjun Sharma", score: 88, maxScore: 100, percentage: 88 },
      { name: "Karthik Nair", score: 76, maxScore: 100, percentage: 76 },
      { name: "Divya Patel", score: 92, maxScore: 100, percentage: 92 },
      { name: "Neha Reddy", score: 65, maxScore: 100, percentage: 65 },
    ],
  },
  {
    id: 2,
    testName: "Aptitude Test - Batch A",
    category: "Aptitude",
    totalSubmissions: 38,
    averageScore: 68,
    published: true,
    date: "2026-05-12",
    students: [
      { name: "Priya Mehta", score: 82, maxScore: 100, percentage: 82 },
      { name: "Amit Kumar", score: 71, maxScore: 100, percentage: 71 },
      { name: "Rohit Das", score: 58, maxScore: 100, percentage: 58 },
    ],
  },
  {
    id: 3,
    testName: "Communication Skills Assessment",
    category: "Soft Skills",
    totalSubmissions: 52,
    averageScore: 78,
    published: false,
    date: "2026-05-10",
    students: [
      { name: "Meera Joshi", score: 90, maxScore: 100, percentage: 90 },
      { name: "Arjun Sharma", score: 85, maxScore: 100, percentage: 85 },
      { name: "Ananya Roy", score: 72, maxScore: 100, percentage: 72 },
    ],
  },
  {
    id: 4,
    testName: "Mock Interview Evaluation",
    category: "Interview Prep",
    totalSubmissions: 25,
    averageScore: 74,
    published: false,
    date: "2026-05-08",
    students: [
      { name: "Vikram Singh", score: 88, maxScore: 100, percentage: 88 },
      { name: "Sneha Gupta", score: 79, maxScore: 100, percentage: 79 },
    ],
  },
  {
    id: 5,
    testName: "System Design Basics",
    category: "Technical",
    totalSubmissions: 30,
    averageScore: 65,
    published: true,
    date: "2026-05-05",
    students: [
      { name: "Karthik Nair", score: 70, maxScore: 100, percentage: 70 },
      { name: "Divya Patel", score: 85, maxScore: 100, percentage: 85 },
      { name: "Amit Kumar", score: 60, maxScore: 100, percentage: 60 },
    ],
  },
];

export default function ResultsPage() {
  const [results, setResults] = useState<TestResult[]>(mockResults);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const togglePublish = (id: number) => {
    setResults(results.map((r) => (r.id === id ? { ...r, published: !r.published } : r)));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Results Management</h1>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
          <Send className="h-4 w-4" /> Publish Results
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 w-8"></th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Test Name</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Category</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Submissions</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Avg Score</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Date</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <>
                  <motion.tr
                    key={result.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    onClick={() => setExpandedId(expandedId === result.id ? null : result.id)}
                  >
                    <td className="py-3 px-4">
                      {expandedId === result.id ? (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{result.testName}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                        {result.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{result.totalSubmissions}</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${result.averageScore >= 75 ? "text-emerald-600 dark:text-emerald-400" : result.averageScore >= 60 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>
                        {result.averageScore}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${result.published ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}`}>
                        {result.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{result.date}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); togglePublish(result.id); }}
                        className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${result.published ? "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700" : "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"}`}
                      >
                        {result.published ? "Unpublish" : "Publish"}
                      </button>
                    </td>
                  </motion.tr>
                  <AnimatePresence>
                    {expandedId === result.id && (
                      <motion.tr
                        key={`${result.id}-expanded`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <td colSpan={8} className="px-4 pb-4">
                          <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 ml-8">
                            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Individual Scores</h4>
                            <div className="space-y-2">
                              {result.students.map((student, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                  <span className="text-sm text-slate-600 dark:text-slate-300">{student.name}</span>
                                  <div className="flex items-center gap-3">
                                    <div className="w-32 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                      <div
                                        className={`h-full rounded-full ${student.percentage >= 75 ? "bg-emerald-500" : student.percentage >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                                        style={{ width: `${student.percentage}%` }}
                                      />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-16 text-right">
                                      {student.score}/{student.maxScore}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
