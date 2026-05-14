import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abiansh | Custom B2B SaaS Development Company",
  description:
    "Abiansh builds practical software applications for consulting, IT, retail, trading, and e-commerce businesses.",
  keywords: [
    "custom software development",
    "b2b saas development",
    "inventory software",
    "CRM systems",
    "business automation",
  ],
  metadataBase: new URL("https://abiansh.com"),
  openGraph: {
    title: "Abiansh | Custom B2B SaaS Development Company",
    description:
      "Abiansh builds practical software applications for consulting, IT, retail, trading, and e-commerce businesses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta
          name="theme-color"
          content="#FFFFFF"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#050912"
          media="(prefers-color-scheme: dark)"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var saved = localStorage.getItem('theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && systemDark)) document.documentElement.classList.add('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased font-sans">{children}</body>
    </html>
  );
}
