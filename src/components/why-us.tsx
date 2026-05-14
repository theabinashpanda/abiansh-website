"use client";

import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "./reveal";
import { whyUsItems } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  MessageSquareText: LucideIcons.MessageSquareText,
  Target: LucideIcons.Target,
  Puzzle: LucideIcons.Puzzle,
  TrendingUp: LucideIcons.TrendingUp,
  Eye: LucideIcons.Eye,
};

export function WhyUs() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-28 bg-primary dark:bg-slate-950 text-white overflow-hidden">
      <div
        className="blob bg-secondary"
        style={{
          width: 500,
          height: 500,
          top: -150,
          right: -120,
          opacity: 0.3,
        }}
      />
      <div
        className="blob bg-accent"
        style={{
          width: 420,
          height: 420,
          bottom: -180,
          left: -120,
          opacity: 0.25,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <Reveal className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">
              <span className="w-6 h-px bg-accent" />
              Why clients work with us
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              No middlemen. No fluff.
              <br />
              Just software that ships.
            </h2>
            <p className="mt-3 sm:mt-4 text-slate-300 text-sm sm:text-base lg:text-lg">
              We&apos;re the people you&apos;ll actually be talking to — the
              same people writing the code.
            </p>
          </Reveal>

          <StaggerContainer className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
            {whyUsItems.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <StaggerItem
                  key={item.title}
                  className={
                    "span" in item && item.span ? "sm:col-span-2" : ""
                  }
                >
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur hover:bg-white/10 transition h-full">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 text-accent flex items-center justify-center flex-shrink-0">
                        {Icon && <Icon className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-semibold">{item.title}</div>
                        <div className="text-sm text-slate-400 mt-1 leading-relaxed">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
