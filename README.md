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
| `public/images/me.jpg` | Hero / about photo — square works best (rendered in a square frame, `object-cover`) |
| `public/cv.pdf` | Resume PDF (drives `/resume`, the hero “Download CV” button, and the ⌘K “Download CV” action) |

Add `me.jpg` by saving your portrait to `public/images/me.jpg` and `cv.pdf` by exporting your resume to `public/cv.pdf`. No code changes needed — both are picked up automatically.

Until they exist:
- the hero shows a gradient monogram orb instead of the photo;
- the CV button degrades to a link to `/resume`, and the ⌘K “Download CV” action is hidden;
- `/resume` shows a friendly “Resume coming soon” state instead of a broken PDF embed.

## Edit content

All copy lives in `src/data/*` — do not hard-code facts in components. See `PROJECT_LOG.txt` for structure and TODOs.

## Deploy to Vercel — checklist

**1. Create the GitHub repo and push**

```bash
git add -A
git commit -m "chore: initial deploy"
git branch -M main            # Vercel expects main by default
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

**2. Import the project in Vercel**

1. Sign in at [vercel.com](https://vercel.com) (GitHub login is easiest).
2. **Add New… → Project → Import Git Repository** and pick the repo.
3. Framework preset is detected automatically (**Next.js**). Leave Build Command (`next build`), Output Directory (`.next`), and Install Command (`npm install`) at their defaults.
4. **Choose a project name** — this decides your `*.vercel.app` subdomain, e.g. project name `vasil-sn-portfolio` → `https://vasil-sn-portfolio.vercel.app`.

**3. Add the 4 environment variables**

Before the first deploy, expand **Environment Variables** and add each one for **Production, Preview and Development**:

| Key | Value |
| --- | --- |
| `RESEND_API_KEY` | your real Resend key (`re_…`) — **never commit this** |
| `CONTACT_TO_EMAIL` | `sayedvasil@gmail.com` |
| `CONTACT_FROM_EMAIL` | `onboarding@resend.dev` (or your verified domain sender) |
| `NEXT_PUBLIC_SITE_URL` | your live URL, e.g. `https://vasil-sn-portfolio.vercel.app` |

`NEXT_PUBLIC_SITE_URL` feeds `metadataBase`, the canonical URLs, `sitemap.xml`, and `robots.txt`, so set it to the final domain. If you add a custom domain later, update this variable and redeploy.

**4. Deploy, then verify**

- Deploy and open the `*.vercel.app` URL.
- Check `/sitemap.xml` and `/robots.txt` return your live domain.
- Submit a test message through the contact form and confirm it arrives at `CONTACT_TO_EMAIL`.
- If the form returns “Something went wrong”, the most likely cause is a missing/invalid `RESEND_API_KEY` or an unverified `CONTACT_FROM_EMAIL` sender. Check **Vercel → Project → Logs** for the server-side warning.

**5. Optional: custom domain**

**Project → Settings → Domains → Add**, follow the DNS instructions, then update `NEXT_PUBLIC_SITE_URL` and redeploy.

> Note: `RESEND_API_KEY` is read only from `process.env` on the server (inside the `/api/contact` route handler) and is never sent to the browser. `.env.local` is gitignored — do not commit it, and keep `.env.example` free of real values.

