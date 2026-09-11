import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Dhruv Upadhyay | M.Tech CSE Scholar & Systems Engineer | NSUT Delhi",
  description:
    "Portfolio and Interactive AI Assistant of Dhruv Upadhyay (M.Tech CSE Scholar at NSUT Delhi). Specializing in Ad-Hoc Network Link Predictability, Information Security, Low-Latency Distributed Systems, and AWS Cloud Architecture.",
  keywords: [
    "Dhruv Upadhyay",
    "NSUT Delhi",
    "M.Tech CSE",
    "Information Security",
    "Ad-Hoc Wireless Networks",
    "MANET Link Predictability",
    "AODV Routing",
    "Systems Engineer",
    "AWS Certified",
    "Next.js Portfolio",
    "RAG Assistant",
  ],
  authors: [{ name: "Dhruv Upadhyay" }],
  openGraph: {
    title: "Dhruv Upadhyay | M.Tech CSE Scholar | NSUT Delhi",
    description:
      "Interactive Technical Portfolio & RAG Assistant for Network Security & Distributed Systems Research.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme-preference');
                  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                  if (stored === 'dark' || (!stored && darkQuery.matches) || (stored === 'system' && darkQuery.matches)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 dark:bg-[#12161f] text-slate-900 dark:text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-600 dark:selection:text-cyan-300`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

