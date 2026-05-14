"use client";

import {
  ArrowRight,
  PlayCircle,
  TrendingUp,
  Boxes,
  Users,
  BarChart3,
  Package,
  UserCheck,
} from "lucide-react";
import { Reveal } from "./reveal";
import { Counter } from "./counter";
import { stats, industryStrip, siteConfig } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-24 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 lg:pb-28 overflow-hidden"
    >
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
            Now accepting Q3 engagements
          </div>

          {/* Headline */}
          <h1 className="text-[2rem] sm:text-5xl lg:text-[3.75rem] leading-[1.05] font-extrabold tracking-tight text-primary dark:text-white">
            Software systems that solve
            <br className="hidden sm:block" />
            {" day-to-day"}
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                business problems
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
            Abiansh designs and builds custom B2B SaaS applications for
            consulting, IT, retail, trading, and e-commerce companies. Practical
            software, built around how your business actually works.
          </p>

          {/* CTAs */}
          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 bg-primary dark:bg-white text-white dark:text-primary font-semibold px-6 py-3.5 rounded-xl hover:bg-secondary dark:hover:bg-slate-200 transition shadow-lg shadow-primary/15 dark:shadow-accent/20"
            >
              Discuss your requirement
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#process"
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-primary dark:text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/40 dark:hover:border-accent/40 hover:bg-muted dark:hover:bg-slate-800 transition"
            >
              <PlayCircle className="w-4 h-4" />
              See how we work
            </a>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 max-w-md">
            {stats.map((stat) => (
              <div key={stat.label}>
                <Counter
                  target={stat.value}
                  suffix={"suffix" in stat ? stat.suffix : ""}
                  className="text-2xl sm:text-3xl font-extrabold text-primary dark:text-white num"
                />
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
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
                {siteConfig.url}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-muted dark:bg-slate-900 rounded-xl p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Orders today
                </div>
                <div className="text-xl font-bold text-primary dark:text-white num">
                  1,284
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +12.4%
                </div>
              </div>
              <div className="bg-muted dark:bg-slate-900 rounded-xl p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Revenue
                </div>
                <div className="text-xl font-bold text-primary dark:text-white num">
                  &#8377;4.2L
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +8.1%
                </div>
              </div>
            </div>
            {/* Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Weekly orders
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">
                  7d
                </div>
              </div>
              <svg
                viewBox="0 0 240 80"
                className="w-full h-14 sm:h-16 sparkline"
              >
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="#0EA5E9"
                      stopOpacity="0.35"
                    />
                    <stop
                      offset="100%"
                      stopColor="#0EA5E9"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M0 60 L30 50 L60 55 L90 38 L120 42 L150 28 L180 32 L210 18 L240 22 L240 80 L0 80 Z"
                  fill="url(#g1)"
                />
                <path
                  d="M0 60 L30 50 L60 55 L90 38 L120 42 L150 28 L180 32 L210 18 L240 22"
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
                  <Package className="w-3.5 h-3.5 text-secondary dark:text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-primary dark:text-white truncate">
                    SKU-2841 restocked
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    Warehouse 3 · 2m ago
                  </div>
                </div>
                <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  Synced
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                  <UserCheck className="w-3.5 h-3.5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-primary dark:text-white truncate">
                    New lead · Praxis Retail
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    CRM · 4m ago
                  </div>
                </div>
                <div className="text-[10px] font-semibold text-secondary dark:text-accent bg-secondary/10 dark:bg-accent/10 px-2 py-0.5 rounded-md">
                  Hot
                </div>
              </div>
            </div>
          </div>

          {/* Floating widgets */}
          <div className="absolute -left-1 sm:left-0 top-0 glass rounded-xl px-3 sm:px-3.5 py-2.5 sm:py-3 shadow-xl shadow-primary/10 float float-d1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white">
                <Boxes className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Inventory
                </div>
                <div className="text-xs sm:text-sm font-bold text-primary dark:text-white num">
                  98.2% accuracy
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
                  CRM
                </div>
                <div className="text-xs sm:text-sm font-bold text-primary dark:text-white">
                  128 active leads
                </div>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 glass rounded-xl px-3 sm:px-3.5 py-2.5 sm:py-3 shadow-xl shadow-primary/10 float float-d3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Analytics
                </div>
                <div className="text-xs sm:text-sm font-bold text-primary dark:text-white">
                  +24% MoM
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Industry strip */}
      <Reveal className="relative max-w-7xl mx-auto px-5 sm:px-8 mt-12 sm:mt-16 lg:mt-20">
        <div className="text-center text-xs uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500 mb-5">
          Designed for teams in
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-10 gap-y-3 text-slate-400 dark:text-slate-500 font-semibold text-xs sm:text-sm">
          {industryStrip.map((name, i) => (
            <span key={name} className="contents">
              {i > 0 && (
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
              )}
              <span>{name}</span>
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
