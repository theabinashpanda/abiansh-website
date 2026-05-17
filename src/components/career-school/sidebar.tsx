"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { clsx } from "clsx"
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  ClipboardList,
  FileText,
  BarChart3,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Users,
  Bot,
} from "lucide-react"

const studentNav = [
  { label: "Dashboard", href: "/career-school/dashboard", icon: LayoutDashboard },
  { label: "Appointments", href: "/career-school/dashboard/appointments", icon: Calendar },
  { label: "Materials", href: "/career-school/dashboard/materials", icon: BookOpen },
  { label: "Schedule", href: "/career-school/dashboard/schedule", icon: ClipboardList },
  { label: "Tests & Results", href: "/career-school/dashboard/tests", icon: FileText },
  { label: "Resume Builder", href: "/career-school/dashboard/resume", icon: FileText },
  { label: "Progress", href: "/career-school/dashboard/progress", icon: BarChart3 },
  { label: "Forum", href: "/career-school/dashboard/forum", icon: MessageSquare },
  { label: "AI Assistant", href: "/career-school/dashboard/ai", icon: Bot },
  { label: "Notifications", href: "/career-school/dashboard/notifications", icon: Bell },
  { label: "Profile", href: "/career-school/dashboard/profile", icon: User },
]

const adminNav = [
  { label: "Dashboard", href: "/career-school/admin", icon: LayoutDashboard },
  { label: "Users", href: "/career-school/admin/users", icon: Users },
  { label: "Appointments", href: "/career-school/admin/appointments", icon: Calendar },
  { label: "Materials", href: "/career-school/admin/materials", icon: BookOpen },
  { label: "Schedules", href: "/career-school/admin/schedules", icon: ClipboardList },
  { label: "Results", href: "/career-school/admin/results", icon: FileText },
  { label: "Analytics", href: "/career-school/admin/analytics", icon: BarChart3 },
  { label: "Notifications", href: "/career-school/admin/notifications", icon: Bell },
  { label: "AI Settings", href: "/career-school/admin/ai-settings", icon: Bot },
  { label: "Settings", href: "/career-school/admin/settings", icon: Settings },
]

export function Sidebar({ role = "student" }: { role?: "student" | "admin" }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const nav = role === "admin" ? adminNav : studentNav

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700"
      >
        <Menu className="w-5 h-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300",
          "lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-200 dark:border-slate-800">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-sm">Career School</span>
          <button onClick={() => setOpen(false)} className="ml-auto lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <item.icon className="w-4.5 h-4.5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/career-school"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4.5 h-4.5" />
            Sign Out
          </Link>
        </div>
      </aside>
    </>
  )
}
