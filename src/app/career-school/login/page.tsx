"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { GraduationCap, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, Sun, Moon, BookOpen, BarChart3, Users } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/components/theme-provider"

function getFirebaseErrorMessage(code: string): string {
  switch (code) {
    case "auth/user-not-found":
      return "No account found with this email address."
    case "auth/wrong-password":
      return "Incorrect password. Please try again."
    case "auth/invalid-email":
      return "Please enter a valid email address."
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later."
    case "auth/user-disabled":
      return "This account has been disabled. Contact support."
    case "auth/invalid-credential":
      return "Invalid credentials. Please check your email and password."
    default:
      return "An error occurred during sign in. Please try again."
  }
}

export default function LoginPage() {
  const router = useRouter()
  const { signIn, signInWithGoogle, user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (user) {
      router.push("/career-school/dashboard")
    }
  }, [user, router])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signIn(email, password)
      router.push("/career-school/dashboard")
    } catch (err: unknown) {
      const firebaseErr = err as { code?: string; message?: string }
      setError(getFirebaseErrorMessage(firebaseErr.code ?? ""))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setGoogleLoading(true)

    try {
      await signInWithGoogle()
      router.push("/career-school/dashboard")
    } catch (err: unknown) {
      const firebaseErr = err as { code?: string; message?: string }
      if (firebaseErr.code === "auth/popup-closed-by-user") {
        // User closed the popup
      } else {
        setError(getFirebaseErrorMessage(firebaseErr.code ?? ""))
      }
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#050912]">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="blob w-[500px] h-[500px] bg-gradient-to-r from-blue-600/30 to-cyan-500/30 -top-32 -left-32 absolute rounded-full blur-3xl" />
        <div className="blob w-[400px] h-[400px] bg-gradient-to-r from-purple-600/20 to-pink-500/20 bottom-0 right-0 absolute rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between w-full p-12 xl:p-16">
          {/* Logo */}
          <Link href="/career-school" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg shadow-blue-500/25">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-white">Career School</span>
          </Link>

          {/* Hero content */}
          <div className="max-w-md">
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Your career journey{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                starts here.
              </span>
            </h1>
            <p className="mt-4 text-lg text-slate-400 leading-relaxed">
              Access curated training materials, book appointments with expert faculty, and get AI-powered career guidance.
            </p>

            {/* Feature highlights */}
            <div className="mt-8 space-y-4">
              {[
                { icon: BookOpen, text: "500+ training materials & mock tests" },
                { icon: BarChart3, text: "AI-powered progress analytics" },
                { icon: Users, text: "1200+ students placed at top companies" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm text-slate-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom testimonial */}
          <div className="glass rounded-xl p-5 max-w-md border border-slate-700/50">
            <p className="text-sm text-slate-300 italic leading-relaxed">
              &ldquo;The mock interviews and AI feedback completely transformed my preparation.&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
              <div>
                <div className="text-sm font-medium text-white">Ananya Gupta</div>
                <div className="text-xs text-slate-500">Placed at Google</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#050912] relative">
        {/* Top bar */}
        <div className="flex items-center justify-between p-6 sm:p-8">
          {/* Mobile logo */}
          <Link href="/career-school" className="flex items-center gap-2.5 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-primary dark:text-white">Career School</span>
          </Link>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-muted dark:hover:bg-slate-900 transition"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link
              href="/career-school/signup"
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
            >
              Create account <ArrowRight className="w-3.5 h-3.5 inline ml-0.5" />
            </Link>
          </div>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-8 pb-12">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary dark:text-white tracking-tight">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Sign in to continue your career preparation
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Google sign in */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-2.5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold text-primary dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {googleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
              {googleLoading ? "Signing in..." : "Continue with Google"}
            </button>
            <p className="mt-2 text-[11px] text-center text-slate-400 dark:text-slate-500">
              Only @kiit.ac.in emails supported
            </p>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white dark:bg-[#050912] text-slate-400">or sign in with email</span>
              </div>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-primary dark:text-white mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@kiit.ac.in"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-primary dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-primary dark:text-white">Password</label>
                  <button type="button" className="text-xs text-blue-500 hover:text-blue-400 font-medium transition-colors">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-11 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-primary dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 bg-white dark:bg-slate-900"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary dark:bg-white text-white dark:text-primary font-semibold rounded-xl shadow-lg shadow-primary/10 dark:shadow-none hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom link */}
            <p className="mt-8 text-sm text-center text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{" "}
              <Link href="/career-school/signup" className="text-blue-500 font-semibold hover:text-blue-400 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
