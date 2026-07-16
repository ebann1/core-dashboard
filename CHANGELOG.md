# CHANGELOG

## 2026-07-16 — Auth, dashboard, and command launcher

- Scaffolded the project with `create-next-app` (TypeScript, Tailwind, App Router).
- Added a two-stage WarGames-style login (`joshua` decoy, then a real
  server-checked password) gating `/dashboard`. Hardened the auth with
  HMAC-signed expiring session tokens and a constant-time password
  comparison instead of a static session cookie.
- Built the C.O.R.E. dashboard: neural orb, logic panel, action items,
  and a command launcher with 63 commands across 13 categories.
- Added three-state command buttons (inactive / active-unclicked /
  used) — active buttons copy their full prompt to the clipboard and
  flash amber before turning green for the session. Added a
  RESET SESSION button.
- Activated all 63 commands with full prompt text.
- Deployed to Vercel (`core-dashboard-green.vercel.app`), with
  `CORE_PASSWORD` set as a production environment variable.

## 2026-07-16 — Workflow reorganization, Stage 1 (content)

Reworked the command launcher from a flat 13-column, 63-command grid
into a 16-column, 87-command sequential/parallel project workflow (see
[PLANNING.md](PLANNING.md) for the full design brief). Ships as pure
content — `src/lib/commands.ts` — with zero new mechanics.

- Genericized every command that referenced one specific past project
  (Baby Buddy): merged `/3am-test` into `/ux-audit`, rewrote `/coppa-check`
  to open by asking whether it even applies, removed the hardcoded
  Baby Buddy / Jet Planner / Keeper mock data from the dashboard's own
  placeholder panels in `dashboard/page.tsx`.
- Reordered into a left-to-right workflow: Capture and Operate are
  always-available; Setup → Strategy → Brand → Design → Architecture is
  sequential; Frontend/Backend, Security/QA/Legal, and Marketing/Monetize
  are parallel; Redesign is a re-entry point, not a linear step.
- Added four new columns: **Brand** (`/brand-name`, `/name-check`,
  `/rebrand-check`, `/rebrand-execute`), **Redesign** (`/redesign-check`,
  `/design-debt`, `/consistency-pass`), an expanded **Legal** (added
  HIPAA, CCPA, PCI, IP, DMCA, accessibility-legal, incorporation checks
  on top of the original five), and **Operate** (testing, monitoring,
  onboarding, cost audit, support, backup/DR).
- Added `/pivot` — a Capture command for logging the moment a project's
  scope changes, meant to proactively trigger `/rebrand-check` and
  `/redesign-check` instead of relying on memory.
- Added model-named verification checkpoints instead of a generic
  "second opinion": `/code-review-frontend`, `/code-review-backend`,
  `/opus-opinion` (QA), `/fable-opinion` (Launch) — each leads with an
  explicit "switch models before pasting this" instruction.
- Applied the brainstorm-first pattern (raw ideas → reflection → "by
  the way, here's what you're missing") to Strategy, Design, Brand,
  Marketing, and Monetize openers; kept Security/QA/Legal
  checklist-first; gave Architecture/Frontend/Backend a lighter
  "here's my recommendation, confirm or push back" pattern.
- Baked in cross-cutting rules: default to free-tier infrastructure and
  stub (not drop) paid features; assume a prototype may already exist
  rather than a blank slate.
- Verified: lint and build clean, 87 unique command identifiers with no
  key collisions, all 16 columns render, spot-checked click → copy →
  amber flash → green behavior still works against the new data.

## Planned — Workflow reorganization, Stages 2–3

- **Stage 2 (mechanics):** two-dial mode system (effort tier + legal
  risk profile), progress rail, localStorage persistence.
- **Stage 3 (cloud):** Supabase-backed multi-project save/switch.

Not started yet.
