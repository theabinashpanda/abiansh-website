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
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Overview of Career School operations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: "Total Students", value: mockAnalytics.totalStudents.toLocaleString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/30", trend: "+12%", up: true },
          { label: "Appointments", value: mockAnalytics.totalAppointments, icon: Calendar, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/30", trend: "+8%", up: true },
          { label: "Downloads", value: mockAnalytics.materialDownloads.toLocaleString(), icon: Download, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/30", trend: "+24%", up: true },
          { label: "Tests Done", value: mockAnalytics.testsCompleted, icon: FileText, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/30", trend: "+15%", up: true },
          { label: "Avg. Score", value: `${mockAnalytics.avgScore}%`, icon: TrendingUp, color: "text-cyan-600", bg: "bg-cyan-50 dark:bg-cyan-900/30", trend: "-2%", up: false },
          { label: "Active Faculty", value: mockAnalytics.activeTeachers, icon: Activity, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/30", trend: "+3", up: true },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} />
            </div>
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</span>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? "text-green-600" : "text-red-500"}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Enrollment Trend */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <h2 className="font-semibold mb-4">Student Enrollment Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentData}>
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
                <Bar dataKey="students" fill="url(#blueGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointment Distribution */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <h2 className="font-semibold mb-4">Appointment Types</h2>
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
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Recent Users</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
            <UserPlus className="w-3.5 h-3.5" />
            Add User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="text-left py-2.5 px-3 font-medium text-slate-500">Name</th>
                <th className="text-left py-2.5 px-3 font-medium text-slate-500">Email</th>
                <th className="text-left py-2.5 px-3 font-medium text-slate-500">Role</th>
                <th className="text-left py-2.5 px-3 font-medium text-slate-500">Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.email} className="border-b border-slate-100 dark:border-slate-800/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                        {user.name[0]}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">{user.email}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 font-medium">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">{user.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
