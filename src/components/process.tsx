"use client";

import { Reveal, StaggerContainer, StaggerItem } from "./reveal";
import { processSteps } from "@/lib/data";

export function Process() {
  return (
    <section id="process" className="relative py-16 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-secondary dark:text-accent font-semibold mb-4">
            <span className="w-6 h-px bg-secondary dark:bg-accent" />
            How we deliver
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-primary dark:text-white leading-tight">
            A transparent six-step delivery process.
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg">
            You see exactly where the project is, every step of the way.
          </p>
        </Reveal>

        <div className="mt-10 sm:mt-12 lg:mt-14 relative">
          {/* Horizontal rail (desktop) */}
          <div className="hidden lg:block absolute top-6 left-[6%] right-[6%] h-0.5 timeline-line rounded-full" />
          {/* Vertical rail (mobile/tablet) */}
          <div className="lg:hidden absolute top-0 bottom-0 left-6 w-0.5 timeline-line-v rounded-full" />

          <StaggerContainer
            className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-6 lg:gap-4"
            staggerDelay={0.08}
          >
            {processSteps.map((step) => (
              <StaggerItem key={step.number}>
                <div className="relative pl-16 lg:pl-0">
                  <div
                    className={`absolute left-0 top-0 lg:relative lg:left-auto lg:top-auto w-12 h-12 rounded-full bg-white dark:bg-slate-900 border-2 ${step.borderColor} ${step.textColor} font-bold flex items-center justify-center z-10 shadow-sm`}
                  >
                    {step.number}
                  </div>
                  <div className="lg:mt-4 font-semibold text-primary dark:text-white leading-snug">
                    {step.title}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {step.description}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
