# Vasil S N | Portfolio

**Full Stack · Generative AI · ML**

A dark, futuristic personal portfolio built with Next.js — project case studies, a research section, a resume viewer, and a working contact form.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

Live: _&lt;add your Vercel URL after deploying&gt;_

## Preview

> **Add a screenshot at `public/screenshot.png`**, then uncomment the block below.

<!--
Once public/screenshot.png exists, remove this comment wrapper to show it:

<p align="center">
  <img src="public/screenshot.png" alt="Vasil S N portfolio preview" width="900" />
</p>
-->

## Features

- **Command palette (⌘K / Ctrl+K)** — keyboard-first navigation across sections, projects, and links
- **Smooth scrolling** — Lenis-driven, disabled for reduced-motion users
- **Scroll animations** — reveal-on-scroll sections with restrained Motion transitions
- **Project case-study pages** — per-project routes with a deterministic generated cover
- **Research section** — publication details (venue, dataset, methods)
- **Resume viewer** — embedded PDF at `/resume` with a graceful fallback
- **Working contact form** — Zod validation, honeypot, server-side rate limiting, delivered via Resend
- **SEO & social** — metadata, canonical URLs, `sitemap.xml`, `robots.txt`, and a generated OG image
- **Responsive & accessible** — skip link, landmarks, keyboard support, WCAG-minded contrast
- **Reduced-motion support** — honours `prefers-reduced-motion` for every animation

## Tech Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animation | motion (Motion for React) |
| Smooth scroll | Lenis |
| Command palette | cmdk |
| Validation | Zod |
| Email | Resend |
| Hosting | Vercel |

## Project Structure

```
portfolio/
├─ public/
│  ├─ images/me.jpg         # portrait (hero / about)
│  └─ cv.pdf                # resume PDF (drives /resume + downloads)
├─ src/
│  ├─ app/                  # routes, layout, globals.css
│  │  ├─ api/contact/       # POST handler (Zod + rate limit + Resend)
│  │  ├─ projects/[slug]/   # project case-study pages
│  │  ├─ resume/            # embedded PDF viewer
│  │  ├─ icon.tsx           # favicon (gradient "V" monogram)
│  │  ├─ opengraph-image.tsx# 1200×630 social card
│  │  ├─ sitemap.ts         # sitemap.xml
│  │  └─ robots.ts          # robots.txt
│  ├─ components/
│  │  ├─ sections/          # Hero, About, Experience, Projects, Research,
│  │  │                     #   Skills, Certifications, Contact
│  │  ├─ layout/            # Navbar, Footer
│  │  ├─ projects/          # ProjectCard, ProjectCover
│  │  ├─ contact/           # ContactForm (client)
│  │  ├─ effects/           # Lenis, Reveal, loader, atmosphere, progress
│  │  ├─ command-palette/   # ⌘K palette + provider
│  │  ├─ providers/         # AppProviders shell
│  │  └─ ui/                # buttons, headings, toast, brand icons
│  ├─ data/                 # ALL editable content (single source of truth)
│  └─ lib/                  # utils, hooks, validators, scroll helpers, assets
├─ .env.example             # environment template (safe to commit)
├─ PROJECT_LOG.txt          # living changelog / project notes
└─ LICENSE
```

## Getting Started

**Prerequisites:** Node.js 18+ (Node 20+ recommended) and npm.

```bash
# 1. Clone
git clone https://github.com/Vasilsn77/my-portfolio.git
cd my-portfolio

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local   # then fill in the values (see below)

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values. `RESEND_API_KEY` is read only on the server (inside the `/api/contact` route) and is never exposed to the browser.

| Variable | Required? | Description | Example |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | Yes | [Resend](https://resend.com/api-keys) API key used by the contact form | `re_xxxxxxxxxxxxxxxx` |
| `CONTACT_TO_EMAIL` | Yes | Inbox that receives contact-form submissions | `sayedvasil@gmail.com` |
| `CONTACT_FROM_EMAIL` | Yes | Verified Resend sender address | `onboarding@resend.dev` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL (metadata, `sitemap.xml`, `robots.txt`) | `https://your-domain.vercel.app` |

**Getting a Resend key:** create an account at [resend.com](https://resend.com), open **API Keys**, create a key, and paste it into `RESEND_API_KEY`.

> **Note:** with the default sender `onboarding@resend.dev`, Resend only delivers to the email address the Resend account was created with. To send to any address, verify your own domain in Resend and set `CONTACT_FROM_EMAIL` to that sender.

## Customizing Content

All editable content lives in [`src/data`](src/data) — the single source of truth. Components never hard-code copy or facts.

| File | Controls |
| --- | --- |
| `src/data/profile.ts` | Identity, headline, hero copy, CTAs, stats, education, nav links |
| `src/data/experience.ts` | Work & internship timeline |
| `src/data/projects.ts` | Project grid and case-study content |
| `src/data/research.ts` | Publications (venue, dataset, methods) |
| `src/data/skills.ts` | Skill groups, marquee, "currently exploring" |
| `src/data/certifications.ts` | Certifications and verify links |
| `src/data/contact.ts` | Contact section headings and messages |

**Add a new project:** append an entry to the `projects` array in `src/data/projects.ts`. Give it a unique `slug`, `title`, `category`, `summary`, and `tech`; the grid, the case-study route, and the sitemap pick it up automatically. Optional fields (`bullets`, `features`, `pipeline`, `useCases`, `highlights`, `repoUrl`, `image`) render only when present.

**Replace the photo:** save your portrait to `public/images/me.jpg` (square works best).
**Replace the CV:** export your resume to `public/cv.pdf`. The `/resume` viewer, the hero "Download CV" button, and the ⌘K "Download CV" action all use it.

## Deploying to Vercel

1. **Push to GitHub.** Use the repo you created, e.g. `https://github.com/Vasilsn77/my-portfolio`.
2. **Import the project.** Sign in at [vercel.com](https://vercel.com) → **Add New… → Project → Import Git Repository** and select the repo.
3. **Framework is detected automatically** as **Next.js**. Leave the build, output, and install commands at their defaults.
4. **Add the 4 environment variables** (Production, Preview, and Development): `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`.
5. **Deploy.** Wait for the build to finish and open the `*.vercel.app` URL.
6. **Optional — custom domain.** Add it under **Project → Settings → Domains**, then update `NEXT_PUBLIC_SITE_URL` to the final URL.
7. **Redeploy** after changing `NEXT_PUBLIC_SITE_URL` so metadata, sitemap, and robots reflect the final domain.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Contact

- **Email:** [sayedvasil@gmail.com](mailto:sayedvasil@gmail.com)
- **LinkedIn:** [vasil-s-n](https://www.linkedin.com/in/vasil-s-n-878b56253)
- **GitHub:** [@Vasilsn77](https://github.com/Vasilsn77)

## License

Released under the MIT License. See [LICENSE](LICENSE) — Copyright (c) 2026 Vasil S N.
