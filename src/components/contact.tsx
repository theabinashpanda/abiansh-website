"use client";

import { FormEvent, useState } from "react";
import { Mail, MapPin, Clock, Send, Calendar } from "lucide-react";
import { Reveal } from "./reveal";
import { siteConfig } from "@/lib/data";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-24 lg:py-28 bg-muted dark:bg-slate-950 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        className="blob bg-accent/30 dark:bg-accent/40"
        style={{ width: 400, height: 400, top: -100, left: -100 }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-secondary dark:text-accent font-semibold mb-4">
              <span className="w-6 h-px bg-secondary dark:bg-accent" />
              Get in touch
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-primary dark:text-white leading-tight">
              Need software for a specific business process?
            </h2>
            <p className="mt-3 sm:mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg">
              Describe the problem, and we&apos;ll propose a practical solution
              within 48 hours.
            </p>

            <div className="mt-6 sm:mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-secondary dark:text-accent flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    Email
                  </div>
                  <div className="text-primary dark:text-white font-semibold">
                    {siteConfig.email}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-secondary dark:text-accent flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    Office
                  </div>
                  <div className="text-primary dark:text-white font-semibold leading-relaxed">
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.line2}
                    <br />
                    {siteConfig.address.line3}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-secondary dark:text-accent flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    Response time
                  </div>
                  <div className="text-primary dark:text-white font-semibold">
                    Within 1 business day
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 shadow-sm space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1.5 w-full bg-muted dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-primary dark:text-white focus:outline-none focus:border-secondary dark:focus:border-accent focus:ring-2 focus:ring-secondary/15 dark:focus:ring-accent/15 transition"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Company
                  </label>
                  <input
                    type="text"
                    className="mt-1.5 w-full bg-muted dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-primary dark:text-white focus:outline-none focus:border-secondary dark:focus:border-accent focus:ring-2 focus:ring-secondary/15 dark:focus:ring-accent/15 transition"
                    placeholder="Acme Retail Pvt Ltd"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="mt-1.5 w-full bg-muted dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-primary dark:text-white focus:outline-none focus:border-secondary dark:focus:border-accent focus:ring-2 focus:ring-secondary/15 dark:focus:ring-accent/15 transition"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="mt-1.5 w-full bg-muted dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-primary dark:text-white focus:outline-none focus:border-secondary dark:focus:border-accent focus:ring-2 focus:ring-secondary/15 dark:focus:ring-accent/15 transition"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Industry
                </label>
                <select className="mt-1.5 w-full bg-muted dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-primary dark:text-white focus:outline-none focus:border-secondary dark:focus:border-accent focus:ring-2 focus:ring-secondary/15 dark:focus:ring-accent/15 transition">
                  <option>Select your industry</option>
                  <option>Consulting</option>
                  <option>IT Solutions</option>
                  <option>Retail</option>
                  <option>Trading</option>
                  <option>E-Commerce</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Brief requirement *
                </label>
                <textarea
                  required
                  rows={4}
                  className="mt-1.5 w-full bg-muted dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-primary dark:text-white focus:outline-none focus:border-secondary dark:focus:border-accent focus:ring-2 focus:ring-secondary/15 dark:focus:ring-accent/15 transition resize-none"
                  placeholder="We need a system that..."
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary dark:bg-white text-white dark:text-primary font-semibold px-6 py-3.5 rounded-xl hover:bg-secondary dark:hover:bg-slate-200 transition shadow-lg shadow-primary/15"
                >
                  {submitted ? "Submitted!" : "Submit requirement"}
                  <Send className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-primary dark:text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/40 dark:hover:border-accent/40 hover:bg-muted dark:hover:bg-slate-700 transition"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule discussion
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
                We respond within one business day. Your information is never
                shared with third parties.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
