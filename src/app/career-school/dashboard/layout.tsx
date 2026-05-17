"use client"

import { Sidebar } from "@/components/career-school/sidebar"
import { ProtectedRoute } from "@/components/career-school/protected-route"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex bg-white dark:bg-[#050912]">
        <Sidebar role="student" />
        <main className="flex-1 lg:ml-0 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
