"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
  Sun,
  Moon,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/components/theme-provider"

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
  const router = useRouter()
  const { user, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const nav = role === "admin" ? adminNav : studentNav

  const handleSignOut = async () => {
    await signOut()
    router.push("/career-school")
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-xl bg-white dark:bg-slate-900 shadow-md border border-slate-200/60 dark:border-slate-800/60 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
      >
        <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-[#050912] border-r border-slate-200/60 dark:border-slate-800/60 flex flex-col transition-transform duration-300 ease-out",
          "lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo area */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg shadow-blue-500/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-sm text-primary dark:text-white">Career School</span>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto lg:hidden p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-muted dark:bg-slate-900 text-primary dark:text-white"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-primary dark:hover:text-white"
                )}
              >
                {/* Active indicator - gradient left border */}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-gradient-to-b from-secondary to-accent" />
                )}
                <item.icon className={clsx(
                  "w-[18px] h-[18px] transition-colors",
                  active ? "text-blue-600 dark:text-blue-400" : "group-hover:text-blue-600 dark:group-hover:text-blue-400"
                )} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User info section */}
        <div className="p-3 border-t border-slate-200/60 dark:border-slate-800/60">
          {user && (
            <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-slate-50 dark:bg-slate-900/50">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md shadow-blue-500/20">
                {user.name?.[0] ?? "U"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-primary dark:text-white truncate">
                  {user.name}
                </div>
                <span className="inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 capitalize">
                  {user.role?.replace("_", " ") ?? "student"}
                </span>
              </div>
            </div>
          )}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-primary dark:hover:text-white transition-all duration-200"
          >
            {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}
