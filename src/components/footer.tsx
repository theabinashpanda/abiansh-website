import { Mail, MapPin, ExternalLink } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-primary dark:bg-black text-slate-300 pt-12 sm:pt-16 pb-8 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent opacity-80" />
                <span className="relative text-white font-bold text-lg tracking-tight">
                  A
                </span>
              </div>
              <div>
                <div className="font-bold text-white text-sm sm:text-base">
                  {siteConfig.fullName}
                </div>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-slate-400 mt-0.5">
                  {siteConfig.tagline}
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              We build tailored B2B SaaS applications that solve specific
              operational problems for consulting, IT, retail, trading, and
              e-commerce businesses.
            </p>
          </div>

          {/* Company links */}
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500 font-bold mb-4">
              Company
            </div>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500 font-bold mb-4">
              Contact
            </div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                {siteConfig.email}
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                {siteConfig.address.short}
              </li>
              <li className="flex items-start gap-2">
                <ExternalLink className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                {siteConfig.linkedin}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.fullName} All rights
            reserved.
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-4">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
