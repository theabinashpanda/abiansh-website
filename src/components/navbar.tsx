"use client";

import { useState } from "react";
import { Sun, Moon, Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";
import { useTheme } from "./theme-provider";
import { navLinks, siteConfig } from "@/lib/data";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-[#050912]/70 border-b border-slate-200/60 dark:border-slate-800/60 transition-colors">
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-primary dark:bg-slate-900 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent opacity-90" />
              <span className="relative text-white font-bold text-lg tracking-tight">
                A
              </span>
            </div>
            <div className="leading-none">
              <div className="font-bold text-primary dark:text-white tracking-tight">
                {siteConfig.name}
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block">
                Innovative Solutions
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-primary dark:hover:text-white transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-muted dark:hover:bg-slate-900 transition"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-1.5 bg-primary dark:bg-white text-white dark:text-primary text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-secondary dark:hover:bg-slate-200 transition shadow-sm"
            >
              Get in touch
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-muted dark:hover:bg-slate-900 transition"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`mobile-menu lg:hidden fixed inset-0 z-[60] bg-white dark:bg-[#050912] flex flex-col ${
          menuOpen ? "open" : ""
        }`}
      >
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl bg-primary dark:bg-slate-900 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent opacity-90" />
              <span className="relative text-white font-bold text-lg tracking-tight">
                A
              </span>
            </div>
            <div className="font-bold text-primary dark:text-white">
              {siteConfig.name}
            </div>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-muted dark:hover:bg-slate-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-8 flex flex-col gap-1">
          {[...navLinks, { label: "Contact", href: "#contact" }].map(
            (link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-4 text-2xl font-bold text-primary dark:text-white border-b border-slate-100 dark:border-slate-900 last:border-0"
              >
                {link.label}
                <ArrowUpRight className="w-5 h-5 text-slate-400" />
              </a>
            )
          )}
        </nav>
        <div className="p-5 border-t border-slate-200 dark:border-slate-800">
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block text-center bg-primary dark:bg-white text-white dark:text-primary font-semibold py-3.5 rounded-xl"
          >
            Discuss your requirement
          </a>
        </div>
      </div>
    </>
  );
}
