# C.O.R.E. — Product Requirements Document

## The One-Sentence Pitch
A personal command launcher — a copy-paste prompt board that walks one
person through the full lifecycle of building a software project with
Claude, from brainstorm to launch to operate.

## The Problem
Building a project solo with Claude means constantly re-deriving "what
prompt do I run next, and in what order." Good prompts get written once,
used, and forgotten. Nothing tracks where a project actually is in its
lifecycle, so the same strategic/legal/design steps get skipped,
forgotten, or done too late (see: recurring mid-project rebrands).

## The Emotional Hook
Never stare at a blinking cursor wondering what to do next. Click the
next step, get a great prompt, paste it, move on.

## Target User
One person (Eric): a solo builder who runs several projects in parallel,
jumps between them throughout the day, works mostly in Claude Sonnet with
periodic Opus/Fable review passes, and prefers free/cheap infrastructure
until a project proves itself.

## Core Features (MVP — Stage 1 content pass)
- 60+ command prompts covering the full project lifecycle, written
  generically (no references to any single past project).
- Commands organized into a left-to-right workflow: sequential where
  order genuinely matters (Capture → Setup → Strategy → Brand → Design →
  Architecture), parallel where it's honest (Frontend/Backend together;
  Security/QA/Legal together; Marketing/Monetize together), and two
  "always available" columns (Capture, Operate).
- Brainstorm-first prompt pattern (raw ideas → reflection → "what you're
  missing") on Strategy, Design, Architecture, Frontend, Backend, Brand,
  Marketing, Monetize. Checklist-first (no brainstorm) on Security, QA,
  Legal.
- Model-escalation commands named for the model they're meant to run on
  (`/opus-opinion`, `/fable-opinion`, `/code-review`), placed at natural
  checkpoints (end of Frontend, end of Backend, pre-launch), each
  reminding the user to switch models before pasting.
- A dedicated Brand column (`/brand-name`, `/name-check`,
  `/rebrand-check`, `/rebrand-execute`) gated to run only once audience
  and viability are established — solving the recurring "named it as a
  joke, it became a real product" problem.
- An expanded Legal column covering COPPA, GDPR, HIPAA, CCPA, PCI, IP,
  DMCA, ADA/accessibility, and incorporation — each command opens by
  asking whether it even applies to this project.
- A Redesign column for reconciling a shipped prototype against its
  original design intent after a long coding jam.
- An Operate column (testing, monitoring, support, backup/DR) for
  post-launch work that the original command set had no home for.
- A `/pivot` (scope-shift) capture command that logs the moment a
  project's ambition changes, and is meant to trigger `/rebrand-check`
  and `/redesign-check` proactively instead of relying on memory.
- Standing cross-cutting rules baked into relevant prompts: default to
  free/cheap infrastructure and stub paid features rather than dropping
  them; assume a working prototype may already exist rather than
  assuming a blank slate.

## Features for Later (Stage 2/3 — not this pass)
- Two-dial mode system: an effort tier (Simple/Standard/Thorough) that
  dims out-of-scope commands, independent of a Legal risk-profile
  checklist (payments / health data / minors / EU users / UGC) that
  lights up only the relevant Legal commands.
- A visual progress rail showing current workflow phase.
- `localStorage` persistence so a project's green/gray button state
  survives a refresh (moved into Stage 2 specifically so a week of real
  use tests the actual workflow-memory value proposition, not just a
  reordered grid).
- Supabase-backed multi-project save/switch (second Supabase project,
  cloud-only — not the personal cPanel/Postgres server) for real
  cross-device persistence and the working project dropdown.

## What We Are NOT Building
- Multi-agent orchestration (two agents debating) — parked, revisit once
  the single-agent workflow is proven.
- Any assumption that this tool executes commands itself — it is a
  clipboard/prompt launcher, not an agent runner.
- Persistence on the personal cPanel server — cloud (Supabase) only,
  the personal server is a fallback, not the default.

## Monetization
None — personal tool, not a product to sell.

## Moat
N/A — not applicable to a personal tool.

## Open Questions
- Exact tier boundaries (which commands are Simple vs. Standard vs.
  Thorough) — to be tagged during Stage 2, informed by how Stage 1 is
  actually used for a week first.
- Whether Redesign and Brand should visually sit adjacent to each other
  given they share the same "reality drifted from intent" trigger.

## Parking Lot
- Multi-agent design collaboration (two agents working UI/branding
  back and forth) — Eric has used this a few times manually, not yet a
  built-in feature.
- Aspirational: this dashboard eventually becomes a live, working
  project tracker rather than a copy-paste trigger board.
