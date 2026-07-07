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
        active: true,
        cmd: "/raw-drop",
        tip: "Quick capture. Drop a raw thought, a link, a voice note, anything. Don't overthink it. It goes into the vault.",
        prompt: `RAW DROP MODE.

I'm about to drop something unfiltered. It might be a half-thought, a link, a voice note transcript, a screenshot description, or a sentence that came to me in the shower.

Your job:
1. Receive it without judgment
2. Restate it back to me in one clean sentence so I know you got it
3. Tag it: [IDEA] [QUESTION] [RISK] [REFERENCE] [TASK] or [UNCLEAR]
4. Ask me exactly one question if something is genuinely ambiguous — otherwise stay silent
5. Add it to the vault summary at the bottom of this session

Do not expand it. Do not build on it. Do not turn it into a feature list. Just catch it.

Ready. Drop it.`,
      },
      {
        active: true,
        cmd: "/parking-lot",
        tip: "Something came up mid-session that you don't want to lose but can't deal with right now. Park it here. It gets surfaced later.",
        prompt: `PARKING LOT — capturing something I can't deal with right now.

I'm about to tell you something that came up mid-session. It's not what I'm working on right now, but I don't want to lose it.

Do the following:
1. Listen to what I'm about to say
2. Confirm you've captured it with a one-line restatement
3. Add it to parking-lot.md with today's date and a [PARKED] tag
4. Tell me it's safely parked and then get out of my way — I need to get back to what I was doing

Do not expand it. Do not solve it. Do not start a thread on it. Just park it.

What's getting parked:`,
      },
      {
        active: true,
        cmd: "/remember-this",
        tip: "Flag something important that you don't want to forget. Claude will bring it back up at the start of the next relevant session automatically.",
        prompt: `FLAG FOR MEMORY.

Something important just happened or was decided and I need to make sure it survives this session.

Do the following:
1. Listen to what I'm flagging
2. Restate it back to me clearly in one or two sentences
3. Add it to the "Remember these" section of project-state.md with today's date
4. Confirm it's saved and tell me what category you tagged it: [DECISION] [CONSTRAINT] [PREFERENCE] [RISK] [PROMISE] or [INSIGHT]

This gets surfaced at the start of every future session on this project until I say it's resolved.

What to remember:`,
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
        active: true,
        cmd: "/start-session",
        tip: "Beginning a work session. Pulls the latest code and project state from GitHub. Claude reads the state file and knows exactly where you left off. Always run this first.",
        prompt: `SESSION START. Pull everything and get us oriented.

Do the following in order:
1. Pull the latest code from GitHub — make sure we're on main and up to date
2. Read project-state.md in full
3. Read the last 5 entries in CHANGELOG.md
4. Read parking-lot.md — flag anything that's been sitting there more than 7 days
5. Read the "Remember these" section — surface anything flagged that we haven't resolved yet

Then give me a session brief:
- Current project status in one sentence
- What we left off on
- The single most important thing to accomplish this session
- Anything I flagged to remember that I need to know right now
- Any parked items older than a week that need a decision

Keep the brief tight. I'm ready to work.`,
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
        active: true,
        cmd: "/github-init",
        tip: "Sets up a new GitHub repository for a project that doesn't have one yet. Run once per project.",
        prompt: `Set up GitHub for this project. It already exists locally but doesn't have a remote repo yet.

Do the following:
1. Confirm the local project folder name
2. Create a new GitHub repository — same name as the folder, private by default
3. Add the remote origin
4. Create a .gitignore appropriate for this stack (Next.js / Node / whatever applies)
5. Make the initial commit with all current files
6. Push to main
7. Confirm the repo URL and that everything is live

If there's already a .git folder, check the remote — don't create a duplicate. If it's already connected, tell me and stop.

Do not ask me for my GitHub credentials — use whatever is already authenticated in this environment.`,
      },
      {
        active: true,
        cmd: "/project-state",
        tip: "Reads and summarizes the current project-state.md file. Good for getting re-oriented after time away from a project.",
        prompt: `Read the current project-state.md file and give me a re-orientation brief.

I may have been away from this project for a while. Treat me like someone returning after a break — I need to know exactly where things stand without rereading everything myself.

Give me:
- What this project is (one sentence, no fluff)
- Current status and phase
- The last 3 key decisions made and when
- What was in progress when we last left off
- Top open questions that need an answer before we can move
- Anything in the parking lot or remember list that I need to act on

Be specific. Use dates where they exist. If the state file is outdated or missing information, tell me — don't fill in gaps with guesses.`,
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
        active: true,
        cmd: "/faq",
        tip: "Generates a FAQ from your PRD. Good for clarifying assumptions and spotting gaps before you build.",
        prompt: `Read the current PRD and generate a FAQ document.

These are not marketing FAQs. These are the questions a skeptical, smart engineer or investor would ask — the questions that expose what we haven't figured out yet.

Structure it like this:
# [PROJECT NAME] — FAQ

For each question:
- Write the question as a skeptic would ask it
- Answer it honestly based on what's in the PRD
- If we don't have an answer yet, say "OPEN — needs a decision" and flag it

Categories to cover:
- What is this exactly?
- Who is this for?
- Why would someone use this instead of [obvious alternative]?
- How does it make money?
- What's the legal exposure?
- What's the hardest part to build?
- What could kill this?
- What are we assuming that could be wrong?

Minimum 15 questions. Don't pad it. Don't be gentle. The point is to find the holes.`,
      },
      {
        active: true,
        cmd: "/viability",
        tip: "Honest gut check on the idea. Is there a real market? Is there a moat? Can it make money?",
        prompt: `Run a viability check on this project. This is not a cheerleading exercise.

I want an honest answer to: should this exist, and can it make money?

Cover the following — and be direct:

MARKET
- Is there a real market here? How big?
- Who is already doing this? Are they winning?
- Is this a vitamin or a painkiller?

MOAT
- What would stop a well-funded competitor from copying this in 90 days?
- What's the defensible edge — network effects, data, distribution, brand, switching cost?

MONETIZATION
- Is there a real business model here or are we hoping for one?
- What's the realistic revenue ceiling for a solo creator running this?

TIMING
- Is the market ready for this? Too early? Too late?
- What external trend makes this the right moment?

VERDICT
- Green light, yellow light, or red light — and why
- If yellow or red: what would need to change to make this worth building?

Do not soften the verdict. I'd rather know now.`,
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
      {
        active: true,
        cmd: "/cto-brief",
        tip: "Your CTO hat. What should this be built with and why? Stack recommendations in plain language.",
        prompt: `Put on the CTO hat. Tell me how this thing should be built and why.

I'm not an engineer. I don't want jargon. I want the decision explained like you're talking to a smart founder who just needs to understand the tradeoffs.

Cover:
- What's the recommended full stack and why
- Frontend framework and why (not just "it's popular")
- Backend approach — serverless, traditional, BaaS — and why this project specifically
- Database recommendation and why
- Auth solution recommendation
- Hosting and deployment recommendation
- What we should NOT use, and why (be specific about what fails at scale or creates problems)
- The single biggest architectural decision we need to make before writing any code
- What a senior engineer would do differently from a junior engineer on this project

One paragraph max per section. No fluff. This is a decision brief, not a tutorial.`,
      },
      {
        active: true,
        cmd: "/tech-stack",
        tip: "Recommends the right technologies for the project. Explains each choice simply.",
        prompt: `Give me the full tech stack recommendation for this project.

Format it as a clean decision table:

| Layer | Recommendation | Why | Alternative considered |
|-------|---------------|-----|----------------------|

Cover every layer:
- Frontend framework
- UI component library
- Styling approach
- Backend / API layer
- Database
- Auth
- File storage (if needed)
- Email (if needed)
- Payments (if needed)
- Analytics
- Error monitoring
- Hosting / deployment
- CI/CD

For each choice: one sentence on why this one, one sentence on what we're trading away.

At the bottom: flag anything in this stack that has a learning curve, a cost cliff, or a known gotcha I should know about before we commit.`,
      },
      {
        active: true,
        cmd: "/file-structure",
        tip: "Sets up the folder and file structure for the project. Logical, clean, ready for Claude Code.",
        prompt: `Create the folder and file structure for this project.

Rules:
- Optimized for the tech stack we've chosen
- Logical grouping — a new developer should understand it in 30 seconds
- No files that don't need to exist yet
- Include a one-line comment next to each folder explaining what lives there
- Flag any files that need to be created on day one vs. day two

Output the full structure as a tree, like this:
\`\`\`
project-name/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Auth-protected routes
│   └── api/               # API route handlers
├── components/             # Reusable UI components
...
\`\`\`

After the tree, list the 5 most important files to create first and in what order.

Do not create the files. Just show me the plan.`,
      },
      {
        active: true,
        cmd: "/db-schema",
        tip: "Designs the database structure. What data do we store, how does it relate, what do we never store.",
        prompt: `Design the database schema for this project.

Think through what data we actually need — not what's nice to have, what's required to make the core features work.

For each table:
- Table name
- Columns with data types
- Which columns are indexed and why
- Relationships to other tables
- Row-level security rules (who can see what)

Then tell me:
- What data we should NEVER store (privacy, legal, liability reasons)
- What we should hash or encrypt vs. store plain
- Any data retention rules we need to bake in from day one
- The one schema decision that's hardest to undo later — flag it clearly

Output as SQL CREATE TABLE statements or a clean diagram description, whichever is clearer for this project.

If you're missing information to make a decision, ask me one question at a time.`,
      },
      {
        active: true,
        cmd: "/api-design",
        tip: "Maps out the API — the bridge between your frontend and backend.",
        prompt: `Design the API for this project.

Map out every endpoint we need to make the core features work. Nothing speculative — only what MVP requires.

For each endpoint:
- Method (GET / POST / PUT / DELETE / PATCH)
- Route path
- What it does in plain English
- What it receives (request body or params)
- What it returns
- Auth required? (yes/no/optional)
- Rate limiting needed? (yes/no)

Then flag:
- Which endpoints touch sensitive user data
- Which endpoints are most likely to be abused and need rate limiting
- Any endpoints that need to be server-side only and never called from the client
- The single most complex endpoint and why

Format as a clean table or grouped by feature area.`,
      },
    ],
  },
  {
    col: "Design",
    items: [
      {
        active: true,
        cmd: "/ui-brief",
        tip: "Starts the design conversation. Color psychology, mood, references, trends.",
        prompt: `Start the design conversation for this project.

I want to figure out what this thing should look and feel like before anyone touches Figma or writes a line of CSS.

Walk me through:

PERSONALITY
- If this app were a person, how would you describe them? (3 adjectives max)
- What feeling should someone have 10 seconds after opening it?
- What's the one emotion we want to trigger and sustain?

VISUAL DIRECTION
- What are 3 reference apps or sites that get the vibe right — and what specifically works about them?
- What's the design trend we should lean into and why?
- What's the design trend we should actively avoid and why?

COLOR & TYPE
- Color palette direction — not hex codes yet, just the mood and intent
- Typography personality — is this serious, playful, premium, utilitarian?

WHAT WE ARE NOT
- Name two design directions that would be wrong for this product and explain why

At the end: give me one design principle sentence — the single idea that every design decision should be measured against.`,
      },
      {
        active: true,
        cmd: "/design-review",
        tip: "Honest critique of the current design. No fake compliments.",
        prompt: `Review the current design. Be honest. No fake compliments.

I need you to look at what we have and tell me what's working and what's not. I'd rather hear it from you now than from users after launch.

Cover:
- First impression — what does this communicate in the first 3 seconds?
- Visual hierarchy — does the eye go where it's supposed to go?
- Consistency — are we using the same patterns, spacing, type sizes throughout?
- Color — is it working for us or against us?
- Typography — readable? Appropriate weight and contrast?
- Whitespace — cramped, or balanced?
- Mobile — does this hold up on a small screen?
- Anything that looks dated, generic, or template-y?

Then:
- Top 3 things to fix immediately
- One thing that's actually working well (if anything)
- The single change that would have the biggest visual impact

If you can see the current design, describe what you see and critique it. If you can't, tell me what to share.`,
      },
      {
        active: true,
        cmd: "/color-psych",
        tip: "Analyzes the psychological message your color choices send.",
        prompt: `Analyze the psychological message our color choices are sending.

Colors communicate before words do. Tell me if ours are saying the right thing.

Cover:
- What is each color in our palette communicating psychologically?
- What's the combined emotional signal of the palette as a whole?
- Does that signal match what we want users to feel?
- What demographic responds well to this palette — and who might be turned off?
- Are there any colors in conflict with each other (trust vs. urgency, calm vs. excitement)?
- How does our palette perform in dark mode? In bright sunlight on a phone?
- How does it hold up for colorblind users?

Then give me:
- A one-sentence read on what our palette currently says
- Whether it's right or wrong for this product
- If wrong: the specific adjustment — don't redesign everything, tell me the one change that fixes the signal

Be direct. "The blue feels safe and corporate" is more useful than "it's a great choice."`,
      },
      {
        active: true,
        cmd: "/ux-audit",
        tip: "Reviews the user experience flow. Would a sleep-deprived parent figure it out in 3 seconds?",
        prompt: `Run a UX audit on this product.

The standard I use: would a sleep-deprived parent holding a baby at 3am figure this out in under 3 seconds on a phone, without reading anything?

Walk me through:

FIRST-USE FLOW
- What happens the first time someone opens this?
- Is the value proposition clear before they scroll?
- How many steps to their first "win" — the moment they get something useful?

NAVIGATION
- Can someone find what they need without thinking about it?
- Are there dead ends? Confusing labels? Hidden features?
- Is the back button always predictable?

FRICTION POINTS
- Where will users get confused, give up, or make mistakes?
- Are we asking for too much too soon (email before value, permissions before trust)?
- Any forms that are longer than they need to be?

MOBILE REALITY CHECK
- Tap targets big enough? (44px minimum)
- Anything that requires precision on a small screen?
- Loading states and empty states — do they exist and are they helpful?

VERDICT
- Top 3 UX problems to fix before this touches a real user
- The one flow that needs a full rethink vs. just a tweak`,
      },
      {
        active: true,
        cmd: "/component-map",
        tip: "Maps out all UI components needed before any code is written.",
        prompt: `Map out every UI component this project needs before we write a single line of code.

Think through every screen and interaction and identify every reusable piece.

For each component:
- Component name (PascalCase)
- What it does in one sentence
- Where it's used (which screens/contexts)
- Key props or states it needs to handle
- Any variants (e.g. Button: primary, secondary, destructive, loading, disabled)

Group them by category:
- Layout components (shells, containers, grids)
- Navigation components (nav bars, tabs, breadcrumbs)
- Data display components (cards, tables, lists, badges)
- Form components (inputs, selects, toggles, date pickers)
- Feedback components (toasts, modals, alerts, loading states)
- Empty states and error states
- Page-specific components (not reusable — list separately)

At the end:
- Which components should we build first (shared dependencies)?
- Any components complex enough to need their own design spec before building?
- Anything we should pull from a component library vs. build from scratch?`,
      },
    ],
  },
  {
    col: "Frontend",
    items: [
      {
        active: true,
        cmd: "/build-ui",
        tip: "Build mode. Claude already knows your design preferences. Give it a screen and it builds it.",
        prompt: `BUILD MODE — we're building a UI screen.

My design preferences you should already know:
- Modern retro aesthetic where relevant — clean, purposeful, alive
- Typography: functional and readable, not decorative
- Whitespace: generous
- Motion: subtle and intentional, never gratuitous
- Mobile: always considered, never an afterthought

Tell me which screen or view we're building if I haven't specified it.

Then build it. Full component code. No placeholders. No "add your content here" filler.

Standards:
- Use the tech stack already defined for this project
- Real, working code — not a mockup, not a skeleton
- Responsive by default
- Accessible: semantic HTML, proper ARIA where needed
- TypeScript types if we're using TypeScript
- Wire up to real data shapes even if data is mocked for now

When done: tell me what props I need to pass, what state I need to manage one level up, and what's hardcoded that needs to become dynamic later.`,
      },
      {
        active: true,
        cmd: "/component",
        tip: "Build a single specific UI component. Button, card, modal, form.",
        prompt: `Build a single UI component.

Tell me which component if I haven't specified. Then build it completely.

Requirements:
- Self-contained — should work dropped into any page without external dependencies beyond our component library
- All variants included (default, hover, active, disabled, loading, error — whatever applies)
- TypeScript interface for props, clearly defined
- Responsive by default
- No hardcoded colors — use CSS variables or Tailwind tokens
- Accessible — keyboard navigable, proper role/aria attributes where needed
- Exported as a named export, not default

After the code:
- List every prop and what it does
- Show me a usage example with realistic values, not "foo" and "bar"
- Flag anything that needs a global style or context provider to work`,
      },
      {
        active: true,
        cmd: "/mobile-check",
        tip: "Reviews the current UI for mobile. One hand, small screen, big enough tap targets.",
        prompt: `Run the mobile check on the current UI.

The standard: one hand, small screen (375px width), bright sunlight, someone who's distracted.

Check the following:

TAP TARGETS
- Every interactive element at least 44x44px?
- Nothing too close together that causes accidental taps?
- Thumb-friendly? (Bottom of screen more reachable than top)

LAYOUT
- Does anything overflow horizontally?
- Text readable without zooming? (Minimum 16px body text)
- Long words or URLs breaking the layout?
- Tables or data-heavy elements — do they have a mobile treatment?

INPUTS & FORMS
- Are keyboard types set correctly (numeric keyboard for phone numbers, email keyboard for email)?
- Does the keyboard obscure the field being typed into?
- Are form errors visible when keyboard is open?

NAVIGATION
- Bottom navigation or hamburger — is it reachable one-handed?
- Can users get back from anywhere without hunting?

PERFORMANCE FEEL
- Are there loading states? Skeleton screens?
- Does anything feel sluggish on a mid-range device?

OUTPUT: List every issue found, ordered by severity. Flag the ones that would make a real user give up.`,
      },
      {
        active: true,
        cmd: "/animation",
        tip: "Adds motion to the UI. Subtle, purposeful, not flashy.",
        prompt: `Add motion to the UI. Subtle, purposeful — alive without being annoying.

My animation philosophy: every animation should either communicate something or feel satisfying. If it does neither, cut it.

Audit the current UI and identify where motion adds value:
- State transitions (loading → loaded, empty → populated)
- User feedback moments (form submit, button click, action confirmed)
- Navigation transitions (page entry, modal open/close)
- Data updates (new item appearing, item being deleted)
- Micro-interactions (hover states, toggle switches, checkboxes)

For each animation:
- What triggers it?
- What's the duration? (Most UI animations: 150-300ms. Entrances: up to 500ms. Never over 600ms for UI.)
- What's the easing? (ease-out for entrances, ease-in for exits, ease-in-out for sustained motion)
- What does it communicate to the user?

Implementation:
- Use CSS transitions and Framer Motion where appropriate for our stack
- Respect prefers-reduced-motion — every animation needs a no-motion fallback
- No animation that delays the user from getting to content

Show me the code for the top 3 highest-impact animations first.`,
      },
      {
        active: true,
        cmd: "/responsive",
        tip: "Makes sure everything works across all screen sizes.",
        prompt: `Make sure this works at every screen size. No exceptions.

Run through every major breakpoint:
- 375px — iPhone SE, smallest common phone
- 390px — iPhone 14/15 standard
- 768px — iPad portrait / large phone landscape
- 1024px — iPad landscape / small laptop
- 1280px — standard laptop
- 1440px — large laptop / external monitor
- 1920px+ — desktop monitor and beyond

For each breakpoint, check:
- Does the layout reflow correctly?
- Does typography scale appropriately?
- Are images and media constrained properly?
- Do navigation patterns change correctly (mobile nav → desktop nav)?
- Are touch targets appropriate for the device type?
- Is there a max-width container so content doesn't stretch to ridiculous widths on large screens?

Fix everything that's broken. Then:
- Show me the responsive CSS/Tailwind changes made
- Flag anything that needed a fundamentally different layout at a breakpoint (not just a tweak)
- Confirm we're not using any fixed pixel widths that will break at unexpected sizes`,
      },
    ],
  },
  {
    col: "Backend",
    items: [
      {
        active: true,
        cmd: "/api-build",
        tip: "Builds the actual API endpoints. The plumbing connecting frontend to data.",
        prompt: `Build the API endpoints for this project.

We're building real, working endpoints — not pseudocode, not stubs.

For each endpoint:
1. Create the route handler
2. Add input validation (Zod or equivalent — no unvalidated user input ever hits the database)
3. Add proper error handling with appropriate HTTP status codes
4. Add auth check where required
5. Add the database query or mutation
6. Return properly typed responses

Standards:
- No raw SQL with string interpolation — use parameterized queries or ORM
- All errors caught and returned as structured JSON, never exposed stack traces
- Auth checked before any data access — never after
- Sensitive operations logged (not the data — the action)

Tell me which endpoints we're building if I haven't specified. Build them in dependency order — don't build an endpoint that requires another that doesn't exist yet.

When done: show me how to test each endpoint with a curl command or API client example.`,
      },
      {
        active: true,
        cmd: "/db-setup",
        tip: "Sets up the database with row-level security so users only see their own data.",
        prompt: `Set up the database for this project.

Do the following in order:
1. Create all tables from the schema we designed
2. Add indexes on columns we'll query frequently
3. Set up Row Level Security (RLS) — every table that has user data needs policies
4. Create the RLS policies:
   - Users can only SELECT their own rows
   - Users can only INSERT rows with their own user_id
   - Users can only UPDATE their own rows
   - Users can only DELETE their own rows
5. Create any database functions or triggers we need
6. Seed the database with test data for development

RLS is non-negotiable. Every table with a user_id column gets RLS. Full stop.

After setup:
- Show me the migration file so it's in version control
- Confirm which tables have RLS enabled and which policies are active
- Flag any tables that are intentionally public (no RLS) and explain why`,
      },
      {
        active: true,
        cmd: "/auth-setup",
        tip: "Sets up user authentication using Clerk or Firebase.",
        prompt: `Set up authentication for this project.

Use whatever auth solution fits our stack — Clerk for Next.js projects, Firebase Auth if that's our backend, Supabase Auth if we're on Supabase. Tell me which you're using and why before starting.

Set up:
1. Install and configure the auth provider
2. Sign up flow (email/password minimum — social login if appropriate)
3. Sign in flow
4. Sign out
5. Password reset / forgot password
6. Protected routes — unauthenticated users can't reach authenticated pages
7. Auth state available throughout the app (context or provider)
8. User object accessible everywhere it's needed

Security requirements:
- No session tokens in localStorage — use httpOnly cookies or the provider's secure storage
- Email verification before full access (if appropriate for this product)
- Rate limiting on auth endpoints (login attempts, sign up)

When done:
- Show me how to access the current user in a server component, client component, and API route
- Confirm the protected route middleware is working
- Show me how to test sign up → verify → sign in → sign out flow`,
      },
      {
        active: true,
        cmd: "/data-model",
        tip: "Designs how data flows through the entire app.",
        prompt: `Map out how data flows through this entire application.

Start at the user and trace every piece of data from where it enters to where it lives to how it gets back to the screen.

For each major data flow:
- Where does the data originate? (User input, external API, system-generated)
- How does it travel to the backend? (Form submission, API call, webhook)
- How is it validated before it touches the database?
- How is it stored? (Which table, which columns)
- How is it retrieved? (Which queries, with what filters)
- How does it get back to the frontend? (API response, server component, realtime subscription)
- Who is allowed to see it? (RLS policy, auth check)

Then identify:
- Any data that crosses a trust boundary without being validated (this is a bug)
- Any sensitive data that's being passed around more than it needs to be
- Any place where we're fetching more data than we need (N+1 queries, over-fetching)
- Any data that's duplicated across the system (potential sync problems)

Output as a flow diagram description or a step-by-step narrative for each major flow.`,
      },
      {
        active: true,
        cmd: "/integrations",
        tip: "Connects external services — Stripe, email, analytics, third party APIs.",
        prompt: `Set up the external service integrations for this project.

Tell me which integrations we're setting up if I haven't specified. Common ones for this type of project:
- Stripe (payments, subscriptions)
- Resend or Postmark (transactional email)
- Twilio or similar (SMS)
- Analytics (PostHog, Mixpanel, or simple Plausible)
- Error monitoring (Sentry)
- External APIs specific to this project

For each integration:
1. Install the SDK
2. Store credentials in environment variables — NEVER hardcoded
3. Create a wrapper/service file so we're not scattering SDK calls throughout the codebase
4. Test the connection
5. Add error handling — external services go down, our app should handle it gracefully

Standards:
- All API keys server-side only — never in the browser
- Timeouts on all external calls — don't let a slow third-party hang our app
- Logging on integration failures (the event, not the sensitive data)
- Fallback behavior when an integration fails (degrade gracefully, don't crash)

When done: show me how to verify each integration is working without hitting production.`,
      },
    ],
  },
  {
    col: "Security",
    items: [
      {
        active: true,
        cmd: "/security-setup",
        tip: "Full security checklist. Rate limiting, API keys server-side, auth hardening. Non-negotiable.",
        prompt: `Run the full security setup. This is non-negotiable and happens on every project.

Work through this checklist completely:

AUTHENTICATION
- [ ] Auth tokens stored securely (httpOnly cookies, not localStorage)
- [ ] Session expiry configured
- [ ] Concurrent session handling defined

API SECURITY
- [ ] Every API route has auth validation before any logic runs
- [ ] Input validation on every endpoint (Zod or equivalent — no raw user input)
- [ ] HTTP methods restricted per endpoint (GET routes don't accept POST data)
- [ ] CORS configured correctly — not wildcard unless there's a reason

RATE LIMITING
- [ ] Login endpoint rate limited
- [ ] Sign up / account creation rate limited
- [ ] Any AI or expensive operation rate limited
- [ ] Password reset endpoint rate limited

SECRETS
- [ ] No API keys in client-side code
- [ ] No API keys in Git history
- [ ] All secrets in environment variables
- [ ] .env files in .gitignore

DATABASE
- [ ] RLS enabled on all user-data tables
- [ ] No raw SQL with string concatenation
- [ ] Database not directly accessible from client

HEADERS
- [ ] Content Security Policy configured
- [ ] X-Frame-Options set
- [ ] HTTPS enforced

Report each item: DONE, NEEDS WORK, or N/A with reason.`,
      },
      {
        active: true,
        cmd: "/rate-limit",
        tip: "Sets up rate limiting on all endpoints — login, account creation, AI calls.",
        prompt: `Set up rate limiting across this application.

Every endpoint that can be abused needs a limit. Here's the standard:

HIGH PRIORITY — implement these first:
- Login: 5 attempts per 15 minutes per IP
- Sign up: 3 accounts per hour per IP
- Password reset: 3 requests per hour per email
- Any AI call: 10 per minute per user (adjust based on our actual costs)
- Any endpoint that sends email or SMS: 5 per hour per user

MEDIUM PRIORITY:
- Any endpoint that writes to the database: 60 per minute per user
- Any endpoint that reads sensitive data: 100 per minute per user
- Public API endpoints (if any): 30 per minute per IP

Implementation requirements:
- Use Upstash Redis for rate limiting in production (works with Vercel Edge)
- Rate limit by IP for unauthenticated requests, by user ID for authenticated
- Return 429 status with a Retry-After header when limit is hit
- Never reveal the exact limit in the error message (security through obscurity)
- Rate limit state should survive server restarts — use persistent storage, not in-memory

Show me the middleware setup and how to apply it per-route.`,
      },
      {
        active: true,
        cmd: "/env-audit",
        tip: "Checks that no secrets or API keys are exposed in the frontend.",
        prompt: `Audit the entire codebase for exposed secrets and environment variable leaks.

Check everywhere a secret could accidentally end up in client-side code:

NEXT.JS SPECIFIC
- Any env variable used in a Client Component that doesn't start with NEXT_PUBLIC_?
- Any env variable that DOES start with NEXT_PUBLIC_ that should be server-side only?
- Any API keys passed as props from server components to client components?

CODE SCAN
- Search for any hardcoded API keys, tokens, passwords, or secrets
- Search for any base64-encoded strings that might be encoded credentials
- Check any config files that might have been committed with real values

BUNDLE CHECK
- Would a user who opens DevTools → Network → JS source find any secrets?
- Are our environment variables showing up in the compiled JavaScript?

GIT HISTORY
- Check the last 20 commits for any accidentally committed .env files
- Check for any files that were added and then removed (secrets can live in git history)

OUTPUT:
- List every finding with severity: CRITICAL / HIGH / MEDIUM / LOW
- For each finding: what it is, where it is, how to fix it
- Confirm the .gitignore correctly excludes .env, .env.local, .env.production

Fix all CRITICAL and HIGH findings before this conversation ends.`,
      },
      {
        active: true,
        cmd: "/secrets-check",
        tip: "Full sweep for anything that shouldn't be public.",
        prompt: `Full secrets sweep. Find anything that shouldn't be visible.

This is a paranoid check. Assume a motivated attacker has access to our public GitHub repo, our deployed Vercel app, and our browser's DevTools.

What can they find?

SEARCH THE CODEBASE FOR:
- Strings matching: sk-, pk-, api_key, apikey, API_KEY, secret, password, token, bearer, auth
- Any string that looks like a UUID used as a credential
- Any hardcoded URLs with credentials embedded (user:pass@host format)
- Any private keys or certificate content (BEGIN PRIVATE KEY, BEGIN RSA PRIVATE KEY)
- Any database connection strings

CHECK THE DEPLOYED APP:
- View page source — anything sensitive?
- Open DevTools Network tab — do API responses contain more data than the frontend needs?
- Check robots.txt — are we accidentally advertising sensitive endpoints?
- Check /.well-known/, /api/, /admin/ — are there routes that should be locked down?

CHECK GIT:
- Is .env in .gitignore?
- Is .env.local in .gitignore?
- Run: git log --all --full-history -- .env (has it ever been committed?)

OUTPUT: Everything found, severity level, and the exact fix. Nothing gets dismissed without a reason.`,
      },
    ],
  },
  {
    col: "QA",
    items: [
      {
        active: true,
        cmd: "/qc",
        tip: "Full quality check before anything ships. Every button, every form, every edge case.",
        prompt: `Full quality check. We are not shipping until this is clean.

Go through the entire application like a hostile, confused, impatient user who is trying to break things.

FUNCTIONALITY
- Every button: does it do what it says? Does it give feedback? Does it work twice in a row?
- Every form: does it validate? Does it show errors clearly? Does it handle double-submission?
- Every link: does it go where it says? Does it open in the right context (new tab vs. same tab)?
- Every dynamic element: does it update when it should? Does stale data ever show?

EDGE CASES
- What happens with an empty state (no data, new user)?
- What happens with 1 item? With 1000 items?
- What happens if the network drops mid-action?
- What happens if the user clicks back at a critical moment?

ERROR STATES
- Are all errors caught and shown to the user in plain language?
- Are any errors showing raw technical messages the user shouldn't see?
- Does the app recover gracefully from errors — or does it get stuck?

PERFORMANCE
- Any obvious slow loads?
- Anything that blocks the page from being interactive?
- Images optimized?

OUTPUT: Ordered bug list. CRITICAL (blocks launch), HIGH (bad experience), MEDIUM (annoying), LOW (polish). Fix all CRITICAL before we ship.`,
      },
      {
        active: true,
        cmd: "/edge-cases",
        tip: "What happens when things go wrong? Empty fields, huge uploads, duplicate accounts.",
        prompt: `Edge case stress test. Assume every user is trying to break this.

Go through every input, every form, every action and ask: what's the worst thing a user could do here?

INPUT ATTACKS
- Empty form submission — what happens?
- Single character inputs where longer is expected
- Extremely long inputs (10,000 characters in a name field)
- Special characters: emoji, quotes, angle brackets, backslashes, null bytes
- SQL injection attempts: ' OR 1=1 --, etc. (should be caught at the ORM layer)
- Script injection attempts: <script>alert(1)</script>

FILE UPLOADS (if applicable)
- Zero-byte file
- File that's too large — does the limit enforce gracefully?
- Wrong file type with the right extension (a .jpg that's actually a .exe)
- Extremely long filename

ACCOUNT & AUTH EDGE CASES
- What happens if someone tries to register with an email that already exists?
- What happens if someone tries to log in with the wrong password 20 times?
- What happens if a session expires mid-action?

NETWORK & TIMING
- What if an API call takes 30 seconds?
- What if two requests fire simultaneously (double-click, race condition)?
- What if the user navigates away during an upload?

OUTPUT: Every edge case found, expected behavior, actual behavior, and fix required.`,
      },
      {
        active: true,
        cmd: "/3am-test",
        tip: "The Baby Buddy standard. Sleep-deprived parent, one arm, phone, 3 seconds. If not, fix it.",
        prompt: `Run the 3am test. This is the Baby Buddy standard and it applies to every project.

The scenario: it's 3am. The user is exhausted. Baby in one arm, phone in the other hand. Brain barely working. 3 seconds of patience before they give up.

Would they figure this out?

FIRST SCREEN
- Is the purpose of this app obvious in 3 seconds with no reading?
- Is the primary action the biggest, most obvious thing on screen?
- Is there anything on screen that would confuse or distract at 3am?

CORE FLOW
- Walk through the single most important thing a new user needs to do
- Count every tap
- Count every decision point
- Count every field they have to fill out
- Anything over 3 taps to get to value is a problem. Fix it.

LANGUAGE
- Any word a sleep-deprived person would have to think about?
- Any error message that would make someone feel stupid?
- Any label that's technically correct but confusing to a normal person?
- Any confirmation dialog that's ambiguous? (OK / Cancel — OK to do what?)

RECOVERY
- If they make a mistake, can they fix it easily?
- Are there any destructive actions with no undo?
- If they close the app and come back, do they lose their progress?

Verdict: would the 3am parent use this again, or delete it and go back to paper?`,
      },
      {
        active: true,
        cmd: "/cross-device",
        tip: "Test on every device type. Phone, tablet, laptop, big monitor. Different browsers.",
        prompt: `Cross-device and cross-browser test. Nothing ships until this passes.

Test matrix — go through every one:

DEVICES
- iPhone SE (375px) — smallest still-common phone
- iPhone 14/15 (390px) — current standard
- Android mid-range equivalent (360px, Chrome)
- iPad (768px) — portrait
- iPad (1024px) — landscape
- Laptop (1280px)
- Desktop (1440px+)

BROWSERS
- Chrome (latest) — desktop and mobile
- Safari (latest) — desktop and iOS
- Firefox (latest) — desktop
- Edge (latest) — desktop
- Samsung Internet — if targeting Android users

FOR EACH COMBINATION CHECK:
- Layout renders correctly — no overflow, no broken flex/grid
- Fonts load and render
- Images load and scale
- Interactive elements work (hover states may not apply on touch)
- Forms work and keyboard appears correctly
- Animations and transitions work or degrade gracefully
- Any browser-specific CSS that needs a fix?

ACCESSIBILITY BONUS
- Tab through the entire page with keyboard only — can you reach everything?
- Screen reader test on the primary flow (VoiceOver on iOS, TalkBack on Android)

OUTPUT: Matrix of what passes, what fails, and the exact fix for each failure.`,
      },
      {
        active: true,
        cmd: "/pre-launch-check",
        tip: "The final checklist before anything goes live. Nothing ships without this.",
        prompt: `Pre-launch checklist. This is the last gate before we go live. Nothing ships without passing this.

SECURITY
- [ ] All secrets in environment variables, none hardcoded
- [ ] RLS enabled and tested on all user-data tables
- [ ] Rate limiting active on auth and expensive endpoints
- [ ] API keys not exposed in client-side code
- [ ] Auth required on all protected routes

PERFORMANCE
- [ ] Lighthouse score above 80 on mobile
- [ ] Core Web Vitals passing (LCP under 2.5s, CLS under 0.1)
- [ ] Images optimized and using next/image or equivalent
- [ ] No unused dependencies in the bundle

LEGAL & PRIVACY
- [ ] Privacy policy exists and is linked from the app
- [ ] Terms of service exists and is linked
- [ ] Cookie consent banner if we use tracking (EU users)
- [ ] Any COPPA or GDPR requirements addressed
- [ ] No personal data logged that shouldn't be

FUNCTIONALITY
- [ ] Core user flow tested end-to-end on mobile
- [ ] All forms validated and handling errors correctly
- [ ] Email notifications working (if applicable)
- [ ] Payment flow tested with test mode (if applicable)

DEPLOYMENT
- [ ] Environment variables set in production
- [ ] Domain configured and HTTPS working
- [ ] robots.txt configured correctly
- [ ] Error monitoring active (Sentry or equivalent)
- [ ] Analytics active

Report: PASS / FAIL / N/A for each item. Fix all FAILs before launch.`,
      },
    ],
  },
  {
    col: "Legal",
    items: [
      {
        active: true,
        cmd: "/legal",
        tip: "Full legal review. Terms of service, privacy policy, compliance flags.",
        prompt: `Full legal review for this project. Tell me what I need before this goes anywhere near the public.

I'm not a lawyer and you're not giving legal advice — but tell me what a lawyer would flag and what I need to have in place.

WHAT WE COLLECT
- What personal data does this app collect, store, or process?
- What's the minimum we actually need vs. what we're collecting?
- Are we collecting anything from people under 13? (COPPA exposure)
- Are we likely to have EU users? (GDPR exposure)

DOCUMENTS NEEDED
- Do we need a Terms of Service? What should it cover for this type of app?
- Do we need a Privacy Policy? What must it say for our data practices?
- Do we need a Cookie Policy?
- Any other legal documents for this specific use case?

COMPLIANCE FLAGS
- Any specific regulatory regime that applies? (HIPAA for health, COPPA for children, CCPA for California, GDPR for EU)
- Any industry-specific compliance requirements?
- Are we handling payments? (PCI DSS considerations)

LIABILITY EXPOSURE
- What's our biggest liability risk with this product?
- What should the Terms of Service limit our liability for?
- Any user-generated content concerns?

OUTPUT: Prioritized list of what to address before launch vs. what can wait.`,
      },
      {
        active: true,
        cmd: "/privacy-policy",
        tip: "Drafts the privacy policy in plain human language.",
        prompt: `Draft a Privacy Policy for this project.

Write it in plain human language. Not legalese. A normal person should be able to read this and understand what we do with their data.

Include:
- What information we collect (be specific — email, usage data, device info, etc.)
- Why we collect each type of information
- How we use it
- Who we share it with (third-party services, analytics, etc.) — be honest
- How long we keep it
- How users can delete their data or request a copy
- How we protect it
- Cookie and tracking disclosure
- Children's privacy section (do we allow under-13 users or not?)
- How to contact us about privacy concerns
- When this policy was last updated

Format it as a real document, ready to put on a /privacy page.

Flag any section where you need more information from me about our actual practices — don't make assumptions about what we do or don't collect. I'd rather be asked than have a policy that doesn't match reality.`,
      },
      {
        active: true,
        cmd: "/terms",
        tip: "Drafts the terms of service.",
        prompt: `Draft a Terms of Service for this project.

Plain language. No unnecessary legal bloat. Users should be able to understand what they're agreeing to.

Cover:
- What this service is and what it does
- Who can use it (age requirements, geographic restrictions if any)
- What users agree to (acceptable use, what they can't do)
- What we provide and what we don't guarantee
- User content — if users create content, who owns it?
- Our right to suspend or terminate accounts and under what circumstances
- How we handle disputes
- Limitation of liability — what we're not responsible for
- How users can terminate their account
- How we'll notify users of changes to these terms
- Contact information
- Last updated date

Format as a real document, ready for a /terms page.

Flag anything specific to this product that needs special language — payments, subscriptions, user-generated content, AI-generated content, health information, etc.`,
      },
      {
        active: true,
        cmd: "/coppa-check",
        tip: "Baby Buddy specific. COPPA compliant? Data truly anonymous? Hash rotation in place?",
        prompt: `COPPA compliance check — Baby Buddy / Keeper specific.

This app involves children's data. That means COPPA applies and this is not optional.

Check the following:

DATA COLLECTION
- Are we collecting any personally identifiable information about children under 13?
- Does our anonymization actually anonymize? (Is the hash reversible? Is it salted? Is rotation in place?)
- Are we storing anything that could be combined to identify a specific child?
- What happens to the data if a user deletes their account?

PARENTAL CONSENT
- Do we need verifiable parental consent before collecting any child data?
- If we're purely anonymous — how do we verify and maintain that claim?
- What's our process if a parent asks us to delete their child's data?

THIRD PARTIES
- Do any of our third-party services (analytics, error monitoring, etc.) receive data that touches child records?
- Have we reviewed their COPPA compliance?

TECHNICAL CONTROLS
- Hash rotation — is it implemented and scheduled?
- Is there a data retention limit? (We should not keep data longer than necessary)
- Can we produce a data deletion receipt if a parent requests it?

DOCUMENTATION
- Is our privacy policy's children's section accurate and specific?
- Do we have an internal data handling document?

Output: compliance status per item, what's in place, what's missing, what needs a lawyer.`,
      },
      {
        active: true,
        cmd: "/gdpr-review",
        tip: "European user compliance. Right to deletion, cookie consent, privacy by design.",
        prompt: `GDPR review. If we have any European users, this applies to us — no matter where we're based.

Check every requirement:

LAWFUL BASIS
- What's our lawful basis for processing each type of data? (Consent, contract, legitimate interest?)
- Have we documented this for each data type?

DATA SUBJECT RIGHTS
- Right to access: can users export all their data?
- Right to deletion: can users delete their account and have all data removed?
- Right to correction: can users edit their information?
- Right to portability: can users get their data in a machine-readable format?
- Do we have a process for handling these requests within 30 days?

CONSENT
- Do we have a cookie consent banner for EU users?
- Are non-essential cookies blocked until consent is given?
- Is consent opt-in (not pre-checked boxes)?
- Can users withdraw consent as easily as they gave it?

DATA PROTECTION
- Is personal data encrypted in transit and at rest?
- Is access to the database logged?
- Do we have a data breach notification plan? (72 hours to notify authorities)
- If we use any processors (third-party services), do we have data processing agreements with them?

PRIVACY BY DESIGN
- Do we collect minimum data necessary?
- Do we have data retention limits?

Output: compliant / non-compliant / needs review for each item, with specific fixes.`,
      },
    ],
  },
  {
    col: "Marketing",
    items: [
      {
        active: true,
        cmd: "/market",
        tip: "Full CMO mode. Video concepts, Reddit threads, boost strategy, Product Hunt, SEO, press angle.",
        prompt: `Full CMO mode. Build me the complete go-to-market picture for this project.

ORGANIC CONTENT STRATEGY
- Top 3 short-form video concepts that would perform for this app (TikTok/Reels format)
- The emotional angle that gets shares — not features, the feeling
- The creator archetype who would naturally talk about this

REDDIT STRATEGY
- Top 5 subreddits where our target users actually are
- The type of post that would land (problem post, story post, tool share, etc.)
- What NOT to do on Reddit (this is where most founders get it wrong)

SEO PLAY
- The single highest-value keyword cluster for this product
- The content type that would rank for it
- Estimated timeline to see results

PRODUCT HUNT
- Is this a Product Hunt product? Why or why not?
- If yes: what day/time to launch, what category, what tagline works

PRESS ANGLE
- What's the human story? (Not "new app does X" — the story behind why this exists)
- Which specific journalists or publications cover this niche?
- What's the hook that gets a journalist to open the pitch email?

LAUNCH SEQUENCE
- Recommended order of marketing moves from day 1 to day 30

Be specific. "Post on social media" is not a strategy. Name the subreddits. Write the video hook. Give me something I can act on today.`,
      },
      {
        active: true,
        cmd: "/reddit-hits",
        tip: "Specific subreddits and existing threads where your target users are right now.",
        prompt: `Find my people on Reddit.

I need specific subreddits and specific post types — not general advice, actual targets.

For this project, identify:

TOP SUBREDDITS
- List 8-10 subreddits where our target user is active
- For each: size, vibe, and what type of posts perform well there
- Flag which ones are hostile to self-promotion and which ones welcome it

CONTENT STRATEGY PER SUBREDDIT
- For each top subreddit: what's the right angle to enter the conversation?
- Story-first posts that don't feel like marketing?
- Genuine problem discussions we can participate in?
- "I built this" posts — which subreddits welcome them?

EXISTING THREADS TO HIT
- Search for existing threads where someone is asking for exactly what we built
- These are gold — a helpful comment with a link is not spam, it's an answer
- What search terms would find these threads?

WHAT NOT TO DO
- The specific behaviors that get you banned or downvoted on Reddit
- How to spot a community that would reject us vs. welcome us

OUTPUT: A prioritized hit list. The top 3 subreddits and the exact move to make in each one in the first 30 days.`,
      },
      {
        active: true,
        cmd: "/ugc-brief",
        tip: "User generated content strategy. Video formats working in your niche.",
        prompt: `Build the UGC (user generated content) strategy for this project.

I want to know what video content is actually working in this niche right now — and how we use it.

WHAT'S WORKING
- What video formats are performing in this niche? (Tutorial, day-in-the-life, transformation, story-time, comparison, etc.)
- What emotional arc is working? (Problem → solution, before/after, struggle → relief)
- What's the hook style that stops the scroll in this niche?

CREATOR BRIEF
If I were briefing a creator to make content about this app, what would I tell them?
- The one thing to lead with (not features — the feeling or the problem)
- Specific scenarios or use cases that would resonate
- What NOT to say or show
- The call to action that actually converts

DIY CONTENT PLAN
If I'm making the content myself:
- The 5 easiest first videos to make (low production, high authenticity)
- The hook for each one (write the first 3 seconds)
- What to show on screen vs. what to say
- Posting cadence that's realistic for a solo founder

AMPLIFICATION
- How do we get creators to try this organically?
- What's the affiliate or referral hook that makes creators want to share it?

Be specific. Write actual hook lines I can use. This should read like a creative brief.`,
      },
      {
        active: true,
        cmd: "/seo-play",
        tip: "The single best content piece to write for long-term organic traffic.",
        prompt: `Give me the SEO play for this project.

I want one focused, achievable content strategy — not a 50-page SEO plan I'll never execute.

KEYWORD OPPORTUNITY
- What is the single best keyword cluster for this product?
- Monthly search volume (rough estimate) and competition level
- Why this cluster specifically — what's the intent behind it?
- What does someone searching this actually want to find?

THE CONTENT PIECE
- What is the single best piece of content to write first?
- Exact title (write it as the H1 would appear)
- Why this piece — what makes it rankable for a new site?
- What format: long-form guide, comparison, tool, listicle, FAQ?
- How long does it need to be to compete?
- What does the outline look like? (Give me the H2s)

DOMAIN AUTHORITY REALITY CHECK
- How long realistically before this ranks given we're starting from zero?
- What's the linking strategy to give it the best chance?
- Any quick-win keyword opportunities while we wait for the bigger terms?

WHAT NOT TO DO
- The SEO trap most founders fall into with a new site
- Why going after the obvious high-volume keyword first is usually wrong

Give me one thing I can write this week. Not a strategy — a specific action.`,
      },
      {
        active: true,
        cmd: "/product-hunt",
        tip: "Prepares your Product Hunt launch. Assets, timing, description, upvote strategy.",
        prompt: `Prepare the Product Hunt launch for this project.

Walk me through everything I need to do it right — because a bad Product Hunt launch is worse than not launching at all.

IS THIS A PH PRODUCT?
- Honest assessment: is this a good fit for Product Hunt's audience?
- What category would we launch in?
- What's our realistic ranking potential?

PRE-LAUNCH CHECKLIST
- Assets needed: screenshots, GIF/video demo, logo specs
- Landing page requirements (what PH sends people to)
- Hunter vs. maker strategy — should we find a hunter or launch ourselves?

THE LISTING
- Write the tagline (60 characters max — write 3 options)
- Write the description (260 characters — write 2 options)
- Write the longer description (what goes in the "about" section)
- First comment strategy — what do we post as the maker comment?

LAUNCH DAY STRATEGY
- Best day to launch (Tuesday/Wednesday historically strongest)
- Time to post (12:01am PST)
- Who to notify and in what order
- How to ask for upvotes without getting flagged as spam
- What to do every hour on launch day

POST-LAUNCH
- How to use a PH launch even if we don't crack the top 5
- What to do with the "we're on Product Hunt" moment in other channels

Write the actual copy. Don't give me a template — give me the words.`,
      },
    ],
  },
  {
    col: "Monetize",
    items: [
      {
        active: true,
        cmd: "/monetize",
        tip: "CFO mode. Every possible way to make money. Affiliate, data, B2B, subscriptions, weird angles.",
        prompt: `CFO mode. Spider-web every possible way this project makes money.

I want the obvious plays and the weird angles. Don't filter yourself — throw everything and we'll evaluate.

DIRECT REVENUE
- Subscription: what tiers, what price points, what's in each tier?
- One-time purchase: does this model make sense here?
- Usage-based: any features that could be metered?
- Freemium: what's locked behind the paywall that's worth paying for?

INDIRECT REVENUE
- Affiliate opportunities: who would pay us to send them users?
- Data: what anonymized, aggregated data does this product generate that has value?
- B2B / white label: could a company pay to offer this to their customers?
- API access: could developers pay to access what we've built?

WEIRD ANGLES
- Partnership revenue (who benefits when our users succeed?)
- Certification or credentialing (does expertise in this have value?)
- Community or membership layer
- Events, courses, or education
- Adjacent product that becomes more valuable once we have this user base

FOR EACH MODEL:
- Revenue potential (rough ceiling for a solo founder)
- Time to first dollar
- Complexity to implement
- Risk level

At the end: rank the top 3 by the combination of revenue potential and ease of implementation. Tell me which one to focus on first.`,
      },
      {
        active: true,
        cmd: "/affiliate-map",
        tip: "Every affiliate and referral opportunity. Who pays us to send them users?",
        prompt: `Map every affiliate and referral opportunity for this project.

I want to know who would pay us money to send them our users — and how to structure it.

NATURAL AFFILIATES
- Think about what our users need before, during, and after using our product
- Who sells products or services to that same user?
- Which of those companies have affiliate programs?

FOR EACH OPPORTUNITY:
- Company / product
- Why our users would want this
- Commission structure (percentage or flat fee)
- How to join their program
- Realistic conversion rate
- Monthly revenue potential at different user scales (100 users / 1000 users / 10K users)

REFERRAL PROGRAM (user-to-user)
- Should we have one? What's the incentive?
- What's the offer: credit, discount, cash, free month?
- What's the referral mechanic — unique link, code, or in-app invite?

PARTNERSHIP DEALS
- Any companies where we could negotiate a custom deal vs. a public affiliate program?
- Who in this space is actively looking for distribution?

AVOID LIST
- Affiliate opportunities that would undermine user trust
- Products that compete with something we might build later

Output: ranked affiliate opportunities by revenue potential, with specific program names and how to apply.`,
      },
      {
        active: true,
        cmd: "/data-play",
        tip: "What anonymized data do we have that someone would pay for?",
        prompt: `Analyze the data play for this project.

By running this product, we're going to accumulate data. Some of it has value. Let's figure out what it is, who wants it, and how to monetize it without compromising users.

WHAT DATA DO WE GENERATE?
- List every type of data this product collects or creates through normal usage
- Separate: individual user data vs. aggregate/anonymized signals
- What patterns emerge at scale that don't exist at the individual level?

WHO WANTS THIS?
- Researchers (academic, government, NGO)
- Brands and marketers (behavioral insights)
- Industry bodies (trend data)
- B2B companies who serve the same user
- Media and journalists (data-driven story angles)

THE BUSINESS MODEL OPTIONS
- Data licensing: sell access to anonymized aggregate reports
- Research partnerships: institutional access in exchange for funding or credibility
- Proprietary insights product: we package the data into a separate B2B product
- Data cooperative: users share data in exchange for something valuable to them

LEGAL & TRUST REQUIREMENTS
- What needs to be in the Privacy Policy before we can do any of this?
- What's the consent model — opt-in or opt-out for data use?
- What anonymization standard is required to avoid re-identification risk?
- What would make users feel betrayed vs. comfortable with this?

Only pursue data plays that we could announce publicly without losing user trust. If we'd have to hide it, don't do it.`,
      },
      {
        active: true,
        cmd: "/pricing",
        tip: "What should we charge? Free tier, paid tier, enterprise? What does the market bear?",
        prompt: `Figure out what we should charge for this product.

I want a pricing strategy I can actually defend — not a number I picked because it felt reasonable.

MARKET RESEARCH
- What do direct competitors charge?
- What do adjacent products in this category charge?
- What's the price anchoring in this market — what do users expect to pay?

VALUE ANALYSIS
- What is this product worth to the user in terms of time saved, money made, or problem solved?
- What is the user's alternative — and what does that cost? (Including time cost)
- What's the maximum someone would pay before they'd build it themselves or find an alternative?

PRICING MODEL
- Should this be subscription (monthly/annual), one-time, or usage-based?
- For subscription: what's the monthly vs. annual discount (aim for 2 months free on annual)
- Freemium: what goes in free? What's the trigger to upgrade?
- What's the pricing good-better-best structure? (3 tiers max)

THE NUMBERS
- Recommend the actual price points for each tier
- Justify each number — not "it felt right" but "because competitors charge X and we offer Y"
- What's the LTV at each price point if average retention is 12 months?

PSYCHOLOGICAL PRICING
- Price anchoring — what's the decoy option?
- How do we frame the value so the price feels obvious, not expensive?

Give me the actual pricing page structure, not a framework to figure it out myself.`,
      },
      {
        active: true,
        cmd: "/revenue-model",
        tip: "Full revenue model. All streams, projections, assumptions.",
        prompt: `Build the full revenue model for this project.

This is the CFO document. Every stream, every assumption made explicit, realistic projections.

REVENUE STREAMS
List every revenue stream we've identified. For each:
- Revenue type (subscription, one-time, affiliate, data, etc.)
- Unit economics (price per unit, commission rate, etc.)
- When this stream becomes active (month 1? Month 6? Year 2?)

PROJECTIONS
Build a 12-month revenue projection table. Assumptions to state explicitly:
- Month 1 users (be conservative)
- Monthly growth rate (justify it — don't just say 10%)
- Free-to-paid conversion rate
- Monthly churn rate
- Average revenue per paying user

SCENARIOS
Model three scenarios:
- Conservative (things go slowly)
- Base case (things go reasonably)
- Optimistic (things break through)

What's the difference between each scenario — what's the key variable?

KEY METRICS TO TRACK
- MRR (monthly recurring revenue)
- ARR run rate
- CAC (customer acquisition cost) — even if unknown, what's the target?
- LTV (lifetime value per customer)
- LTV:CAC ratio target
- Month to break-even

WHAT THIS TELLS US
- At what user count does this become a real business?
- What's the revenue ceiling as a solo founder operating this?
- What would we need to hire for first, and at what revenue level?

Present the projections as a table. State every assumption clearly.`,
      },
    ],
  },
  {
    col: "Launch",
    items: [
      {
        active: true,
        cmd: "/launch-check",
        tip: "Final launch checklist. Security, legal, analytics, performance. Last thing before ship.",
        prompt: `Final launch check. Nothing goes live until this is done.

This is the last gate. We go through every category and it either passes or it doesn't.

SECURITY — MUST PASS ALL
- [ ] No secrets or API keys in client-side code
- [ ] All API routes require auth where they should
- [ ] Rate limiting active
- [ ] RLS enabled on all user-data tables
- [ ] Input validation on all endpoints
- [ ] HTTPS enforced

LEGAL — MUST PASS ALL
- [ ] Privacy Policy live and linked in the app
- [ ] Terms of Service live and linked
- [ ] Cookie consent in place if needed
- [ ] Any required compliance (COPPA, GDPR) addressed

PERFORMANCE — MUST PASS ALL
- [ ] Core user flow completes in under 3 seconds on a mid-range phone on LTE
- [ ] Lighthouse mobile score above 75
- [ ] No console errors in production
- [ ] Images optimized

ANALYTICS — MUST PASS ALL
- [ ] Analytics firing and receiving events
- [ ] Core conversion events tracked (sign up, first action, first payment)
- [ ] Error monitoring live and alerting

FUNCTIONALITY — MUST PASS ALL
- [ ] End-to-end core user flow tested on a real phone
- [ ] Email notifications working (if applicable)
- [ ] Payment flow tested in production mode with a real card (then refunded)

FINAL
- [ ] Someone other than the builder has tested this (fresh eyes)
- [ ] We know what success looks like in the first 7 days

Report every item: PASS / FAIL / N/A. Ship only when all MUST PASSes are green.`,
      },
      {
        active: true,
        cmd: "/app-store",
        tip: "App Store and Google Play prep. Screenshots, description, keywords, privacy labels.",
        prompt: `Prepare this app for App Store and Google Play submission.

Cover both stores — they have different requirements and different audiences.

APP STORE (Apple)
METADATA
- App name (30 characters max)
- Subtitle (30 characters max — what the name doesn't say)
- Description (4000 characters — write the full thing, not a placeholder)
- Keywords (100 characters total — comma separated, no spaces after commas)
- Category (primary and secondary)
- Age rating — what questions does the questionnaire ask that apply to us?

SCREENSHOTS
- Required sizes and how many
- What each screenshot should show (not just screens — value propositions)
- Screenshot caption copy for each one

PRIVACY LABELS
- Walk me through the App Privacy questionnaire for our data practices
- What do we declare vs. what do we not declare?

GOOGLE PLAY
- Short description (80 characters)
- Full description (4000 characters — can differ from iOS, should be optimized for Play Store search)
- Content rating questionnaire — what applies to us?
- Data safety section — what do we declare?

REVIEW PREP
- Common rejection reasons for our app category
- Anything in our app that could trigger a rejection?
- What to have ready if they ask for a demo account?

Write the actual copy. Don't give me a template to fill in.`,
      },
      {
        active: true,
        cmd: "/vercel-deploy",
        tip: "Deploys the current build to Vercel. Sets env vars, confirms domain, makes it live.",
        prompt: `Deploy this to Vercel. Make it live.

Do the following in order:

PRE-DEPLOY CHECK
1. Confirm the build passes locally: run the build command and verify no errors
2. Check that all environment variables are documented (we need to set them in Vercel)
3. Confirm the main branch is up to date and all changes are committed

VERCEL SETUP
4. Connect the GitHub repository to Vercel (or confirm it's already connected)
5. Set the framework preset correctly
6. Set all required environment variables in Vercel dashboard:
   - List every env variable needed and confirm I've set them before deploying
7. Configure the build command and output directory if non-standard

DOMAIN
8. Confirm the domain configuration — custom domain or Vercel subdomain?
9. If custom domain: walk me through the DNS records needed
10. Confirm HTTPS is working (Vercel handles this automatically but verify)

POST-DEPLOY VERIFICATION
11. Hit the live URL and confirm the app loads
12. Test the core user flow on the live deployment — not just local
13. Confirm environment variables are being read correctly (test one authenticated action)
14. Check that robots.txt is serving correctly
15. Confirm error monitoring is receiving events from production

Tell me if anything fails at any step. Do not continue past a failure — stop and tell me.`,
      },
      {
        active: true,
        cmd: "/first-post",
        tip: "Drafts the first public post announcing the project.",
        prompt: `Write the first public post announcing this project.

Not a press release. Not a LinkedIn corporate announcement. A real post from a real person who built something.

Tell me which platform we're posting to first — the format changes significantly:
- Reddit (community first, no marketing language, link at the end)
- X / Twitter (short, punchy, hooks in the first line)
- LinkedIn (professional but personal, slightly longer form)
- Instagram (caption with context, story-driven)

For whatever platform:
- Lead with the problem or the story — not the product
- The product is mentioned, not sold
- Authentic voice — write it like a human, not a brand
- Specific detail that makes it feel real and not like a template
- One clear call to action at the end — not "check it out" but what specifically to do

Write 2 versions:
1. The honest founder story version (why this exists, what it took)
2. The problem-first version (start with the pain point, reveal the solution)

Then tell me:
- What time to post (day of week and time for this platform)
- What to do in the first hour after posting (respond to comments, etc.)
- What to do if it gets traction vs. if it doesn't

Write actual copy. Don't give me a framework.`,
      },
      {
        active: true,
        cmd: "/press-pitch",
        tip: "The human story pitch for journalists. Not features — the story of why this exists.",
        prompt: `Write the press pitch for this project.

Journalists get hundreds of pitches. Most are bad. They all sound the same. Ours won't.

THE RULE: A journalist is not interested in our app. They're interested in a story their readers will care about. We are not the story — we're the evidence that the story is real.

FIND THE STORY FIRST
- What's happening in the world right now that makes this relevant?
- What's the human problem this product is responding to?
- Who is the specific person this is for — paint them in one vivid sentence?
- What's the surprising or counterintuitive angle?

THE PITCH COMPONENTS
Write each of these:
1. Subject line (under 10 words — make them open it)
2. Opening paragraph (2-3 sentences — the human story, not the product)
3. The bridge (1 sentence connecting the story to what we built)
4. The product paragraph (what it is, who it's for, one key differentiator)
5. The proof (any early users, data, waitlist, or social proof)
6. The ask (what do you want — a feature, a mention, a call?)
7. Sign-off

TARGETING
- What publication or outlet would be the best first placement?
- Who specifically at that outlet covers this beat?
- Why would their audience care?

Write the full pitch. Then tell me who to send it to first and when.`,
      },
    ],
  },
];
