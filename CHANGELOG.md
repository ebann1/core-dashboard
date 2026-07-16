# CHANGELOG

## 2026-07-16 — Stage 2 complete: tier dial, risk-profile checklist, persistence

Finished the three pieces deliberately deferred from the first Stage 2
cut.

- **Fifth state, Unused** (light gray, lighter than Queued) — a command
  outside the current effort tier or an unchecked legal risk flag.
  Still fully clickable like every other state; `done` always takes
  priority over `unused` so completed work never un-greens itself if
  the tier is later lowered.
- **Effort-tier dial** — SIMPLE / STANDARD / THOROUGH segmented control
  in the launcher header. Every command carries a `tier` (defaults to
  `standard` if omitted); a command is in scope when its tier rank is
  at or below the selected dial position. All 88 commands were tagged
  by hand — e.g. `/brainstorm`, `/new-project`, `/ui-brief`, `/build-ui`,
  `/env-audit`, `/qc` are `simple`; most Architecture/Backend/QA/Legal
  basics are `standard`; deep-dive commands (`/color-psych`,
  `/data-play`, `/reddit-hits`, `/opus-opinion`) are `thorough`.
- **Legal risk-profile checklist** — five independent toggle chips
  (Payments, Health data, Minors, EU users, UGC) that control visibility
  for the Legal commands they map to (`/pci-check`, `/hipaa-check`,
  `/coppa-check`, `/gdpr-review`, `/dmca-policy`) regardless of the tier
  dial — a Simple-tier project handling payments still sees
  `/pci-check`; a Thorough-tier project with no EU users never sees
  `/gdpr-review`. `/ccpa-check` didn't map cleanly to any of the five
  flags, so it stays tier-gated (`thorough`) instead.
- **localStorage persistence, per project** — progress (`used`), tier,
  and risk flags are saved under `core-dashboard:<project name>` and
  reloaded whenever the project dropdown changes. Implemented as a
  keyed remount (`<ProjectBoard key={project} .../>`) with lazy
  `useState` initializers reading `localStorage`, not a load-effect —
  React's hooks linter flags `setState` inside an effect as a footgun
  (cascading renders), and the keyed-remount pattern is the
  React-recommended fix for "state that resets when an id changes."
- Verified live end-to-end: toggling tier/risk flags moves the right
  buttons between unused and queued; switching to a fresh project
  starts empty; switching back to a project with progress restores its
  exact `used` set, tier, and risk flags — including surviving a hard
  page reload, confirming real `localStorage` persistence and not just
  in-memory state. Lint and build clean.

## 2026-07-16 — Stage 2 (first cut): unlock-logic state engine

Replaced the flat blue/green button model with a four-state engine
derived entirely from the existing `used` Set — no new state, no tier
UI yet. CRT styling throughout: black background, colored border and
text only, no fills.

- **Queued** (medium gray) — on the workflow path but waiting on a
  prerequisite column or the previous command in its own column.
- **Ready** (blue) — actionable now.
- **Done** (green) — clicked this session.
- **Backlog** (red) — an elective Marketing/Monetize command still
  undone once `/launch-check` fires; a "you chose to defer this, look
  at it" flag, not a punishment.
- Capture, Redesign, and Operate are fully elective — always Ready,
  never gated, since nothing in those columns has a real dependency.
- All other columns unlock via a column-to-column prerequisite map
  (Setup → Strategy → Brand → Design → Architecture → Frontend/Backend
  → Security/QA/Legal → Launch, with Frontend and Backend both keying
  off Architecture, and Launch requiring both Security and QA started).
  Within an unlocked column, commands unlock top-to-bottom in the order
  they're already listed — no extra per-command metadata needed.
- Verified live: `/new-project` → done unlocks `/start-session` and
  `/prd`; `/launch-check` flips still-undone `/market` from ready to
  backlog. Lint and build clean.

Deferred to a later pass: the effort-tier dial (Simple/Standard/
Thorough) and its Unused state, the legal risk-profile checklist, and
localStorage persistence — this was a fast, credit-constrained pass to
get the core unlock logic live; tune from here.

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

## 2026-07-16 — Redesign column follow-up: /design-pivot

While poking around Stage 1, noticed `/redesign-check`'s RE-BRIEF
outcome buried the "this simple thing became a real product, the
design needs a full rethink" moment inside a drift-detection command —
the same problem the original Brand complaint had before
`/rebrand-check` got split out. Added a fourth Redesign command,
`/design-pivot`, as its own explicit trigger (tied to `/pivot`, same
brainstorm-first shape as `/ui-brief`) instead of a side-effect verdict.
Redesign is now 4 commands, project total is 88.

## Planned — Workflow reorganization, Stages 2–3

- **Stage 2 (mechanics):** two-dial mode system (effort tier + legal
  risk profile), progress rail, localStorage persistence.
- **Stage 3 (cloud):** Supabase-backed multi-project save/switch.

Not started yet.
