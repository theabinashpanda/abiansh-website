"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Calendar,
  Target,
  Award,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const performanceData = [
  { month: "Jan", aptitude: 65, coding: 55, verbal: 50, reasoning: 70 },
  { month: "Feb", aptitude: 68, coding: 60, verbal: 55, reasoning: 72 },
  { month: "Mar", aptitude: 72, coding: 65, verbal: 58, reasoning: 75 },
  { month: "Apr", aptitude: 78, coding: 72, verbal: 62, reasoning: 80 },
  { month: "May", aptitude: 85, coding: 78, verbal: 68, reasoning: 85 },
];

const attendanceData = [
  { month: "Jan", attendance: 85 },
  { month: "Feb", attendance: 90 },
  { month: "Mar", attendance: 78 },
  { month: "Apr", attendance: 92 },
  { month: "May", attendance: 88 },
];

const skillsData = [
  { skill: "DSA", value: 80 },
  { skill: "System Design", value: 65 },
  { skill: "Web Dev", value: 85 },
  { skill: "DBMS", value: 70 },
  { skill: "OS", value: 60 },
  { skill: "Networking", value: 55 },
];

const interviewScores = [
  { type: "Technical Round 1", score: 8, maxScore: 10, date: "2026-04-15" },
  { type: "Technical Round 2", score: 7, maxScore: 10, date: "2026-04-22" },
  { type: "HR Round", score: 9, maxScore: 10, date: "2026-04-28" },
  { type: "Mock GD", score: 7, maxScore: 10, date: "2026-05-05" },
];

const overallProgress = 72;

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Progress Tracker
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Track your learning journey and performance metrics
        </p>
      </motion.div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Target size={20} className="text-indigo-600 dark:text-indigo-400" />
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Overall Progress
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Advanced</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {overallProgress}%
          </div>
        </div>
      </motion.div>

      {/* Performance Over Time */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp
            size={20}
            className="text-indigo-600 dark:text-indigo-400"
          />
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Performance Over Time
          </h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#f1f5f9" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="aptitude"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="coding"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="verbal"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="reasoning"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Calendar
              size={20}
              className="text-indigo-600 dark:text-indigo-400"
            />
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Attendance by Month
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#f1f5f9" }}
              />
              <Bar dataKey="attendance" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Skills Radar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart3
              size={20}
              className="text-indigo-600 dark:text-indigo-400"
            />
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Skills Radar
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={skillsData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="skill" stroke="#94a3b8" fontSize={12} />
              <PolarRadiusAxis
                stroke="#94a3b8"
                domain={[0, 100]}
                tick={false}
              />
              <Radar
                name="Skills"
                dataKey="value"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Interview Scores */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Award size={20} className="text-indigo-600 dark:text-indigo-400" />
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Interview Scores
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {interviewScores.map((interview, i) => (
            <motion.div
              key={interview.type}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 text-center"
            >
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                {interview.type}
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {interview.score}
                <span className="text-sm font-normal text-slate-400">
                  /{interview.maxScore}
                </span>
              </p>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-2">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{
                    width: `${(interview.score / interview.maxScore) * 100}%`,
                  }}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {interview.date}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
