# Vasil S N — Portfolio

Personal portfolio for **Vasil S N**: dark, futuristic, App Router site covering full-stack, GenAI/agents, and ML work.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint
```

## Environment variables

Copy `.env.example` → `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | [Resend](https://resend.com/api-keys) API key for the contact form |
| `CONTACT_TO_EMAIL` | Inbox for form submissions (`sayedvasil@gmail.com`) |
| `CONTACT_FROM_EMAIL` | Verified Resend sender (default `onboarding@resend.dev`) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |

Get a Resend key: create an account at [resend.com](https://resend.com), open **API Keys**, create a key, paste it into `.env.local`.

## Assets to drop in later

| Path | What |
| --- | --- |
| `public/images/me.jpg` | Hero / about photo |
| `public/cv.pdf` | Resume PDF (`/resume` + Download CV) |

Until they exist, the UI shows a monogram placeholder and a “resume coming soon” state (resume page in a later phase).

## Edit content

All copy lives in `src/data/*` — do not hard-code facts in components. See `PROJECT_LOG.txt` for structure and TODOs.

## Deploy (Vercel)

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add the env vars above.
4. Deploy. Optional: attach a custom domain later.

Full deploy checklist lands in Phase 5.
