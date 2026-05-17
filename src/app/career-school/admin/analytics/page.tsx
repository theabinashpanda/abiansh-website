"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, BookOpen, Calendar } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const enrollmentData = [
  { month: "Jan", students: 120 },
  { month: "Feb", students: 145 },
  { month: "Mar", students: 180 },
  { month: "Apr", students: 210 },
  { month: "May", students: 250 },
  { month: "Jun", students: 230 },
  { month: "Jul", students: 270 },
  { month: "Aug", students: 310 },
  { month: "Sep", students: 380 },
  { month: "Oct", students: 420 },
  { month: "Nov", students: 450 },
  { month: "Dec", students: 480 },
];

const testPerformanceData = [
  { range: "0-20", count: 5 },
  { range: "21-40", count: 12 },
  { range: "41-60", count: 28 },
  { range: "61-80", count: 45 },
  { range: "81-100", count: 30 },
];

const appointmentTypeData = [
  { name: "Career Counseling", value: 35, color: "#3b82f6" },
  { name: "Mock Interview", value: 28, color: "#8b5cf6" },
  { name: "Resume Review", value: 20, color: "#10b981" },
  { name: "Mentorship", value: 12, color: "#f59e0b" },
  { name: "Academic", value: 5, color: "#ef4444" },
];

const downloadTrendData = [
  { week: "W1", downloads: 45 },
  { week: "W2", downloads: 62 },
  { week: "W3", downloads: 58 },
  { week: "W4", downloads: 80 },
  { week: "W5", downloads: 95 },
  { week: "W6", downloads: 88 },
  { week: "W7", downloads: 110 },
  { week: "W8", downloads: 125 },
];

const topStudents = [
  { name: "Divya Patel", score: 94, tests: 12, rank: 1 },
  { name: "Arjun Sharma", score: 91, tests: 11, rank: 2 },
  { name: "Meera Joshi", score: 89, tests: 10, rank: 3 },
  { name: "Karthik Nair", score: 86, tests: 12, rank: 4 },
  { name: "Priya Mehta", score: 84, tests: 9, rank: 5 },
];

const metrics = [
  { label: "Total Students", value: "480", change: "+12%", icon: Users, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { label: "Active Courses", value: "24", change: "+3", icon: BookOpen, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
  { label: "Appointments/Week", value: "67", change: "+8%", icon: Calendar, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20" },
  { label: "Placement Rate", value: "78%", change: "+5%", icon: TrendingUp, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
      </motion.div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{metric.value}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{metric.change} from last month</p>
                </div>
                <div className={`rounded-lg p-3 ${metric.bg}`}>
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
        >
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Student Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip />
              <Area type="monotone" dataKey="students" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Test Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
        >
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Test Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={testPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Appointment Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
        >
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Appointment Types Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={appointmentTypeData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={false} labelLine={false}>
                {appointmentTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Download Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
        >
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Material Download Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={downloadTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="downloads" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Students */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
      >
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Top Performing Students</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Rank</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Student</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Avg Score</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Tests Taken</th>
              </tr>
            </thead>
            <tbody>
              {topStudents.map((student) => (
                <tr key={student.rank} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${student.rank <= 3 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}`}>
                      {student.rank}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{student.name}</td>
                  <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">{student.score}%</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{student.tests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
