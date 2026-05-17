"use client"

import { motion } from "framer-motion"
import {
  Calendar,
  BookOpen,
  FileText,
  TrendingUp,
  Bell,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bot,
  ArrowUpRight,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  mockUser,
  mockAppointments,
  mockNotifications,
  mockResults,
  mockProgressData,
  mockSchedule,
} from "@/lib/career-school-data"

const statusColors = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  approved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  completed: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

const typeLabels = {
  counseling: "Counseling",
  doubt_clearing: "Doubt Clearing",
  mock_pi: "Mock PI",
  resume_review: "Resume Review",
}

export default function StudentDashboard() {
  const upcomingAppointments = mockAppointments.filter((a) => a.status !== "completed" && a.status !== "cancelled")
  const unreadNotifications = mockNotifications.filter((n) => !n.read)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {mockUser.name.split(" ")[0]}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Here&apos;s your career preparation overview
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Bell className="w-5 h-5" />
            {unreadNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadNotifications.length}
              </span>
            )}
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
            {mockUser.name[0]}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Upcoming Appointments", value: upcomingAppointments.length, icon: Calendar, color: "text-blue-600" },
          { label: "Materials Available", value: "24", icon: BookOpen, color: "text-emerald-600" },
          { label: "Tests Completed", value: "12", icon: FileText, color: "text-purple-600" },
          { label: "Avg. Score", value: "78%", icon: TrendingUp, color: "text-amber-600" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Progress Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <h2 className="font-semibold mb-4">Performance Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line type="monotone" dataKey="aptitude" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="coding" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="verbal" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="reasoning" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <h2 className="font-semibold mb-4">Recent Notifications</h2>
          <div className="space-y-3">
            {mockNotifications.slice(0, 4).map((n) => (
              <div key={n.id} className="flex gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${n.read ? "bg-slate-300" : "bg-blue-500"}`} />
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{n.title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{n.message}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{n.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments & Schedule */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Upcoming Appointments</h2>
            <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">View all</span>
          </div>
          <div className="space-y-3">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  {apt.status === "approved" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-amber-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{typeLabels[apt.type]}</div>
                  <div className="text-xs text-slate-500">with {apt.faculty}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-medium">{apt.date}</div>
                  <div className="text-xs text-slate-500">{apt.time}</div>
                  <span className={`inline-block mt-1 text-[10px] font-medium px-1.5 py-0.5 rounded ${statusColors[apt.status]}`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Upcoming Schedule</h2>
            <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">Full calendar</span>
          </div>
          <div className="space-y-3">
            {mockSchedule.slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.instructor}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-medium">{item.date}</div>
                  <div className="text-xs text-slate-500">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Results */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Recent Test Results</h2>
          <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">View all</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="text-left py-2.5 px-3 font-medium text-slate-500">Test</th>
                <th className="text-left py-2.5 px-3 font-medium text-slate-500">Category</th>
                <th className="text-left py-2.5 px-3 font-medium text-slate-500">Score</th>
                <th className="text-left py-2.5 px-3 font-medium text-slate-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockResults.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 dark:border-slate-800/50 last:border-0">
                  <td className="py-2.5 px-3 font-medium">{r.testName}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 font-medium">
                      {r.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`font-semibold ${(r.score / r.total) >= 0.7 ? "text-green-600" : "text-amber-600"}`}>
                      {r.score}/{r.total}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Recommendation Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-6 text-white"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">AI Recommendation</h3>
            <p className="text-sm text-white/85 leading-relaxed">
              Based on your recent test results, I recommend focusing on Verbal Ability this week.
              Your reasoning scores have improved significantly, but verbal needs attention.
              Check out the &quot;Advanced Verbal Reasoning&quot; material uploaded by Prof. Rakesh Jain.
            </p>
            <button className="mt-3 px-4 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-sm font-medium transition-colors">
              View Recommended Materials
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
