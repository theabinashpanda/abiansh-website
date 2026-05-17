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
  mockAppointments,
  mockNotifications,
  mockResults,
  mockProgressData,
  mockSchedule,
} from "@/lib/career-school-data"
import { Reveal } from "@/components/reveal"
import { useAuth } from "@/contexts/auth-context"

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
  const { user } = useAuth()
  const upcomingAppointments = mockAppointments.filter((a) => a.status !== "completed" && a.status !== "cancelled")
  const unreadNotifications = mockNotifications.filter((n) => !n.read)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary dark:text-white">
            Welcome back, {user?.name?.split(" ")[0] ?? "Student"}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Here&apos;s your career preparation overview
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl glass hover-lift border border-slate-200 dark:border-slate-800 transition-all">
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            {unreadNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-secondary to-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                <span className="num">{unreadNotifications.length}</span>
              </span>
            )}
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white text-sm font-bold shadow-md shadow-blue-500/20">
            {user?.name?.[0] ?? "S"}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Upcoming Appointments", value: upcomingAppointments.length, icon: Calendar, color: "from-blue-600 to-blue-400" },
            { label: "Materials Available", value: 24, icon: BookOpen, color: "from-emerald-600 to-emerald-400" },
            { label: "Tests Completed", value: 12, icon: FileText, color: "from-purple-600 to-purple-400" },
            { label: "Avg. Score", value: "78%", icon: TrendingUp, color: "from-amber-600 to-amber-400" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-4 hover-lift"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </div>
              <div className="text-2xl font-bold text-primary dark:text-white num">{stat.value}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* Main Content Grid */}
      <Reveal delay={0.1}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress Chart */}
          <div className="lg:col-span-2 glass rounded-2xl p-5">
            <h2 className="font-semibold text-primary dark:text-white mb-4">Performance Progress</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid var(--color-slate-200)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      background: "var(--color-white, #fff)",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Line type="monotone" dataKey="aptitude" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="coding" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="verbal" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="reasoning" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Notifications */}
          <div className="glass rounded-2xl p-5">
            <h2 className="font-semibold text-primary dark:text-white mb-4">Recent Notifications</h2>
            <div className="space-y-3">
              {mockNotifications.slice(0, 4).map((n) => (
                <div key={n.id} className="flex gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.read ? "bg-slate-300 dark:bg-slate-600" : "bg-gradient-to-br from-secondary to-accent"}`} />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-primary dark:text-white truncate">{n.title}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 truncate">{n.message}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{n.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Appointments & Schedule */}
      <Reveal delay={0.15}>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-primary dark:text-white">Upcoming Appointments</h2>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline">View all</span>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-900/20 flex items-center justify-center shrink-0">
                    {apt.status === "approved" ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-primary dark:text-white">{typeLabels[apt.type]}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">with {apt.faculty}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-medium text-primary dark:text-white num">{apt.date}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 num">{apt.time}</div>
                    <span className={`inline-block mt-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusColors[apt.status]}`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-primary dark:text-white">Upcoming Schedule</h2>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline">Full calendar</span>
            </div>
            <div className="space-y-3">
              {mockSchedule.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/40 dark:to-purple-900/20 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-primary dark:text-white truncate">{item.title}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">{item.instructor}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-medium text-primary dark:text-white num">{item.date}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 num">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Recent Results */}
      <Reveal delay={0.2}>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-primary dark:text-white">Recent Test Results</h2>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline">View all</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left py-2.5 px-3 font-medium text-slate-500 dark:text-slate-400">Test</th>
                  <th className="text-left py-2.5 px-3 font-medium text-slate-500 dark:text-slate-400">Category</th>
                  <th className="text-left py-2.5 px-3 font-medium text-slate-500 dark:text-slate-400">Score</th>
                  <th className="text-left py-2.5 px-3 font-medium text-slate-500 dark:text-slate-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockResults.map((r) => (
                  <tr key={r.id} className="border-b border-slate-100 dark:border-slate-800/50 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-primary dark:text-white">{r.testName}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 font-medium text-slate-600 dark:text-slate-300">
                        {r.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`font-semibold num ${(r.score / r.total) >= 0.7 ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}>
                        {r.score}/{r.total}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400 num">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* AI Recommendation Card */}
      <Reveal delay={0.25}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-secondary to-accent rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">AI Recommendation</h3>
              <p className="text-sm text-white/85 leading-relaxed">
                Based on your recent test results, I recommend focusing on Verbal Ability this week.
                Your reasoning scores have improved significantly, but verbal needs attention.
                Check out the &quot;Advanced Verbal Reasoning&quot; material uploaded by Prof. Rakesh Jain.
              </p>
              <button className="mt-4 px-5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-sm font-medium transition-all duration-200 backdrop-blur-sm">
                View Recommended Materials
              </button>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </div>
  )
}
