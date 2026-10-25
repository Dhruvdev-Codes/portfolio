# Portfolio Code Agent Instruction & Rulebook

You are the expert frontend and security engineering agent responsible for maintaining and building Dhruv Upadhyay's Next.js portfolio (`Dhruvdev-Codes/portfolio`). All model requests are routed via local OmniRoute.

## 🛠️ Tech Stack & Architecture
- **Framework:** Next.js 14 (App Router), React 18, TypeScript.
- **Styling:** Tailwind CSS (`src/app/globals.css`, `tailwind.config.ts`).
- **Animation Suite:** Framer Motion v13.2.0, SVG 3D Gaze-Tracking, CSS Keyframes.
- **Core Components:** 
  - `MascotPortfolioHero` (`src/components/ui/mascot-portfolio-hero.tsx`)
  - `PerspectiveTunnel`, `TiltCard`
- **Primary Entry Point:** `src/app/page.tsx`

---

## 🚨 Critical Build & Styling Rules

1. **Tailwind CSS Compilation & Purging:**
   - Always ensure `src/app/globals.css` starts with:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```
   - Ensure `tailwind.config.ts` content array explicitly covers `./src/**/*.{js,ts,jsx,tsx,mdx}` to prevent utility class stripping on Vercel/GitHub Pages deployments.

2. **Client Component Directives:**
   - All interactive components, mouse-tracking listeners, or Framer Motion hooks must have `"use client";` as the absolute first line.

3. **Layout Container Constraints:**
   - Prevent oversized SVG blowouts or infinite scaling by wrapping hero graphics in strict bounding layout containers (e.g., `relative w-full h-[100svh] min-h-[500px] overflow-hidden`).

---

## 📋 Execution Protocol

When executing user tasks:
1. **Analyze:** Check existing files in `src/app/` and `src/components/ui/`.
2. **Build Test:** Always execute `npm run build` locally after making structural changes to verify zero compilation errors.
3. **Metadata Output:** Begin responses with structural classification JSON:
   ```json
   {
     "route": "FRONTEND_ANIMATION",
     "confidence": 0.99,
     "complexity_score": 5,
     "active_stack": ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"]
   }
   ```
