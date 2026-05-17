"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  List,
  LayoutGrid,
  Clock,
  User,
} from "lucide-react"

const typeColors: Record<string, string> = {
  aptitude: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  coding: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
  gd: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  pi: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  resume: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
  technical: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800",
}

const typeBadgeColors: Record<string, string> = {
  aptitude: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  coding: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  gd: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  pi: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  resume: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400",
  technical: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
}

const typeLabels: Record<string, string> = {
  aptitude: "Aptitude",
  coding: "Coding",
  gd: "GD",
  pi: "PI",
  resume: "Resume",
  technical: "Technical",
}

interface ScheduleItem {
  id: string
  title: string
  type: string
  date: string
  time: string
  instructor: string
}

const scheduleData: ScheduleItem[] = [
  { id: "1", title: "Aptitude Practice Session", type: "aptitude", date: "2026-05-19", time: "9:00 AM - 10:30 AM", instructor: "Prof. Rakesh Jain" },
  { id: "2", title: "DSA Problem Solving", type: "coding", date: "2026-05-19", time: "11:00 AM - 12:30 PM", instructor: "Dr. Amit Patel" },
  { id: "3", title: "Group Discussion Round", type: "gd", date: "2026-05-20", time: "2:00 PM - 3:30 PM", instructor: "Ms. Sneha Roy" },
  { id: "4", title: "Mock Personal Interview", type: "pi", date: "2026-05-21", time: "10:00 AM - 11:00 AM", instructor: "Mr. Anil Kumar" },
  { id: "5", title: "Technical Interview Prep", type: "technical", date: "2026-05-22", time: "3:00 PM - 4:30 PM", instructor: "Dr. Priya Mehta" },
  { id: "6", title: "Resume Building Workshop", type: "resume", date: "2026-05-23", time: "11:00 AM - 12:00 PM", instructor: "Ms. Sneha Roy" },
  { id: "7", title: "Quantitative Aptitude - Advanced", type: "aptitude", date: "2026-05-24", time: "9:00 AM - 10:30 AM", instructor: "Prof. Rakesh Jain" },
  { id: "8", title: "Coding Contest Practice", type: "coding", date: "2026-05-20", time: "10:00 AM - 11:30 AM", instructor: "Dr. Amit Patel" },
  { id: "9", title: "HR Interview Simulation", type: "pi", date: "2026-05-24", time: "2:00 PM - 3:00 PM", instructor: "Mr. Anil Kumar" },
  { id: "10", title: "GD Topic Analysis", type: "gd", date: "2026-05-25", time: "3:00 PM - 4:30 PM", instructor: "Ms. Sneha Roy" },
]

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const weekDates = ["2026-05-19", "2026-05-20", "2026-05-21", "2026-05-22", "2026-05-23", "2026-05-24", "2026-05-25"]

export default function SchedulePage() {
  const [view, setView] = useState<"list" | "week">("list")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Training Schedule</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Your upcoming placement training sessions
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
          <button
            onClick={() => setView("list")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              view === "list"
                ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <List className="w-4 h-4" />
            List
          </button>
          <button
            onClick={() => setView("week")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              view === "week"
                ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Week
          </button>
        </div>
      </div>

      {/* Color Legend */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(typeLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded ${typeBadgeColors[key]}`} />
            <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
          </div>
        ))}
      </div>

      {/* List View */}
      {view === "list" && (
        <div className="space-y-3">
          {scheduleData.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <div className={`w-1.5 h-12 rounded-full ${typeBadgeColors[item.type].split(" ")[0]}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${typeBadgeColors[item.type]}`}>
                    {typeLabels[item.type]}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {item.instructor}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs font-medium">{item.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Week View */}
      {view === "week" && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800">
            {weekDays.map((day, i) => (
              <div key={day} className="p-3 text-center border-r last:border-r-0 border-slate-200 dark:border-slate-800">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{day}</div>
                <div className="text-sm font-semibold mt-0.5">{19 + i}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 min-h-[300px]">
            {weekDates.map((date, colIdx) => {
              const dayItems = scheduleData.filter((item) => item.date === date)
              return (
                <div
                  key={date}
                  className="p-1.5 border-r last:border-r-0 border-slate-200 dark:border-slate-800 space-y-1.5"
                >
                  {dayItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: colIdx * 0.05 }}
                      className={`p-2 rounded-lg border text-[10px] leading-tight ${typeColors[item.type]}`}
                    >
                      <div className="font-medium truncate">{item.title}</div>
                      <div className="mt-0.5 opacity-75">{item.time.split(" - ")[0]}</div>
                    </motion.div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
