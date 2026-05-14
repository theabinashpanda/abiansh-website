"use client";

import { ExternalLink, Mail } from "lucide-react";
import { Reveal } from "./reveal";
import { founderCards, founderStats, founderTags } from "@/lib/data";

export function Founders() {
  return (
    <section id="founders" className="relative py-16 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-secondary dark:text-accent font-semibold mb-4">
              <span className="w-6 h-px bg-secondary dark:bg-accent" />
              About the founders
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-primary dark:text-white leading-tight">
              Academic rigor.
              <br />
              Practical software delivery.
            </h2>
            <p className="mt-4 sm:mt-5 text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed">
              Abiansh was founded by professors from{" "}
              <strong className="text-primary dark:text-white">
                KIIT University, Bhubaneswar
              </strong>
              , with deep experience in software engineering, analytics, and
              enterprise system development.
            </p>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed">
              We combine the discipline of academia — clean abstractions, peer
              review, falsifiable claims — with the pragmatism of shipping
              production software for real businesses.
            </p>
            <div className="mt-6 sm:mt-7 flex flex-wrap gap-2">
              {founderTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-muted dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-primary dark:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4">
              {founderCards.map((founder) => (
                <div
                  key={founder.initial}
                  className="hover-lift bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${founder.gradient} flex items-center justify-center text-white text-lg font-bold`}
                    >
                      {founder.initial}
                    </div>
                    <div>
                      <div className="font-bold text-primary dark:text-white">
                        {founder.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {founder.subtitle}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {founder.description}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-slate-400">
                    <ExternalLink className="w-4 h-4" />
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
              {founderStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-muted dark:bg-slate-900 rounded-2xl p-3 sm:p-4 text-center border border-slate-200 dark:border-slate-800"
                >
                  <div className="text-xl sm:text-2xl font-extrabold text-primary dark:text-white num">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
