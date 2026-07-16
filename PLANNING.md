# Command Launcher Workflow Reorganization — Planning

Captures the design session that produced the Stage 1/2/3 plan below,
after a week of real use surfaced that the original 63-command grid
carried leftover references to one specific past project (Baby Buddy)
and had no logical order. Reviewed by Opus before Stage 1 implementation
begins.

## Staging

**Stage 1 — Content.** Everything in `commands.ts`: genericize, merge/
remove redundant commands, reorder, add new columns, rewrite every
prompt and tooltip, bake in the standing rules below. Ships as a
complete, usable board with zero new mechanics.

**Stage 2 — Mechanics.** Two-dial mode system, progress rail,
`localStorage` persistence. Persistence is deliberately in Stage 2, not
Stage 3 — the whole point of the mode/tier system is to test whether
tracking progress through a workflow actually helps; that can't be
tested honestly if the state resets on every refresh.

**Stage 3 — Cloud.** A second, separate Supabase project (cloud-only —
the personal cPanel/PostgreSQL server was considered and rejected as
the default, kept only as a fallback) for multi-project save/switch
across devices. Starts only after Stage 1+2 have been used for a week.

Each stage ships and gets lived-in before the next starts.

## Content fixes (Stage 1)

**Remove Baby-Buddy-specific content:**
- `/3am-test` — currently framed as "the Baby Buddy standard," built
  entirely around a sleep-deprived-parent scenario. Genericize or merge
  into `/ux-audit`.
- `/ux-audit` — duplicates the same 3am/sleep-deprived-parent standard.
  Merge these two into one generic UX audit command.
- `/coppa-check` — tip and prompt explicitly say "Baby Buddy / Keeper
  specific" and assume every project handles children's data. Rewrite
  as a generic, conditional check that opens by asking whether it even
  applies.

**Merge/trim redundant commands:**
- `/edge-cases` vs `/qc` — keep both, but trim `/qc` so it stops
  duplicating the input-attack material that `/edge-cases` already
  owns.
- `/reddit-hits` vs `/market` — keep `/reddit-hits` as the deep dive,
  trim `/market`'s Reddit section to a pointer at it.

**New columns:**
- **Brand** (after Strategy, before Design) — `/brand-name`,
  `/name-check`, `/rebrand-check`, `/rebrand-execute`. Gated: the
  prompt itself checks that audience + viability are established before
  running the real naming session, since a working title from Setup is
  expected to be disposable.
- **Redesign** (after Frontend/Backend) — for reconciling a built
  prototype against original design intent after a coding jam.
  Conceptually paired with Brand/`/rebrand-check` since both fire off
  the same trigger: a `/pivot`.
- **Operate** (after Launch) — testing, monitoring, support, backup/DR.
  The original set had no home for anything post-launch.

**Legal expansion** — add `/hipaa-check`, `/ccpa-check`, `/pci-check`,
`/ip-check`, `/dmca-policy`, `/accessibility-legal`,
`/incorporate-check`. Each opens by asking whether it applies to this
project — none should read as a blanket requirement.

**New capture command:** `/pivot` (scope-shift) — fired the moment a
project's real ambition becomes clear (the MoMoney "wait, this could
actually make money" moment). Logs what changed and what triggered it.
Meant to proactively suggest `/rebrand-check` and the Redesign column
instead of relying on memory — this is the fix for the recurring
mid-project-rebrand pain point.

**Model-escalation commands**, named for the model they run on, not a
generic "second opinion":
- `/opus-opinion` and `/fable-opinion` — tailored per section (each
  column's version reviews for that column's specific failure mode:
  Design reviews for drift from the original brief, Legal reviews for
  compliance items rationalized away, Marketing reviews for wishful
  thinking, etc.) rather than one generic catch-all button.
- `/code-review` — placed at natural checkpoints: end of Frontend, end
  of Backend, and Pre-Launch. Redundant coverage is fine here.
- All three lead with an explicit "switch to Opus/Fable before pasting
  this" instruction as the first line of the prompt, not buried in the
  tooltip — the button can't switch the model, so the reminder has to
  be unmissable.

**`/grill-me` suggestions** — not a new grid button. Attached as a
small inline tag on the handful of commands where an adversarial
gut-check matters most: `/rebrand-check`, `/viability`, `/pricing`,
`/what-dont-i-know`.

## Standing cross-cutting rules (bake into relevant prompts)

- **Free-first infrastructure.** Default every stack/integration
  recommendation to the free tier. When something requires payment
  (e.g. a commercial API license), build the feature but leave it
  stubbed/off with a note to enable it once there's revenue — don't
  silently drop it.
- **Prototype may already exist.** Simple-mode users go straight from
  Setup to building. Prompts for Strategy/Brand/Design/Architecture
  that run later must not assume a blank slate — they should
  reverse-engineer from whatever's already built and reconcile, not
  pretend nothing exists yet.
- **Light-touch brainstorm on the technical columns.** Architecture,
  Frontend, and Backend get a lighter pattern than the full open
  brainstorm used elsewhere: "here's what I recommend and why, here's
  the cost tradeoff, confirm or push back" — not free-association.

## Brainstorm-first vs. checklist-first

- **Brainstorm-first** (raw ideas → reflection → "by the way, here's
  what you're missing" → structured output): Strategy, Design,
  Architecture (light version), Frontend (light version), Backend
  (light version), Brand, Marketing, Monetize.
- **Checklist-first, no brainstorm:** Security, QA, Legal — these
  benefit more from a direct audit than free association, and the user
  explicitly prefers to run these ("security environment audit") and
  trust the output, verifying later via `/opus-opinion`.

## Column order

```
Capture                                  (always available, not sequential)
  ↓
Setup → Strategy → Brand → Design → Architecture
  ↓
Frontend ⟷ Backend                        (parallel)
  ↓
Redesign                                  (re-entry point, not linear)
  ↓
Security ⟷ QA ⟷ Legal                     (parallel, all gate launch)
  ↓
Marketing ⟷ Monetize                      (parallel)
  ↓
Launch
  ↓
Operate                                   (ongoing, not a finish line)
```

## Deferred to Stage 2

- Two-dial mode system: effort tier (Simple/Standard/Thorough, dims
  out-of-scope commands) independent from a Legal risk-profile
  checklist (payments / health data / minors / EU users / UGC) that
  lights up only relevant Legal commands regardless of tier.
- Tier-upgrade behavior: bumping from Simple to Standard reveals
  previously-dimmed columns/commands; anything already clicked stays
  green.
- Progress rail showing current workflow phase.
- `localStorage` persistence per project name.

## Deferred to Stage 3

- Second Supabase project (cloud-only, separate from the existing one),
  multi-project save/switch, the project dropdown actually working.

## Explicitly parked, not scheduled

- Multi-agent design collaboration (two agents working back and forth).
- Making this dashboard an actual agent runner rather than a
  copy-paste trigger board.

## Opus review notes (pre-Stage-1)

Reviewed the plan above before implementation started. Verdict: solid
start, proceed, with four things folded in above rather than left for
later:

1. Persistence moved into Stage 2 (not deferred to Stage 3) so a week
   of real use tests actual workflow-memory, not just a reordered grid.
2. Added `/pivot` as the proactive trigger for `/rebrand-check` and
   Redesign — reframes the recurring mid-project rebrand as a missed
   event to capture, not a personality flaw.
3. Stage 1 ships alone and gets lived-in before Stage 2 starts — the
   reorder itself may change what's actually wanted from Stage 2/3.
4. Every reworked prompt must assume a prototype may already exist,
   since Simple-mode use means code often precedes strategy/brand/
   design in practice.

Kept as-is: the two-dial mode system, parallel (not fake-linear)
columns, model-named verification buttons, and deferring persistence
infra beyond localStorage and multi-agent entirely.
