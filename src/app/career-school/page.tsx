"use client"

import Link from "next/link"
import {
  GraduationCap,
  Calendar,
  BookOpen,
  BarChart3,
  Bot,
  FileText,
  Users,
  ArrowRight,
  CheckCircle2,
  Star,
  TrendingUp,
  Award,
  Target,
  ClipboardCheck,
  Sun,
  Moon,
} from "lucide-react"
import { Reveal, StaggerContainer, StaggerItem } from "@/components/reveal"
import { useTheme } from "@/components/theme-provider"
import { features } from "@/lib/career-school-data"

const icons = [Calendar, BookOpen, BarChart3, Bot, FileText, Users]

const stats = [
  { value: "1200+", label: "Students Placed" },
  { value: "50+", label: "Expert Faculty" },
  { value: "95%", label: "Success Rate" },
  { value: "200+", label: "Partner Companies" },
]

const testimonials = [
  { name: "Ananya Gupta", role: "Placed at Google", text: "The mock interviews and AI feedback transformed my preparation. I felt confident walking into every interview." },
  { name: "Vikram Singh", role: "Placed at Microsoft", text: "The structured schedule and personalized recommendations helped me focus on my weak areas systematically." },
  { name: "Priya Desai", role: "Placed at Amazon", text: "Resume builder and career guidance were game changers. The faculty support was exceptional." },
]

const steps = [
  { num: "01", title: "Sign Up & Assess", description: "Create your profile and take a diagnostic assessment to identify your strengths and gaps.", icon: ClipboardCheck },
  { num: "02", title: "Personalized Plan", description: "Get a tailored learning path with curated materials, schedules, and milestone targets.", icon: Target },
  { num: "03", title: "Practice & Learn", description: "Attend sessions, take mock tests, practice interviews, and track progress with AI analytics.", icon: BookOpen },
  { num: "04", title: "Get Placed", description: "Connect with 200+ partner companies and land your dream role with confidence.", icon: Award },
]

export default function CareerSchoolHome() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-[#050912]">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-[#050912]/70 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
          <Link href="/career-school" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-primary dark:text-white">Career School</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#features" className="hover:text-primary dark:hover:text-white transition-colors">Features</a>
            <a href="#courses" className="hover:text-primary dark:hover:text-white transition-colors">Courses</a>
            <a href="#testimonials" className="hover:text-primary dark:hover:text-white transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-muted dark:hover:bg-slate-900 transition"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link
              href="/career-school/login"
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/career-school/signup"
              className="bg-primary dark:bg-white text-white dark:text-primary font-semibold px-5 py-2.5 rounded-xl hover:bg-secondary dark:hover:bg-slate-200 transition shadow-lg shadow-primary/15 dark:shadow-accent/20 text-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div
          className="blob bg-secondary/40 dark:bg-secondary/60"
          style={{ width: 520, height: 520, top: -120, left: -140 }}
        />
        <div
          className="blob bg-accent/40 dark:bg-accent/50"
          style={{ width: 460, height: 460, top: 40, right: -160 }}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <Reveal className="lg:col-span-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 mb-5 sm:mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              AI-Powered Career Guidance Platform
            </div>

            {/* Headline */}
            <h1 className="text-[2rem] sm:text-5xl lg:text-[3.75rem] leading-[1.05] font-extrabold tracking-tight text-primary dark:text-white">
              Your Career Success
              <br className="hidden sm:block" />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Starts Here
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="10"
                  viewBox="0 0 200 10"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q 50 2, 100 6 T 198 4"
                    stroke="#0EA5E9"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              .
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              Book appointments, access curated training materials, track your progress, and get personalized AI-powered career guidance — all in one place.
            </p>

            {/* CTAs */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/career-school/signup"
                className="group inline-flex items-center justify-center gap-2 bg-primary dark:bg-white text-white dark:text-primary font-semibold px-6 py-3.5 rounded-xl hover:bg-secondary dark:hover:bg-slate-200 transition shadow-lg shadow-primary/15 dark:shadow-accent/20"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/career-school/login"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-primary dark:text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/40 dark:hover:border-accent/40 hover:bg-muted dark:hover:bg-slate-800 transition"
              >
                Sign In
              </Link>
            </div>

            {/* Mini stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 max-w-md">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-primary dark:text-white num">1200+</div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1">Students Placed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-primary dark:text-white num">95%</div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-primary dark:text-white num">200+</div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1">Partners</div>
              </div>
            </div>
          </Reveal>

          {/* Dashboard illustration */}
          <Reveal className="lg:col-span-5 relative h-[400px] sm:h-[480px] lg:h-[520px] mt-4 lg:mt-0">
            {/* Main dashboard card */}
            <div className="absolute right-0 top-2 sm:top-4 w-[90%] sm:w-[92%] glass rounded-2xl p-4 sm:p-5 shadow-2xl shadow-primary/10 dark:shadow-accent/10 float">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  career-school.app
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-muted dark:bg-slate-900 rounded-xl p-3">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Students Placed
                  </div>
                  <div className="text-xl font-bold text-primary dark:text-white num">
                    1,284
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +18.3%
                  </div>
                </div>
                <div className="bg-muted dark:bg-slate-900 rounded-xl p-3">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Tests Taken
                  </div>
                  <div className="text-xl font-bold text-primary dark:text-white num">
                    4,523
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +24.1%
                  </div>
                </div>
              </div>
              {/* Chart */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Avg. Score Trend
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">5 months</div>
                </div>
                <svg viewBox="0 0 240 80" className="w-full h-14 sm:h-16">
                  <defs>
                    <linearGradient id="cs-g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 65 L48 55 L96 48 L144 35 L192 28 L240 18 L240 80 L0 80 Z"
                    fill="url(#cs-g1)"
                  />
                  <path
                    d="M0 65 L48 55 L96 48 L144 35 L192 28 L240 18"
                    fill="none"
                    stroke="#0EA5E9"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {/* Activity */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center">
                    <Award className="w-3.5 h-3.5 text-secondary dark:text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-primary dark:text-white truncate">
                      Ananya placed at Google
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      SDE-1 · 2h ago
                    </div>
                  </div>
                  <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    Placed
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                    <BarChart3 className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-primary dark:text-white truncate">
                      Mock Test 5 results out
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      Aptitude · 4h ago
                    </div>
                  </div>
                  <div className="text-[10px] font-semibold text-secondary dark:text-accent bg-secondary/10 dark:bg-accent/10 px-2 py-0.5 rounded-md">
                    New
                  </div>
                </div>
              </div>
            </div>

            {/* Floating widgets */}
            <div className="absolute -left-1 sm:left-0 top-0 glass rounded-xl px-3 sm:px-3.5 py-2.5 sm:py-3 shadow-xl shadow-primary/10 float float-d1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    AI Guide
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-primary dark:text-white">
                    Resume reviewed
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-1 sm:left-2 bottom-20 sm:bottom-24 glass rounded-xl px-3 sm:px-3.5 py-2.5 sm:py-3 shadow-xl shadow-primary/10 float float-d2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary dark:bg-slate-800 flex items-center justify-center text-white">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Faculty
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-primary dark:text-white num">
                    50+ mentors online
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute right-0 bottom-0 glass rounded-xl px-3 sm:px-3.5 py-2.5 sm:py-3 shadow-xl shadow-primary/10 float float-d3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    This week
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-primary dark:text-white num">
                    34 placements
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Divider */}
      <div className="divider max-w-7xl mx-auto" />

      {/* Stats section */}
      <section id="stats" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-primary dark:text-white num">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Divider */}
      <div className="divider max-w-7xl mx-auto" />

      {/* Features */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal className="text-center mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 mb-5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Comprehensive Platform
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-primary dark:text-white">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              A comprehensive platform designed to accelerate your career preparation journey.
            </p>
          </Reveal>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {features.map((feature, i) => {
              const Icon = icons[i]
              return (
                <StaggerItem key={feature.title}>
                  <div className="glass rounded-2xl p-6 hover-lift h-full">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg text-primary dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works */}
      <section id="courses" className="py-20 sm:py-28 bg-muted dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal className="text-center mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 mb-5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Simple Process
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-primary dark:text-white">
              How It Works
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Four simple steps to transform your career trajectory.
            </p>
          </Reveal>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <StaggerItem key={step.num}>
                  <div className="relative glass rounded-2xl p-6 hover-lift h-full">
                    <div className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold mb-4 num">
                      Step {step.num}
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg text-primary dark:text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal className="text-center mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 mb-5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Success Stories
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-primary dark:text-white">
              Student Success Stories
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Hear from students who transformed their careers with us.
            </p>
          </Reveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <div className="glass rounded-2xl p-6 hover-lift h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="font-semibold text-sm text-primary dark:text-white">{t.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{t.role}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div
          className="blob bg-secondary/30 dark:bg-secondary/40"
          style={{ width: 400, height: 400, bottom: -100, left: -100 }}
        />
        <div
          className="blob bg-accent/30 dark:bg-accent/40"
          style={{ width: 350, height: 350, top: -80, right: -80 }}
        />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-primary dark:text-white mb-4">
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
              Join thousands of students who have already landed their dream jobs with our guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/career-school/signup"
                className="group inline-flex items-center justify-center gap-2 bg-primary dark:bg-white text-white dark:text-primary font-semibold px-8 py-3.5 rounded-xl hover:bg-secondary dark:hover:bg-slate-200 transition shadow-lg shadow-primary/15 dark:shadow-accent/20"
              >
                Get Started Today
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/career-school/login"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-primary dark:text-white font-semibold px-8 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/40 dark:hover:border-accent/40 hover:bg-muted dark:hover:bg-slate-800 transition"
              >
                Sign In
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Free 14-day trial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                No credit card required
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-sm text-primary dark:text-white">Career School by Abiansh</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">&copy; 2026 Abiansh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
