// C.O.R.E. Command Launcher data
// active: true = real prompt exists, button is blue and functional
// active: false = not yet written, button is dark gray, not clickable

export interface Command {
  cmd: string;
  tip: string;
  prompt?: string;
  active: boolean;
}

export interface CommandColumn {
  col: string;
  items: Command[];
}

export const commandColumns: CommandColumn[] = [
  {
    col: "Capture",
    items: [
      {
        active: true,
        cmd: "/brainstorm",
        tip: "You've got an idea firing. Run this when you're ready to just talk. No building, no structure — just blabber everything out. Claude catches it all.",
        prompt: `I'm going to brainstorm a new project. Here are the rules:

BRAINSTORM MODE IS NOW ACTIVE.
- Do not build anything
- Do not create files
- Do not write code
- Do not organize me while I'm talking
- Just listen and catch everything I say

When I say "DONE" — then and only then — organize everything into:
- Core idea (one sentence)
- The emotional hook (the "wouldn't it be funny if" moment)
- Features mentioned
- Problems I identified
- Questions I asked myself
- Tangents to park for later

Until I say DONE — just acknowledge you're listening and let me talk.

Ready.`,
      },
      {
        active: false,
        cmd: "/raw-drop",
        tip: "Quick capture. Drop a raw thought, a link, a voice note, anything. Don't overthink it. It goes into the vault.",
      },
      {
        active: false,
        cmd: "/parking-lot",
        tip: "Something came up mid-session that you don't want to lose but can't deal with right now. Park it here. It gets surfaced later.",
      },
      {
        active: false,
        cmd: "/remember-this",
        tip: "Flag something important that you don't want to forget. Claude will bring it back up at the start of the next relevant session automatically.",
      },
    ],
  },
  {
    col: "Setup",
    items: [
      {
        active: true,
        cmd: "/new-project",
        tip: "Starting something new. Sets up your GitHub folder, creates your PRD, FAQ, changelog, and parking lot files. One command, you're at 30%.",
        prompt: `Set up a new project for me. Do the following in order:

1. Ask me for the project name if I haven't given it
2. Create a new folder locally named after the project
3. Initialize a Git repository inside it
4. Create a GitHub repository and push the initial commit
5. Create this exact file structure inside the folder:
   - project-state.md (use the standard template below)
   - PRD.md (empty, ready to fill)
   - FAQ.md (empty, ready to fill)
   - CHANGELOG.md (empty, ready to fill)
   - parking-lot.md (empty, ready to fill)
   - brainstorm-raw.md (empty, ready to fill)
6. Fill in project-state.md with the project name, today's date, and status: "Brainstorm phase"
7. Confirm everything is set up and tell me what you created

project-state.md template:
# [PROJECT NAME] — State File
## What this is
## Current status
## Key decisions made
## Feature status
## Open questions
## Last session summary
## Parking lot
## Remember these

Do not ask unnecessary questions. Just build it.`,
      },
      {
        active: false,
        cmd: "/start-session",
        tip: "Beginning a work session. Pulls the latest code and project state from GitHub. Claude reads the state file and knows exactly where you left off. Always run this first.",
      },
      {
        active: true,
        cmd: "/end-session",
        tip: "Done for now. Pushes everything to GitHub, updates the changelog, sweeps the parking lot, and leaves a breadcrumb for next session. Never skip this.",
        prompt: `We are ending this session. Do the following in order:

1. Push all changes to GitHub with a commit message summarizing what we did today in one sentence
2. Update CHANGELOG.md with today's work — what was built, what was decided, what changed
3. Update project-state.md:
   - Update "Current status" to reflect where we are right now
   - Add any new key decisions to the decisions log with today's date
   - Update "Last session summary" with what we did today
   - Add anything unresolved to "Open questions"
4. Sweep the parking lot — list everything mentioned in this session that we didn't act on. Add each item to parking-lot.md with today's date.
5. Check the "Remember these" section — flag anything I said to remember that we never came back to.
6. Give me a 3-line summary: what we built, what's next, and one thing to remember for next time.

Do not skip any of these steps.`,
      },
      {
        active: false,
        cmd: "/github-init",
        tip: "Sets up a new GitHub repository for a project that doesn't have one yet. Run once per project.",
      },
      {
        active: false,
        cmd: "/project-state",
        tip: "Reads and summarizes the current project-state.md file. Good for getting re-oriented after time away from a project.",
      },
    ],
  },
  {
    col: "Strategy",
    items: [
      {
        active: true,
        cmd: "/prd",
        tip: "Turns your brainstorm into a proper Product Requirements Document. The blueprint. Run this after brainstorming, before building anything.",
        prompt: `Based on everything we've brainstormed, create a full Product Requirements Document. Structure it exactly like this:

# [PROJECT NAME] — Product Requirements Document

## The One-Sentence Pitch
## The Problem
## The Emotional Hook
## Target User
## Core Features (MVP only)
## Features for Later
## What We Are NOT Building
## Monetization
## Moat
## Open Questions
## Parking Lot

Do not add fluff. Be specific. Be honest. If something is unclear, flag it as an open question instead of making something up.`,
      },
      {
        active: false,
        cmd: "/faq",
        tip: "Generates a FAQ from your PRD. Good for clarifying assumptions and spotting gaps before you build.",
      },
      {
        active: false,
        cmd: "/viability",
        tip: "Honest gut check on the idea. Is there a real market? Is there a moat? Can it make money?",
      },
      {
        active: true,
        cmd: "/where-do-i-focus",
        tip: "Shows all your projects with rough completion percentages and one-line status. Helps you decide where your energy goes today.",
        prompt: `Look at all my active projects and give me a compass check. For each project show:
- Project name
- Rough completion percentage (your honest estimate)
- One line of current status
- One line of what's next or what's blocking it

Then at the bottom:
- The project closest to shippable
- The project with the highest revenue potential
- The project I seem most excited about
- Your honest recommendation for where my energy goes today

Be direct. Don't list everything as equally important. Tell me what you actually think.`,
      },
      {
        active: true,
        cmd: "/what-dont-i-know",
        tip: "The most important command. Claude tells you what you're missing. Blind spots, risks, things you haven't thought of. Run this regularly.",
        prompt: `Stop everything. Look at where we are and tell me my blind spots.

I want to know:
- What am I assuming that might be wrong?
- What have I not thought about that could kill this?
- What does someone who has built something like this know that I don't?
- What's the thing I'll regret not knowing six months from now?
- Is there a much simpler way to get to the same outcome?
- Am I solving the right problem?

Be direct. Don't be agreeable. Don't tell me what I want to hear. Tell me what I need to hear.

This is the most important command I run. Treat it that way.`,
      },
    ],
  },
  {
    col: "Architecture",
    items: [
      { active: false, cmd: "/cto-brief", tip: "Your CTO hat. What should this be built with and why? Stack recommendations in plain language." },
      { active: false, cmd: "/tech-stack", tip: "Recommends the right technologies for the project. Explains each choice simply." },
      { active: false, cmd: "/file-structure", tip: "Sets up the folder and file structure for the project. Logical, clean, ready for Claude Code." },
      { active: false, cmd: "/db-schema", tip: "Designs the database structure. What data do we store, how does it relate, what do we never store." },
      { active: false, cmd: "/api-design", tip: "Maps out the API — the bridge between your frontend and backend." },
    ],
  },
  {
    col: "Design",
    items: [
      { active: false, cmd: "/ui-brief", tip: "Starts the design conversation. Color psychology, mood, references, trends." },
      { active: false, cmd: "/design-review", tip: "Honest critique of the current design. No fake compliments." },
      { active: false, cmd: "/color-psych", tip: "Analyzes the psychological message your color choices send." },
      { active: false, cmd: "/ux-audit", tip: "Reviews the user experience flow. Would a sleep-deprived parent figure it out in 3 seconds?" },
      { active: false, cmd: "/component-map", tip: "Maps out all UI components needed before any code is written." },
    ],
  },
  {
    col: "Frontend",
    items: [
      { active: false, cmd: "/build-ui", tip: "Build mode. Claude already knows your design preferences. Give it a screen and it builds it." },
      { active: false, cmd: "/component", tip: "Build a single specific UI component. Button, card, modal, form." },
      { active: false, cmd: "/mobile-check", tip: "Reviews the current UI for mobile. One hand, small screen, big enough tap targets." },
      { active: false, cmd: "/animation", tip: "Adds motion to the UI. Subtle, purposeful, not flashy." },
      { active: false, cmd: "/responsive", tip: "Makes sure everything works across all screen sizes." },
    ],
  },
  {
    col: "Backend",
    items: [
      { active: false, cmd: "/api-build", tip: "Builds the actual API endpoints. The plumbing connecting frontend to data." },
      { active: false, cmd: "/db-setup", tip: "Sets up the database with row-level security so users only see their own data." },
      { active: false, cmd: "/auth-setup", tip: "Sets up user authentication using Clerk or Firebase." },
      { active: false, cmd: "/data-model", tip: "Designs how data flows through the entire app." },
      { active: false, cmd: "/integrations", tip: "Connects external services — Stripe, email, analytics, third party APIs." },
    ],
  },
  {
    col: "Security",
    items: [
      { active: false, cmd: "/security-setup", tip: "Full security checklist. Rate limiting, API keys server-side, auth hardening. Non-negotiable." },
      { active: false, cmd: "/rate-limit", tip: "Sets up rate limiting on all endpoints — login, account creation, AI calls." },
      { active: false, cmd: "/env-audit", tip: "Checks that no secrets or API keys are exposed in the frontend." },
      { active: false, cmd: "/secrets-check", tip: "Full sweep for anything that shouldn't be public." },
    ],
  },
  {
    col: "QA",
    items: [
      { active: false, cmd: "/qc", tip: "Full quality check before anything ships. Every button, every form, every edge case." },
      { active: false, cmd: "/edge-cases", tip: "What happens when things go wrong? Empty fields, huge uploads, duplicate accounts." },
      { active: false, cmd: "/3am-test", tip: "The Baby Buddy standard. Sleep-deprived parent, one arm, phone, 3 seconds. If not, fix it." },
      { active: false, cmd: "/cross-device", tip: "Test on every device type. Phone, tablet, laptop, big monitor. Different browsers." },
      { active: false, cmd: "/pre-launch-check", tip: "The final checklist before anything goes live. Nothing ships without this." },
    ],
  },
  {
    col: "Legal",
    items: [
      { active: false, cmd: "/legal", tip: "Full legal review. Terms of service, privacy policy, compliance flags." },
      { active: false, cmd: "/privacy-policy", tip: "Drafts the privacy policy in plain human language." },
      { active: false, cmd: "/terms", tip: "Drafts the terms of service." },
      { active: false, cmd: "/coppa-check", tip: "Baby Buddy specific. COPPA compliant? Data truly anonymous? Hash rotation in place?" },
      { active: false, cmd: "/gdpr-review", tip: "European user compliance. Right to deletion, cookie consent, privacy by design." },
    ],
  },
  {
    col: "Marketing",
    items: [
      { active: false, cmd: "/market", tip: "Full CMO mode. Video concepts, Reddit threads, boost strategy, Product Hunt, SEO, press angle." },
      { active: false, cmd: "/reddit-hits", tip: "Specific subreddits and existing threads where your target users are right now." },
      { active: false, cmd: "/ugc-brief", tip: "User generated content strategy. Video formats working in your niche." },
      { active: false, cmd: "/seo-play", tip: "The single best content piece to write for long-term organic traffic." },
      { active: false, cmd: "/product-hunt", tip: "Prepares your Product Hunt launch. Assets, timing, description, upvote strategy." },
    ],
  },
  {
    col: "Monetize",
    items: [
      { active: false, cmd: "/monetize", tip: "CFO mode. Every possible way to make money. Affiliate, data, B2B, subscriptions, weird angles." },
      { active: false, cmd: "/affiliate-map", tip: "Every affiliate and referral opportunity. Who pays us to send them users?" },
      { active: false, cmd: "/data-play", tip: "What anonymized data do we have that someone would pay for?" },
      { active: false, cmd: "/pricing", tip: "What should we charge? Free tier, paid tier, enterprise? What does the market bear?" },
      { active: false, cmd: "/revenue-model", tip: "Full revenue model. All streams, projections, assumptions." },
    ],
  },
  {
    col: "Launch",
    items: [
      { active: false, cmd: "/launch-check", tip: "Final launch checklist. Security, legal, analytics, performance. Last thing before ship." },
      { active: false, cmd: "/app-store", tip: "App Store and Google Play prep. Screenshots, description, keywords, privacy labels." },
      { active: false, cmd: "/vercel-deploy", tip: "Deploys the current build to Vercel. Sets env vars, confirms domain, makes it live." },
      { active: false, cmd: "/first-post", tip: "Drafts the first public post announcing the project." },
      { active: false, cmd: "/press-pitch", tip: "The human story pitch for journalists. Not features — the story of why this exists." },
    ],
  },
];
