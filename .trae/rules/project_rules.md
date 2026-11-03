# Project rules — Vasil S N Portfolio

## 1. Keep PROJECT_LOG.txt current (always)
After EVERY change (feature, fix, refactor, dependency, config, content), update
`PROJECT_LOG.txt`:
- Add a dated CHANGELOG entry at the top with the files touched and the reason.
- Update the STRUCTURE / DESIGN / TODO sections when they are affected.
- Never finish a task without updating the log.
- When pausing or running low on context, leave a `NEXT STEPS` block at the top of
  the log saying exactly where to resume.

## 2. Content lives in data, not components
- All editable content lives in `src/data/*`. It is the SINGLE SOURCE OF TRUTH.
- Never hard-code content (copy, facts, lists) in components.
- Never invent facts, copy, or data that is not already in `src/data/*`.

## 3. Code quality
- TypeScript strict mode. No `any`. No lorem ipsum. No invented facts.
- Respect `prefers-reduced-motion` everywhere (animations, smooth scroll, marquee).
- Prefer editing existing files. No dead code, no unused deps, no stray console logs.

## 4. Security
- NEVER put real secrets in `.env.example` — placeholders only.
- NEVER print, log, or echo the contents of `.env.local`.
- NEVER commit `.env.local` (it must stay in `.gitignore`).
- Secrets are only ever read from `process.env` on the server.
