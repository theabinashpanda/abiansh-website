import type { Metadata } from "next"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Career School Portal | Abiansh",
  description: "Career School Management System - Book appointments, access training materials, track progress, and get AI-powered guidance.",
}

export default function CareerSchoolLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}
