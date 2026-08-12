# Market Craft — Agency Platform

A Next.js marketing website for **Market Craft**, a marketing agency, with a landing page, a working contact form backed by MongoDB + email, a client-side interactive "Marketing Score" quiz, and a static blog. The page `<title>` is literally set to `"Market Craft"` in `src/app/layout.tsx`.

## Overview

Everything routes through Next.js 15 (App Router, `src/app/`), styled with Tailwind CSS + shadcn/ui (`src/components/ui/`). The one page that actually does something server-side is the landing page's contact form, which hits a legacy Next.js **Pages Router** API route (`pages/api/contact.js`) that writes to MongoDB and sends an email via Nodemailer. Everything else — the marketing quiz, testimonials, client showcase — is static content or client-only interactivity with no backend.

## Key Features

**Working, verified in code:**
- **Landing page** (`src/app/page.tsx` → `LandingPage`) — Navbar, Hero, Services, Mission Stats, How It Works, Clients showcase, Testimonials, Blog/Newsletter section, Footer.
- **Contact form** (`ContactFormModal` → `POST /api/contact`) — the only real backend flow in the repo. `pages/api/contact.js` saves `{name, phone, email, message}` to a MongoDB `Contact` collection via Mongoose (`src/lib2/mongodb.js`, `src/models/contact.js`), then emails the submission to `process.env.EMAIL_USER` through Nodemailer's Gmail transport.
- **"What's Your Marketing Score?" quiz** (`marketing-score-quiz.tsx`) — a 4-question client-side quiz (emoji-choice + slider questions) that computes a 0–100 score with a fixed arithmetic formula (`answer * 25` for emoji questions, `(10 - answer) * 10` for the slider), animated with Framer Motion, firing `canvas-confetti` when the score exceeds 70. This is a static, hardcoded scoring rule — not a real marketing assessment backed by data or a model.
- **Client showcase** (`ourclients.tsx`) — a hardcoded array of 5 named clients (Green Mall, Floral Studio, Flora Flowers, Mehdees, Dr. Inqalab Fareed) with logos from `public/clients/`. Static in code, not fetched from a CMS.
- **Blog** — `/blogpage/[slug]` renders one of **3 hardcoded blog posts** (full Markdown-ish text baked directly into `blogpage/[slug]/page.tsx`, matched by slug). There is no CMS, database, or admin UI behind this — adding a post means editing that array in the source file.

**Present in the UI but not functional:**
- **Blog list at `/blogpage`** — renders only the newsletter-subscribe box. The actual "Latest Marketing Insights" card grid that would list the 3 blog posts is present in `blog-newsletter.tsx` but entirely commented out, so `/blogpage` currently shows no way to browse to the blog posts from the UI (the `[slug]` URLs still work if you know them or reach them from elsewhere).
- **Newsletter subscribe form** — submits to `POST /subscribe-newsletter` via the shared axios client, but no such API route exists anywhere in this repo (only `/api/contact` exists). Every newsletter signup attempt will fail against a real deployment unless there's an external service at that path that isn't part of this codebase.

**Removed since the last audit:** this repo previously contained an unrelated, non-functional healthcare app (a "role selection" page for Doctor/Nutritionist/Lab Technician/Admin/Pharmacist, a patient signup form, and a Google OAuth callback pointing at a backend that didn't exist in this repo), plus a `package.json` literally named `"hygieia-frontend"` with a broken self-referential dependency, and dead "Hygieia"-themed placeholder text sitting in an unused field of the services timeline. None of it was reachable from the actual site (nothing in the navbar/footer linked to it), so it's been deleted rather than reworked. `package.json`'s `name` is now `marketcraft-agency-platform`.

## Tech Stack

### Frontend
- **Next.js 15.3.1** (App Router) + **React 19**
- **Tailwind CSS 4** + **shadcn/ui** (`components.json`, `src/components/ui/*`), icons via `lucide-react`
- **Framer Motion** — scroll/entrance animations across nearly every landing-page component (confirmed imports in `hero-section.tsx`, `navbar.tsx`, `mission-stats.tsx`, `services.tsx`, `ourclients.tsx`, `marketing-score-quiz.tsx`, `blogpage/[slug]/page.tsx`, and more)
- **canvas-confetti** — `marketing-score-quiz.tsx` only
- **react-intersection-observer** — `ourclients.tsx`, to trigger the entrance animation when the section scrolls into view
- **axios** — a single shared client (`src/lib/axios.ts`) pointed at `process.env.BASE_URL || 'http://localhost:4000/api'`, used by the (currently broken, see Key Features) newsletter form

### Backend
- **Next.js API route** (`pages/api/contact.js`, Pages Router — note this coexists with the App Router used for everything else) — the only real backend endpoint in this repo
- **Mongoose 8** — `src/lib2/mongodb.js` (cached connection helper) and `src/models/contact.js` (the `Contact` schema: name/phone/email/message + timestamps)
- **Nodemailer** — Gmail SMTP transport in `pages/api/contact.js`, reading `EMAIL_USER`/`EMAIL_PASS` from the environment

### Declared as dependencies but not used anywhere in the code
Verified by grepping every `.ts`/`.tsx`/`.js` file for imports — none of these appear outside `node_modules` or `package.json`:
- `groq-sdk` — no import anywhere; there is no AI/LLM feature in this codebase despite this dependency being present
- `express`, `cors`, `body-parser` — no custom server file exists; the app runs entirely on Next.js's built-in server
- `react-hook-form`, `zod` — only referenced inside the unused shadcn `form.tsx` UI primitive; the actual contact form uses plain `useState`, not this stack
- `mongodb` (the raw driver, as opposed to `mongoose`) — `mongoose` is what's actually imported everywhere data touches MongoDB

## Architecture

```
Browser → Next.js App Router (src/app) ── LandingPage ── ContactFormModal ─┐
                                                                            ▼
                                                     pages/api/contact.js (Pages Router)
                                                            │                │
                                                            ▼                ▼
                                                  MongoDB (Mongoose)   Nodemailer → Gmail
```

Everything else in `src/app` (marketing quiz, blog, client showcase, testimonials) renders client-side with no network call, except the newsletter form, which calls an axios client pointed at `http://localhost:4000/api` — a backend that does not exist inside this repository (see Key Features: the newsletter endpoint is broken).

## Setup Instructions

### Prerequisites
- Node.js and npm
- A MongoDB instance (the app throws on `connectToDB()` if `MONGODB_URI` isn't set)
- A Gmail account + [app password](https://support.google.com/accounts/answer/185833) if you want the contact form's email notification to work

### Installation
```bash
npm install
```

### Environment variables
No `.env.example` is committed, so here are the variables the code actually reads (`grep -rn "process.env" .`):
```env
MONGODB_URI=       # required — src/lib2/mongodb.js throws without it
EMAIL_USER=        # required for the contact form's email step — your Gmail address
EMAIL_PASS=        # required — a Gmail App Password, not your regular password
BASE_URL=          # optional — axios client base URL, defaults to http://localhost:4000/api
```

### Run
```bash
npm run dev
```
Open `http://localhost:3000`.

## Known Issues

These are things I found in the code that you should be aware of before this is treated as production-ready, rather than things I'm guessing at:

1. **Newsletter signup is broken** — posts to `/subscribe-newsletter`, which has no corresponding route in this repo (see Tech Stack).
2. **Stray, unrelated files are committed**: `psges` (an empty, 0-byte file at the repo root) and `public/Student Slips.pdf.crdownload` (a 540 KB incomplete browser download of an unrelated PDF named "Student Slips"). Neither is referenced by any code.
3. **Unused dependencies** listed in `package.json` (`groq-sdk`, `express`, `cors`, `body-parser`, `react-hook-form`, `zod`) — see Tech Stack for detail.
4. No `LICENSE` file, no test files, and no CI configuration exist anywhere in this repo.

## Deployment

Deployed on Vercel: build verified locally (`npm run build`) before pushing.
