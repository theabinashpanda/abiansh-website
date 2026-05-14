"use client";

import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "./reveal";
import { services } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  UsersRound: LucideIcons.UsersRound,
  Boxes: LucideIcons.Boxes,
  Workflow: LucideIcons.Workflow,
  LineChart: LucideIcons.LineChart,
  DoorOpen: LucideIcons.DoorOpen,
  CalendarClock: LucideIcons.CalendarClock,
  FileText: LucideIcons.FileText,
  ShieldCheck: LucideIcons.ShieldCheck,
};

export function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-secondary dark:text-accent font-semibold mb-4">
            <span className="w-6 h-px bg-secondary dark:bg-accent" />
            What we build
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-primary dark:text-white leading-tight">
            Custom applications, built around your workflow — not a template.
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg">
            Eight focus areas where we ship the most. Hover any card to see
            what&apos;s inside.
          </p>
        </Reveal>

        <StaggerContainer className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <StaggerItem key={service.title}>
                <div className="group hover-lift bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 cursor-default h-full">
                  <div
                    className={`w-11 h-11 rounded-xl ${service.colorClass} flex items-center justify-center mb-4 sm:mb-5 ${service.hoverClass} transition`}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </div>
                  <div className="font-bold text-primary dark:text-white">
                    {service.title}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {service.description}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
