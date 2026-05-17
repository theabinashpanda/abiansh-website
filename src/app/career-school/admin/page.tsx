"use client"

import { motion } from "framer-motion"
import {
  Users,
  Calendar,
  BookOpen,
  FileText,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  Download,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { mockAnalytics } from "@/lib/career-school-data"
import { Reveal } from "@/components/reveal"

const enrollmentData = [
  { month: "Jan", students: 85 },
  { month: "Feb", students: 120 },
  { month: "Mar", students: 145 },
  { month: "Apr", students: 180 },
  { month: "May", students: 210 },
]

const appointmentTypeData = [
  { name: "Counseling", value: 35, color: "#3b82f6" },
  { name: "Mock PI", value: 28, color: "#10b981" },
  { name: "Doubt Clearing", value: 22, color: "#8b5cf6" },
  { name: "Resume Review", value: 15, color: "#f59e0b" },
]

const recentUsers = [
  { name: "Ananya Gupta", email: "ananya@student.com", role: "Student", date: "May 17, 2026" },
  { name: "Vikram Singh", email: "vikram@student.com", role: "Student", date: "May 16, 2026" },
  { name: "Dr. Neha Kapoor", email: "neha@faculty.com", role: "Counselor", date: "May 15, 2026" },
  { name: "Priya Desai", email: "priya@student.com", role: "Student", date: "May 14, 2026" },
  { name: "Raj Malhotra", email: "raj@faculty.com", role: "Teacher", date: "May 13, 2026" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary dark:text-white">Admin Dashboard</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
          Overview of Career School operations
        </p>
      </div>

      {/* Stats Grid */}
      <Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[
            { label: "Total Students", value: mockAnalytics.totalStudents.toLocaleString(), icon: Users, color: "from-blue-600 to-blue-400", trend: "+12%", up: true },
            { label: "Appointments", value: mockAnalytics.totalAppointments, icon: Calendar, color: "from-emerald-600 to-emerald-400", trend: "+8%", up: true },
            { label: "Downloads", value: mockAnalytics.materialDownloads.toLocaleString(), icon: Download, color: "from-purple-600 to-purple-400", trend: "+24%", up: true },
            { label: "Tests Done", value: mockAnalytics.testsCompleted, icon: FileText, color: "from-amber-600 to-amber-400", trend: "+15%", up: true },
            { label: "Avg. Score", value: `${mockAnalytics.avgScore}%`, icon: TrendingUp, color: "from-cyan-600 to-cyan-400", trend: "-2%", up: false },
            { label: "Active Faculty", value: mockAnalytics.activeTeachers, icon: Activity, color: "from-rose-600 to-rose-400", trend: "+3", up: true },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-4 hover-lift"
            >
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-xl font-bold text-primary dark:text-white num">{stat.value}</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</span>
                <span className={`text-xs font-medium flex items-center gap-0.5 num ${stat.up ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* Charts Row */}
      <Reveal delay={0.1}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Enrollment Trend */}
          <div className="lg:col-span-2 glass rounded-2xl p-5">
            <h2 className="font-semibold text-primary dark:text-white mb-4">Student Enrollment Trend</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData}>
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
                  <Bar dataKey="students" fill="url(#blueGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1d4ed8" />
                      <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Appointment Distribution */}
          <div className="glass rounded-2xl p-5">
            <h2 className="font-semibold text-primary dark:text-white mb-4">Appointment Types</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={appointmentTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {appointmentTypeData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid var(--color-slate-200)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      background: "var(--color-white, #fff)",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Recent Users Table */}
      <Reveal delay={0.15}>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-primary dark:text-white">Recent Users</h2>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-secondary to-accent text-white text-xs font-medium hover:opacity-90 transition-opacity shadow-md shadow-blue-500/20">
              <UserPlus className="w-3.5 h-3.5" />
              Add User
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left py-2.5 px-3 font-medium text-slate-500 dark:text-slate-400">Name</th>
                  <th className="text-left py-2.5 px-3 font-medium text-slate-500 dark:text-slate-400">Email</th>
                  <th className="text-left py-2.5 px-3 font-medium text-slate-500 dark:text-slate-400">Role</th>
                  <th className="text-left py-2.5 px-3 font-medium text-slate-500 dark:text-slate-400">Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.email} className="border-b border-slate-100 dark:border-slate-800/50 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white text-xs font-bold shadow-sm">
                          {user.name[0]}
                        </div>
                        <span className="font-medium text-primary dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">{user.email}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 font-medium text-slate-600 dark:text-slate-300">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400 num">{user.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
