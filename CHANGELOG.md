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

## Planned — Workflow reorganization (see [PLANNING.md](PLANNING.md))

Spent a full design session (documented in PLANNING.md) reworking the
command launcher from a flat grid into a logical, sequential/parallel
project workflow, after a week of real use surfaced that the original
column order and several commands (`/3am-test`, `/coppa-check`,
`/ux-audit`) were hard-coded to one specific past project (Baby Buddy)
instead of being generic. Work is being staged in three parts:

- **Stage 1 (content):** genericize and rewrite all 63 commands/tooltips,
  reorder into a workflow-based column structure, add Brand/Redesign/
  Operate columns and an expanded Legal section, add `/pivot` capture.
- **Stage 2 (mechanics):** two-dial mode system (effort tier + legal
  risk profile), progress rail, localStorage persistence.
- **Stage 3 (cloud):** Supabase-backed multi-project save/switch.

Not started yet — this entry will be split into dated entries as each
stage ships.
