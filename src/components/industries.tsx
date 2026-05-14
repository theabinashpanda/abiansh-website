"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowDown,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { Reveal } from "./reveal";
import { industries, industryKeys, type IndustryKey } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  Briefcase: LucideIcons.Briefcase,
  Cpu: LucideIcons.Cpu,
  ShoppingBag: LucideIcons.ShoppingBag,
  TrendingUp: LucideIcons.TrendingUp,
  ShoppingCart: LucideIcons.ShoppingCart,
};

export function Industries() {
  const [activeTab, setActiveTab] = useState<IndustryKey>("consulting");
  const data = industries[activeTab];

  return (
    <section
      id="industries"
      className="relative py-16 sm:py-24 lg:py-28 bg-muted dark:bg-slate-950 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        className="blob bg-secondary/30 dark:bg-secondary/40"
        style={{ width: 400, height: 400, top: "10%", right: -100 }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-secondary dark:text-accent font-semibold mb-4">
            <span className="w-6 h-px bg-secondary dark:bg-accent" />
            Industries we serve
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-primary dark:text-white leading-tight">
            Real problems. Specific solutions.
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg">
            Pick an industry. See the operational issues we hear most — and what
            we ship to fix them.
          </p>
        </Reveal>

        {/* Tabs */}
        <Reveal className="mt-8 sm:mt-10 -mx-5 sm:mx-0 px-5 sm:px-0">
          <div className="flex gap-2.5 overflow-x-auto pb-2 tabs-scroll">
            {industryKeys.map((key) => {
              const ind = industries[key];
              const Icon = iconMap[ind.icon];
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`tab-btn flex-shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-4 sm:px-5 py-2.5 text-sm font-semibold text-primary dark:text-white ${
                    activeTab === key ? "active" : ""
                  }`}
                >
                  {Icon && (
                    <Icon className="inline w-4 h-4 mr-1.5 -mt-0.5" />
                  )}
                  {ind.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panel */}
        <Reveal className="mt-6 sm:mt-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm">
            <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-6 items-center">
              {/* Problems */}
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-rose-600 dark:text-rose-400 font-bold mb-4">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Common problems
                </div>
                <AnimatePresence mode="wait">
                  <motion.ul
                    key={`problems-${activeTab}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2.5"
                  >
                    {data.problems.map((problem, i) => (
                      <motion.li
                        key={problem}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.5 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                          {problem}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>

              {/* Arrow divider */}
              <div className="flex lg:flex-col justify-center items-center gap-2 text-secondary">
                <div className="hidden lg:block w-px h-12 bg-gradient-to-b from-transparent to-slate-200 dark:to-slate-800" />
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white shadow-lg shadow-secondary/30">
                  <ArrowRight className="w-5 h-5 lg:hidden arrow-anim-x" />
                  <ArrowDown className="w-5 h-5 hidden lg:block arrow-anim-y" />
                </div>
                <div className="hidden lg:block w-px h-12 bg-gradient-to-t from-transparent to-slate-200 dark:to-slate-800" />
              </div>

              {/* Solutions */}
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400 font-bold mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Solutions we build
                </div>
                <AnimatePresence mode="wait">
                  <motion.ul
                    key={`solutions-${activeTab}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2.5"
                  >
                    {data.solutions.map((solution, i) => (
                      <motion.li
                        key={solution}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: i * 0.07 + 0.15,
                          duration: 0.5,
                        }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                          {solution}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
