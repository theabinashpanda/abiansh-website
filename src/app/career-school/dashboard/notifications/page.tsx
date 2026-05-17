"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Bell,
  CheckCircle2,
  Info,
  AlertTriangle,
  CheckCheck,
} from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning"
  read: boolean
  date: string
}

const initialNotifications: Notification[] = [
  { id: "1", title: "Appointment Approved", message: "Your counseling session with Dr. Priya Mehta has been approved for May 19 at 10:00 AM.", type: "success", read: false, date: "2 hours ago" },
  { id: "2", title: "New Material Available", message: "Prof. Rakesh Jain uploaded \"Advanced Probability\" in the Aptitude section.", type: "info", read: false, date: "5 hours ago" },
  { id: "3", title: "Schedule Update", message: "GD session moved to 2:00 PM on May 20. Please update your calendar.", type: "warning", read: false, date: "1 day ago" },
  { id: "4", title: "Result Published", message: "Aptitude Mock Test 3 results are now available. You scored 78/100.", type: "info", read: true, date: "2 days ago" },
  { id: "5", title: "Mock PI Scheduled", message: "Your Mock Personal Interview with Mr. Anil Kumar is confirmed for May 21.", type: "success", read: true, date: "3 days ago" },
  { id: "6", title: "New Video Uploaded", message: "Dr. Amit Patel uploaded \"System Design Basics\" video in the Technical section.", type: "info", read: true, date: "4 days ago" },
  { id: "7", title: "Resume Feedback Ready", message: "Ms. Sneha Roy has reviewed your resume. Check the feedback in your appointments.", type: "success", read: true, date: "5 days ago" },
  { id: "8", title: "Upcoming Deadline", message: "Submit your updated resume by May 22 for the placement drive.", type: "warning", read: false, date: "6 hours ago" },
]

const typeIcons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
}

const typeIconColors = {
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-amber-500",
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filter === "unread"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          Unread
          {unreadCount > 0 && (
            <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-bold">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notification List */}
      <div className="space-y-2">
        {filteredNotifications.map((notification, i) => {
          const Icon = typeIcons[notification.type]
          const iconColor = typeIconColors[notification.type]
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => markAsRead(notification.id)}
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                notification.read
                  ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  : "bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              }`}
            >
              {/* Unread dot */}
              <div className="pt-1.5 shrink-0">
                <div className={`w-2 h-2 rounded-full ${notification.read ? "bg-transparent" : "bg-blue-500"}`} />
              </div>

              {/* Icon */}
              <div className="shrink-0 mt-0.5">
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm ${notification.read ? "font-medium" : "font-semibold"}`}>
                    {notification.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                  {notification.message}
                </p>
                <span className="text-[11px] text-slate-400 mt-1 block">{notification.date}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <Bell className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">No notifications to show</p>
        </div>
      )}
    </div>
  )
}
