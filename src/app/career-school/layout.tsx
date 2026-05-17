import type { Metadata } from "next"
import { AuthProvider } from "@/contexts/auth-context"

export const metadata: Metadata = {
  title: "Career School Portal | Abiansh",
  description: "Career School Management System - Book appointments, access training materials, track progress, and get AI-powered guidance.",
}

export default function CareerSchoolLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
