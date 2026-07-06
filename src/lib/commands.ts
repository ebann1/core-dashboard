// C.O.R.E. Command Launcher data
// All commands organized by project lifecycle, with plain-language tooltips.

export interface Command {
  cmd: string;
  tip: string;
}

export interface CommandColumn {
  col: string;
  items: Command[];
}

export const commandColumns: CommandColumn[] = [
  {
    col: "Capture",
    items: [
      { cmd: "/brainstorm", tip: "You've got an idea firing. Run this when you're ready to just talk. No building, no structure — just blabber everything out. Claude catches it all." },
      { cmd: "/raw-drop", tip: "Quick capture. Drop a raw thought, a link, a voice note, anything. Don't overthink it. It goes into the vault." },
      { cmd: "/parking-lot", tip: "Something came up mid-session that you don't want to lose but can't deal with right now. Park it here. It gets surfaced later." },
      { cmd: "/remember-this", tip: "Flag something important that you don't want to forget. Claude will bring it back up at the start of the next relevant session automatically." },
    ],
  },
  {
    col: "Setup",
    items: [
      { cmd: "/new-project", tip: "Starting something new. This sets up your GitHub folder, creates your PRD, FAQ, changelog, and parking lot files, and adds the project to your vault. One command, you're at 30%." },
      { cmd: "/start-session", tip: "Beginning a work session. Pulls the latest code and project state from GitHub. Claude reads the state file and knows exactly where you left off. Always run this first." },
      { cmd: "/end-session", tip: "Done for now. Pushes everything to GitHub, updates the changelog, sweeps the parking lot, and leaves a breadcrumb for next session. Never skip this." },
      { cmd: "/github-init", tip: "Sets up a new GitHub repository for a project that doesn't have one yet. Run once per project." },
      { cmd: "/project-state", tip: "Reads and summarizes the current project-state.md file. Good for getting re-oriented after time away from a project." },
    ],
  },
  {
    col: "Strategy",
    items: [
      { cmd: "/prd", tip: "Turns your brainstorm into a proper Product Requirements Document. The blueprint. Run this after brainstorming, before building anything." },
      { cmd: "/faq", tip: "Generates a FAQ from your PRD. Good for clarifying assumptions and spotting gaps before you build." },
      { cmd: "/viability", tip: "Honest gut check on the idea. Is there a real market? Is there a moat? Can it make money? This is your CFO and CPO sitting down together." },
      { cmd: "/where-do-i-focus", tip: "Shows all your projects with rough completion percentages and one-line status each. Helps you decide where your energy goes today." },
      { cmd: "/what-dont-i-know", tip: "The most important command. Claude looks at where you are and tells you what you're missing. Blind spots, risks, things you haven't thought of. Run this regularly." },
    ],
  },
  {
    col: "Architecture",
    items: [
      { cmd: "/cto-brief", tip: "Your CTO hat. What should this be built with and why? Stack recommendations, tradeoffs explained in plain language, no jargon." },
      { cmd: "/tech-stack", tip: "Recommends the right technologies for the project based on what you're building. Explains each choice simply." },
      { cmd: "/file-structure", tip: "Sets up the folder and file structure for the project. Logical, clean, ready for Claude Code to work in." },
      { cmd: "/db-schema", tip: "Designs the database structure. What data do we store, how does it relate, what do we never store." },
      { cmd: "/api-design", tip: "Maps out the API — the bridge between your frontend and backend. What endpoints do we need and what do they do." },
    ],
  },
  {
    col: "Design",
    items: [
      { cmd: "/ui-brief", tip: "Starts the design conversation. What should this look like, feel like, communicate? Color psychology, mood, references, trends." },
      { cmd: "/design-review", tip: "Honest critique of the current design. What's working, what's not, what's outdated, what's missing. No fake compliments." },
      { cmd: "/color-psych", tip: "Analyzes the psychological message your color choices send. Does it feel trustworthy? Premium? Playful? Are we sending the right signal?" },
      { cmd: "/ux-audit", tip: "Reviews the user experience flow. Is it logical? Is it simple? Would a sleep-deprived parent at 3am figure it out in 3 seconds?" },
      { cmd: "/component-map", tip: "Maps out all the UI components the app needs before any code is written. The blueprint for the frontend." },
    ],
  },
  {
    col: "Frontend",
    items: [
      { cmd: "/build-ui", tip: "Build mode. Claude already knows your design preferences. Give it a component or screen and it builds it." },
      { cmd: "/component", tip: "Build a single specific UI component. Button, card, modal, form — whatever you need." },
      { cmd: "/mobile-check", tip: "Reviews the current UI for mobile. Does it work on a phone? One hand? Small screen? Is the tap target big enough?" },
      { cmd: "/animation", tip: "Adds motion to the UI. Subtle, purposeful, not flashy. Alive without being annoying." },
      { cmd: "/responsive", tip: "Makes sure everything works across all screen sizes — phone, tablet, laptop, 4K monitor." },
    ],
  },
  {
    col: "Backend",
    items: [
      { cmd: "/api-build", tip: "Builds the actual API endpoints. The plumbing that connects your frontend to your data." },
      { cmd: "/db-setup", tip: "Sets up the database. Tables, relationships, row-level security so users only see their own data." },
      { cmd: "/auth-setup", tip: "Sets up user authentication using Clerk or Firebase. Login, logout, session management." },
      { cmd: "/data-model", tip: "Designs how data flows through the entire app from user input to storage to display." },
      { cmd: "/integrations", tip: "Connects external services — Stripe, email providers, analytics, third party APIs." },
    ],
  },
  {
    col: "Security",
    items: [
      { cmd: "/security-setup", tip: "Runs the full security checklist. Rate limiting, API keys server-side, row-level security, auth hardening. Non-negotiable on every project." },
      { cmd: "/rate-limit", tip: "Specifically sets up rate limiting on all endpoints — login attempts, account creation, AI calls. Prevents hammering." },
      { cmd: "/env-audit", tip: "Checks that no secrets or API keys are exposed in the frontend. Everything sensitive should be server-side only." },
      { cmd: "/secrets-check", tip: "Full sweep for anything that shouldn't be public. API keys, passwords, tokens. Nothing lives in the code." },
    ],
  },
  {
    col: "QA",
    items: [
      { cmd: "/qc", tip: "Full quality check before anything ships. Every button, every form, every edge case. Think like a confused impatient user." },
      { cmd: "/edge-cases", tip: "What happens when things go wrong? Empty fields, huge uploads, duplicate accounts, slow connections. Test all of it." },
      { cmd: "/3am-test", tip: "The Baby Buddy standard. Would a sleep-deprived parent with a baby in one arm figure this out in 3 seconds on a phone? If not, fix it." },
      { cmd: "/cross-device", tip: "Test on every device type. Phone, tablet, laptop, big monitor. Different browsers. Make sure nothing breaks." },
      { cmd: "/pre-launch-check", tip: "The final checklist before anything goes live. Security, QA, legal, performance, analytics. Nothing ships without this." },
    ],
  },
  {
    col: "Legal",
    items: [
      { cmd: "/legal", tip: "Full legal review. Terms of service, privacy policy, compliance flags. What do we need before launch?" },
      { cmd: "/privacy-policy", tip: "Drafts the privacy policy in plain human language. What we collect, what we don't, why, and what users can do about it." },
      { cmd: "/terms", tip: "Drafts the terms of service. What users agree to, what we're responsible for, what we're not." },
      { cmd: "/coppa-check", tip: "Specifically for Baby Buddy. Are we COPPA compliant? Is our data truly anonymous? Is the hash rotation in place? Run after PRD." },
      { cmd: "/gdpr-review", tip: "European user compliance. Right to deletion, data processing agreements, cookie consent, privacy by design." },
    ],
  },
  {
    col: "Marketing",
    items: [
      { cmd: "/market", tip: "Full CMO mode. Top video concepts, Reddit threads to hit, boost strategy, Product Hunt prep, ASO keywords, SEO play, press angle. Everything." },
      { cmd: "/reddit-hits", tip: "Finds specific subreddits and existing threads where your target users are right now. What to post, what to comment on." },
      { cmd: "/ugc-brief", tip: "Plans your user generated content strategy. Video formats that are working in your niche. What to copy, what angle to put on it." },
      { cmd: "/seo-play", tip: "The single best content piece to write for long-term organic traffic. What people are searching for that your app answers." },
      { cmd: "/product-hunt", tip: "Prepares your Product Hunt launch. Assets needed, timing, description copy, how to get upvotes on day one." },
    ],
  },
  {
    col: "Monetize",
    items: [
      { cmd: "/monetize", tip: "CFO mode. Spider-webs every possible way to make money from this project. Affiliate, data, B2B, subscriptions, weird angles nobody thinks of." },
      { cmd: "/affiliate-map", tip: "Maps out every affiliate and referral opportunity. Who would pay us to send them users? What's the commission structure?" },
      { cmd: "/data-play", tip: "What anonymized data do we have that someone else would pay for? Researchers, brands, agencies, public health bodies." },
      { cmd: "/pricing", tip: "What should we charge? Free tier, paid tier, enterprise? What does the market bear? What maximizes revenue without killing growth?" },
      { cmd: "/revenue-model", tip: "Full revenue model document. All streams, projections, assumptions. The CFO brief." },
    ],
  },
  {
    col: "Launch",
    items: [
      { cmd: "/launch-check", tip: "Final launch checklist. Everything from security to legal to analytics to performance. The last thing before the button gets pushed." },
      { cmd: "/app-store", tip: "App Store and Google Play submission prep. Screenshots, description, keywords, age rating, privacy labels." },
      { cmd: "/vercel-deploy", tip: "Deploys the current build to Vercel. Sets environment variables, confirms the domain, makes it live." },
      { cmd: "/first-post", tip: "Drafts the first public post announcing the project. Reddit, X, or wherever makes most sense for this app." },
      { cmd: "/press-pitch", tip: "The human story pitch for journalists and bloggers in your niche. Not features — the story of why this exists." },
    ],
  },
];
