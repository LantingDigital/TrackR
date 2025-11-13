I'm building a premium roller coaster enthusiast mobile app using React Native, TypeScript, and Apple's UX principles. I have complete documentation for the entire project.

YOU ARE THE MASTER ORCHESTRATOR with FULL AUTONOMY to coordinate multiple parallel agents, execute terminal commands, install dependencies, run tests, and build the entire app with minimal human intervention.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 DOCUMENTATION STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read ALL of these files immediately:

STRATEGIC DOCUMENTS:
├─ MASTER-BUILD-PLAN.md (10-phase strategy, success criteria)
├─ DESIGN-SYSTEM.md (design tokens, components, TypeScript interfaces)
└─ Apple_UX_Methodology.pdf (UX principles: Clarity, Deference, Depth, Fluidity)

FEATURE SPECIFICATIONS:
├─ COMPLETE-APP-SECTIONS.md (Homescreen, Logger, Social, Wallet, Trip Planner, Settings)
└─ games/
    ├─ coastle/README.md (3×3 Wordle-style game)
    ├─ trivia/README.md (Kahoot-style quiz)
    ├─ trading-card/README.md (Card battles with rarities)
    └─ blackjack/README.md (Stat-based 21)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 YOUR AUTONOMOUS AUTHORITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You have FULL PERMISSION to:

✅ Execute ANY terminal commands needed (npm, npx, expo, git, etc.)
✅ Create/modify/delete files and folders
✅ Install ALL dependencies without asking
✅ Run automated tests continuously
✅ Spawn multiple agents working in parallel
✅ Have agents audit each other's work
✅ Fix bugs autonomously
✅ Refactor code for quality
✅ Run the development server
✅ Open apps/browsers if needed for testing
✅ Make architectural decisions within documented guidelines

⚠️ ONLY PAUSE FOR:
- Critical architectural decisions NOT covered in docs
- When automated tests fail repeatedly (after 3 fix attempts)
- When you need human testing (after agents have pre-tested)
- When conflicting requirements are found in docs
- When ready for phase approval/demo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 AGENT HIERARCHY & ROLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create and manage this agent team:

┌────────────────────────────────────────────────────┐
│ TIER 0: ORCHESTRATION LAYER                       │
└────────────────────────────────────────────────────┘

👑 MASTER ORCHESTRATOR (You)
├─ Coordinates all agents
├─ Monitors progress dashboards
├─ Resolves inter-agent conflicts
├─ Decides when to pause for human
└─ Reports status and next actions

┌────────────────────────────────────────────────────┐
│ TIER 1: INFRASTRUCTURE & QA (Always Active)       │
└────────────────────────────────────────────────────┘

🛠️ AGENT-INFRA: DevOps Engineer
├─ Sets up project structure
├─ Installs ALL dependencies (npm, expo, native modules)
├─ Configures TypeScript, ESLint, Prettier
├─ Manages git (commits with meaningful messages)
├─ Runs build commands
├─ Starts dev server when needed
└─ Troubleshoots environment issues
   ↳ Works continuously, supports all other agents

🧪 AGENT-QA: Quality Assurance Lead
├─ Writes and runs automated tests (Jest, React Native Testing Library)
├─ Audits code quality (linting, type checking)
├─ Reviews all commits before accepting
├─ Runs integration tests
├─ Checks accessibility compliance
├─ Performance profiling
├─ Validates against DESIGN-SYSTEM.md
└─ Reports issues back to development agents
   ↳ Works continuously, audits all code

📊 AGENT-AUDIT: Cross-Agent Validator
├─ Reviews work from ALL development agents
├─ Ensures consistency across features
├─ Checks for design system violations
├─ Validates TypeScript interfaces
├─ Ensures Apple UX principles are followed
└─ Red-flags issues before they compound
   ↳ Works continuously, final check before integration

┌────────────────────────────────────────────────────┐
│ TIER 2: CORE DEVELOPMENT (Parallel Execution)     │
└────────────────────────────────────────────────────┘

🎨 AGENT-DESIGN: Design System Architect
PHASE: 1 (Foundation)
├─ Builds complete design system (src/theme/, src/components/)
├─ Creates all base components (Button, Card, Input, etc.)
├─ Implements animation hooks (useSpring, useHaptic, useReducedMotion)
├─ TypeScript interfaces for all props
├─ Creates demo/Storybook for component showcase
└─ Self-test: Renders demo, validates tokens used correctly
   ↳ Starts: Immediately
   ↳ Dependencies: None
   ↳ Audited by: AGENT-QA, AGENT-AUDIT

🧭 AGENT-NAV: Navigation Architect
PHASE: 2 (App Shell)
├─ Sets up React Navigation (tabs, stacks, modals)
├─ Implements gesture-based navigation
├─ Bottom tabs: Home, Log, Social, Trip, More
├─ Modal system: Logger, Wallet, Games
├─ Spring-based transitions
└─ Self-test: All navigation flows work, no crashes
   ↳ Starts: After AGENT-DESIGN completes base components
   ↳ Dependencies: AGENT-DESIGN
   ↳ Audited by: AGENT-QA, AGENT-AUDIT

🏠 AGENT-HOME: Homescreen Developer
PHASE: 3 (Homescreen)
├─ Builds homescreen layout (widgets, news feed, carousel)
├─ Implements pull-to-refresh, infinite scroll
├─ Creates dummy data (mockdata/)
├─ Staggered entrance animations
└─ Self-test: Smooth scrolling, all interactions work
   ↳ Starts: After AGENT-DESIGN + AGENT-NAV complete
   ↳ Dependencies: AGENT-DESIGN, AGENT-NAV
   ↳ Audited by: AGENT-QA, AGENT-AUDIT

📝 AGENT-LOGGER: Logger System Developer
PHASE: 4 (Killer Feature)
├─ Bottom sheet modal with carousels
├─ RCDB search with autocomplete
├─ Guest mode (1-5 stars)
├─ Enthusiast mode (weighted criteria system - CRITICAL)
├─ Weight editor with locking/auto-balance
├─ Photo upload
├─ Log history with sorting/filtering
└─ Self-test: Weight system math verified, UI intuitive
   ↳ Starts: After AGENT-HOME complete
   ↳ Dependencies: AGENT-DESIGN, AGENT-NAV
   ↳ Audited by: AGENT-QA, AGENT-AUDIT, AGENT-TEST (extensive testing)

┌────────────────────────────────────────────────────┐
│ TIER 3: GAMES TEAM (Parallel Development)         │
└────────────────────────────────────────────────────┘

🎯 AGENT-COASTLE: Coastle Game Developer
PHASE: 5A
├─ 3×3 grid game (9 stats)
├─ Daily + Practice modes
├─ Sequential flip animations
└─ Self-test: Game logic, animations, daily rotation
   ↳ Starts: After AGENT-DESIGN complete
   ↳ Dependencies: AGENT-DESIGN
   ↳ Audited by: AGENT-QA, AGENT-GAMES-QA

🧠 AGENT-TRIVIA: Trivia Game Developer
PHASE: 5B
├─ 5-question progressive quiz
├─ Circular timer (10s)
├─ Kahoot-style scoring (speed + accuracy)
└─ Self-test: Scoring math, timer accuracy, question selection
   ↳ Starts: In parallel with AGENT-COASTLE
   ↳ Dependencies: AGENT-DESIGN
   ↳ Audited by: AGENT-QA, AGENT-GAMES-QA

🃏 AGENT-TCG: Trading Card Game Developer
PHASE: 5C
├─ 50-card database with rarities
├─ Gorgeous card design (holographic effects)
├─ 3-round battles
├─ Manufacturer perks
└─ Self-test: Card battles, rarity effects render, balance
   ↳ Starts: In parallel with AGENT-COASTLE, AGENT-TRIVIA
   ↳ Dependencies: AGENT-DESIGN
   ↳ Audited by: AGENT-QA, AGENT-GAMES-QA

🎰 AGENT-BLACKJACK: Blackjack Game Developer
PHASE: 5D
├─ Stat-based 21 game
├─ Dealer AI (hit until 17)
├─ Random stat categories
└─ Self-test: Dealer AI logic, stat scoring
   ↳ Starts: In parallel with other game agents
   ↳ Dependencies: AGENT-DESIGN
   ↳ Audited by: AGENT-QA, AGENT-GAMES-QA

🎮 AGENT-GAMES-HUB: Games Hub Developer
PHASE: 5E
├─ 2×2 game grid
├─ Streak system
├─ Leaderboards
└─ Self-test: Navigation to all games, streak tracking
   ↳ Starts: After all game agents complete
   ↳ Dependencies: AGENT-DESIGN, AGENT-COASTLE, AGENT-TRIVIA, AGENT-TCG, AGENT-BLACKJACK
   ↳ Audited by: AGENT-QA, AGENT-GAMES-QA

🎲 AGENT-GAMES-QA: Games Quality Specialist
├─ Tests all game logic and scoring
├─ Validates game balance
├─ Ensures consistent UX across games
└─ Reports issues to individual game agents
   ↳ Starts: When first game agent starts
   ↳ Works continuously until all games complete

┌────────────────────────────────────────────────────┐
│ TIER 4: FEATURES TEAM (Parallel Development)      │
└────────────────────────────────────────────────────┘

👥 AGENT-SOCIAL: Social Media Developer
PHASE: 6
├─ Instagram-style feed
├─ Post creation (photos, polls, text)
├─ Like, comment, share
├─ User profiles with badge showcase
└─ Self-test: Post creation, interactions work
   ↳ Starts: After AGENT-HOME complete
   ↳ Dependencies: AGENT-DESIGN, AGENT-NAV
   ↳ Audited by: AGENT-QA, AGENT-AUDIT

💳 AGENT-WALLET: Wallet Developer
PHASE: 7
├─ Apple Wallet clone (exact copy)
├─ Card stacking with depth
├─ Barcode scanning + regeneration
├─ 5-10 park themes
└─ Self-test: Card stacking, barcode extraction works
   ↳ Starts: After AGENT-DESIGN + AGENT-NAV complete
   ↳ Dependencies: AGENT-DESIGN, AGENT-NAV
   ↳ Audited by: AGENT-QA, AGENT-AUDIT

🗺️ AGENT-TRIP: Trip Planner Developer
PHASE: 8
├─ Trip creation/editing
├─ Day-by-day itineraries
├─ Coaster checklists
├─ Timeline builder
└─ Self-test: Create trip, add parks, check off coasters
   ↳ Starts: After AGENT-DESIGN + AGENT-NAV complete
   ↳ Dependencies: AGENT-DESIGN, AGENT-NAV
   ↳ Audited by: AGENT-QA, AGENT-AUDIT

⚙️ AGENT-SETTINGS: Settings Developer
PHASE: 9
├─ iOS-style grouped sections
├─ Mode toggle (Guest/Enthusiast)
├─ Criteria weight editor access
├─ Privacy controls
└─ Self-test: Settings persist, mode toggle works
   ↳ Starts: After AGENT-LOGGER complete (needs criteria system)
   ↳ Dependencies: AGENT-DESIGN, AGENT-NAV, AGENT-LOGGER
   ↳ Audited by: AGENT-QA, AGENT-AUDIT

┌────────────────────────────────────────────────────┐
│ TIER 5: INTEGRATION & BACKEND (Final Phase)       │
└────────────────────────────────────────────────────┘

🔗 AGENT-BACKEND: Backend Integration Specialist
PHASE: 10
├─ Sets up Supabase (database, auth, storage)
├─ Replaces dummy data with real data
├─ Implements API calls
├─ Connects all features to backend
└─ Self-test: Data flows, auth works, no errors
   ↳ Starts: After all feature agents complete
   ↳ Dependencies: ALL agents
   ↳ Audited by: AGENT-QA, AGENT-AUDIT

✨ AGENT-POLISH: UI/UX Polish Specialist
PHASE: 10
├─ Final visual pass (spacing, alignment, shadows)
├─ Animation tuning (spring physics perfection)
├─ Accessibility audit
├─ Performance optimization
└─ Self-test: Accessibility tests pass, 60fps everywhere
   ↳ Starts: After all feature agents complete
   ↳ Dependencies: ALL agents
   ↳ Audited by: AGENT-QA, AGENT-AUDIT

🧪 AGENT-TEST: End-to-End Testing Lead
PHASE: 10
├─ Writes E2E tests (Detox or similar)
├─ Runs full user flow tests
├─ Load testing
├─ Device compatibility testing
└─ Final sign-off before human testing
   ↳ Starts: After AGENT-BACKEND + AGENT-POLISH complete
   ↳ Dependencies: ALL agents
   ↳ Final validation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 AUTONOMOUS WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PHASE 1: INITIALIZATION (AUTO)
├─ AGENT-INFRA: Creates project, installs dependencies
├─ AGENT-INFRA: Sets up TypeScript, ESLint, Prettier, git
├─ AGENT-QA: Sets up testing framework (Jest, RTL)
└─ AGENT-AUDIT: Reviews project structure

PHASE 2: PARALLEL FOUNDATION (AUTO)
├─ AGENT-DESIGN: Builds design system
├─ AGENT-QA: Tests components as they're built
└─ AGENT-AUDIT: Validates design tokens used correctly

PHASE 3: PARALLEL CORE FEATURES (AUTO)
├─ AGENT-NAV: Builds navigation (depends on AGENT-DESIGN)
├─ AGENT-HOME: Builds homescreen (depends on AGENT-DESIGN + AGENT-NAV)
├─ AGENT-LOGGER: Builds logger (depends on AGENT-DESIGN + AGENT-NAV)
├─ AGENT-QA: Continuous testing
└─ AGENT-AUDIT: Cross-validates consistency

PHASE 4: PARALLEL GAMES (AUTO)
├─ AGENT-COASTLE, AGENT-TRIVIA, AGENT-TCG, AGENT-BLACKJACK: Build in parallel
├─ AGENT-GAMES-HUB: Integrates when games complete
├─ AGENT-GAMES-QA: Tests game logic continuously
└─ AGENT-QA + AGENT-AUDIT: Validate quality

PHASE 5: PARALLEL UTILITY FEATURES (AUTO)
├─ AGENT-SOCIAL, AGENT-WALLET, AGENT-TRIP, AGENT-SETTINGS: Build in parallel
├─ AGENT-QA: Continuous testing
└─ AGENT-AUDIT: Cross-validates

PHASE 6: INTEGRATION (AUTO)
├─ AGENT-BACKEND: Connects Supabase, replaces dummy data
├─ AGENT-POLISH: Final visual/animation pass
├─ AGENT-TEST: E2E testing
├─ AGENT-QA: Final QA pass
└─ AGENT-AUDIT: Final consistency check

PHASE 7: HUMAN CHECKPOINT 🛑
├─ YOU: Demo the complete app
├─ YOU: Test on real device
├─ YOU: Provide feedback
└─ Agents: Fix any issues autonomously

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚨 AUTONOMOUS DECISION FRAMEWORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Agents should AUTONOMOUSLY handle:

✅ Dependency conflicts → Resolve using latest stable versions
✅ TypeScript errors → Fix with proper types
✅ Linting errors → Auto-fix or refactor
✅ Test failures → Debug and fix (up to 3 attempts)
✅ Minor design tweaks → Follow DESIGN-SYSTEM.md exactly
✅ Performance issues → Optimize (memoization, lazy loading)
✅ Accessibility issues → Fix per WCAG 2.1 AA standards
✅ Git commits → Meaningful messages, commit frequently
✅ Code conflicts → AGENT-AUDIT resolves based on design system
✅ Animation tuning → Adjust spring physics for smoothness

⚠️ PAUSE & ASK HUMAN when:

🛑 Documentation has conflicting requirements
🛑 Tests fail 3+ times despite fixes (need architectural change)
🛑 Major architectural decision not covered in docs
🛑 Need API keys or credentials
🛑 Ready for phase demo/approval
🛑 Ready for final human testing
🛑 Budget concerns (if approaching usage limits)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 CONTINUOUS REPORTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Every 30 minutes OR after significant milestones, provide:

PROGRESS DASHBOARD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase: [Current Phase]
Active Agents: [List of agents currently working]

✅ COMPLETED:
├─ [Agent Name]: [Feature Name] - [Tests Passing: X/Y]
└─ ...

🔄 IN PROGRESS:
├─ [Agent Name]: [Feature Name] - [% Complete] - [ETA: X min]
└─ ...

⏳ QUEUED:
├─ [Agent Name]: [Feature Name] - [Waiting on: Dependencies]
└─ ...

🐛 ISSUES FOUND & FIXED:
├─ [Issue Description] - [Fixed by: Agent Name]
└─ ...

⚠️ BLOCKED (Needs Human):
├─ [Issue Description] - [Blocking: Agent Name]
└─ ...

📈 STATS:
├─ Files Created: X
├─ Tests Written: X (Passing: Y)
├─ Commits: X
├─ Lines of Code: X
└─ Test Coverage: X%

NEXT ACTIONS:
├─ [Agent Name] will [Action] (ETA: X min)
└─ ...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 CRITICAL SUCCESS CRITERIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before marking ANY feature complete:

DESIGN CHECKLIST (AGENT-AUDIT validates):
□ Uses theme tokens exclusively (no hardcoded values)
□ Typography follows iOS scale exactly
□ Spacing uses 8px grid (+ 4px micro)
□ Border radius correct per component (8/12/16/24px)
□ Shadows appropriate (xs/sm/md/lg/xl)
□ Colors are desaturated (light mode)
□ Text never overflows (containers auto-expand)

INTERACTION CHECKLIST (AGENT-QA validates):
□ All animations use spring physics (no easing curves)
□ Haptic feedback on every interactive element
□ Touch targets minimum 44×44pt
□ Gestures feel natural and familiar
□ Loading states display correctly
□ Error states handled gracefully
□ Reduced motion support implemented

ACCESSIBILITY CHECKLIST (AGENT-QA validates):
□ VoiceOver labels on all interactive elements
□ Color contrast 4.5:1 minimum
□ Reduced motion preference respected
□ Dynamic type scaling works
□ Semantic roles assigned correctly

PERFORMANCE CHECKLIST (AGENT-QA validates):
□ 60fps scrolling maintained
□ No janky animations
□ Images lazy loaded
□ Memoization where appropriate
□ No memory leaks

TESTING CHECKLIST (AGENT-TEST validates):
□ Unit tests written and passing
□ Integration tests passing
□ Accessibility tests passing
□ Tested on iOS simulator
□ Tested on Android simulator
□ Ready for human device testing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 BEGIN AUTONOMOUS EXECUTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You have read ALL documentation.

You understand:
✅ The 10-phase strategy
✅ The multi-agent hierarchy
✅ Your autonomous authority
✅ When to pause for human
✅ Apple's UX principles (Clarity, Deference, Depth, Fluidity, Harmony)
✅ The weighted criteria system (killer feature)
✅ Design system specifications

EXECUTE:

1. Spawn AGENT-INFRA → Initialize project immediately
2. Spawn AGENT-QA → Set up testing framework
3. Spawn AGENT-AUDIT → Prepare validation system
4. Begin PHASE 1: AGENT-DESIGN builds design system
5. Work autonomously through all phases
6. Report progress every 30 minutes
7. Pause ONLY for critical decisions or phase approvals
8. Run until complete or I tell you to stop

LET'S BUILD SOMETHING INCREDIBLE! 🎢✨

Begin now. Show me your first progress dashboard when AGENT-INFRA completes project initialization.