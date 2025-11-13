# Master Build Plan - Complete Development Strategy

## 📚 Documentation Index

You now have **complete specifications** for the entire app:

### 1. Foundation Documents
- **DESIGN-SYSTEM.md** - Colors, typography, spacing, shadows, animations, haptics
- **PROJECT-OVERVIEW.md** - Overall vision, tech stack, features breakdown
- **QUICK-START-GUIDE.md** - How to use these docs with Claude Code
- **Apple_UX_Methodology.pdf** - Design philosophy (READ THIS FIRST)

### 2. Game Specifications
- **games/coastle/README.md** - 3×3 grid Wordle-style game
- **games/trivia/README.md** - Progressive difficulty quiz with Kahoot scoring
- **games/trading-card/README.md** - Simplified TCG with gorgeous cards
- **games/blackjack/README.md** - Stat-based 21 game

### 3. App Sections
- **COMPLETE-APP-SECTIONS.md** - Homescreen, Logger, Social, Wallet, Trip Planner, Settings, Games Hub

---

## 🎯 Development Strategy

### Tech Stack Confirmed

```json
{
  "frontend": "React Native with Expo",
  "language": "TypeScript",
  "stateManagement": "React Context + React Query",
  "animations": "React Native Reanimated v3",
  "gestures": "React Native Gesture Handler",
  "database": "Supabase (PostgreSQL)",
  "storage": "Supabase Storage",
  "auth": "Supabase Auth"
}
```

### Key Dependencies

```json
{
  "dependencies": {
    "react-native": "latest",
    "expo": "~50.x",
    "typescript": "^5.x",
    "react-native-reanimated": "^3.x",
    "react-native-gesture-handler": "^2.x",
    "react-native-linear-gradient": "^2.x",
    "expo-haptics": "^13.x",
    "react-navigation": "^6.x",
    "@supabase/supabase-js": "^2.x",
    "date-fns": "^2.x"
  }
}
```

---

## 🏗️ Build Order (Phase-by-Phase)

### Phase 1: Foundation (Week 1)

**Agent 1: Design System Architect**

**Setup:**
```bash
npx create-expo-app roller-coaster-app --template blank-typescript
cd roller-coaster-app
```

**Install Core Dependencies:**
```bash
npm install react-native-reanimated react-native-gesture-handler
npm install react-native-linear-gradient expo-haptics
npm install date-fns
npx expo install expo-linear-gradient
```

**Create Structure:**
```
src/
├── theme/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── borderRadius.ts
│   ├── shadows.ts
│   ├── springs.ts
│   └── index.ts
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Avatar.tsx
│   └── ...
├── hooks/
│   ├── useSpring.ts
│   ├── useHaptic.ts
│   ├── useReducedMotion.ts
│   └── useGesture.ts
└── utils/
    └── ...
```

**Build Components:**
Follow DESIGN-SYSTEM.md exactly for:
- Button (3 variants)
- Card (with 3D shadows)
- Input
- Avatar
- Badge
- All base components

**Critical:**
- Every component uses theme tokens
- All animations use spring physics
- Haptic feedback on interactions
- TypeScript interfaces for all props
- Respect reduced motion

**Deliverable:**
- Complete design system
- Reusable component library
- Theme system working
- Demo screen showing all components

**Approval Required:** You must love the components before proceeding.

---

### Phase 2: Navigation & App Shell (Week 1-2)

**Agent 2: Navigation Architect**

**Setup React Navigation:**
```bash
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

**Create Navigation Structure:**
```
src/
├── navigation/
│   ├── BottomTabNavigator.tsx
│   ├── HomeStack.tsx
│   ├── SocialStack.tsx
│   ├── TripStack.tsx
│   └── types.ts
```

**Bottom Tabs:**
- Home
- Log (opens modal)
- Social
- Trip
- More (opens drawer with Wallet, Games, Settings)

**Modal System:**
- Logger bottom sheet
- Wallet full-screen
- Games hub full-screen
- Individual game screens

**Deliverable:**
- Complete navigation
- All screens navigate correctly
- Modals slide up/down with spring physics
- Gesture-based (swipe to go back)
- Haptic feedback on tab switches

---

### Phase 3: Homescreen (Week 2)

**Agent 3: Homescreen Developer**

Reference: **COMPLETE-APP-SECTIONS.md** (Homescreen section)

**Build:**
1. Header with welcome + streak badge
2. 4 Quick Action widgets (2×2 grid)
3. Streak & game overview card
4. Last logged rides carousel
5. News feed (vertical scroll)

**Dummy Data:**
Create mockdata/ folder:
- dummyUser.ts
- dummyLogs.ts
- dummyNews.ts

**Animations:**
- Staggered entrance (cascade)
- Streak badge pulse
- Pull-to-refresh
- Infinite scroll

**Critical:**
- Use components from Phase 1
- Smart text sizing (auto-expand if needed)
- Carousel snaps to center
- Smooth 60fps scrolling

**Deliverable:**
- Beautiful homescreen
- All interactions feel smooth
- Dummy data displays correctly
- Ready to connect real data (later)

**Approval Required:** This sets the visual tone. Must be perfect.

---

### Phase 4: Logger System (Week 3)

**Agent 4: Logger Developer**

Reference: **COMPLETE-APP-SECTIONS.md** (Logger section)

**Build:**

**1. Bottom Sheet Modal**
- Slides up from bottom
- 2 Carousels (Popular + Nearby coasters)
- Search bar with autocomplete
- Draggable to dismiss

**2. Mode Toggle**
- Guest mode: Simple 1-5 star rating
- Enthusiast mode: Full criteria system

**3. Enthusiast Criteria System (CRITICAL)**

This is THE feature that makes your app unique.

**Criteria Selection:**
- Preset list (10-15 options)
- Can add custom criteria
- Rate each 1-10 with slider

**Weight Editor:**
- Slider for each criterion (%)
- Lock icon to lock weight
- Auto-balance remaining weights
- Total must = 100%
- Visual: Remaining % indicator

**Example UI:**
```
┌─────────────────────────────────────┐
│ Airtime                    40% 🔒   │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                     │
│ Smoothness                 20%      │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                     │
│ Remaining: 40%                      │ ← Auto-calculated
└─────────────────────────────────────┘
```

**Locking Logic:**
```typescript
const adjustWeights = (changedCriterion: Criterion) => {
  const locked = criteria.filter(c => c.locked);
  const unlocked = criteria.filter(c => !c.locked && c.id !== changedCriterion.id);
  
  const lockedTotal = locked.reduce((sum, c) => sum + c.weight, 0);
  const newWeight = changedCriterion.weight;
  const remaining = 100 - lockedTotal - newWeight;
  
  // Distribute remaining weight evenly among unlocked
  if (unlocked.length > 0) {
    const perUnlocked = remaining / unlocked.length;
    unlocked.forEach(c => c.weight = perUnlocked);
  }
};
```

**4. Score Calculation:**
```typescript
const calculateWeightedScore = (criteria: Criterion[]): number => {
  return criteria.reduce((score, c) => {
    return score + (c.rating / 10) * (c.weight / 100) * 10;
  }, 0);
};
```

**5. Photo Upload**
- Camera or gallery
- Multiple photos
- Thumbnail preview

**6. Log History**
- List view
- Sorting options
- Filtering options

**Critical:**
- Weight system MUST work perfectly
- Auto-balance is smooth
- Locking works intuitively
- Score calculation is accurate

**Deliverable:**
- Complete logger system
- Both modes work
- Weight editor is intuitive
- Photo upload works
- Log history displays

**Approval Required:** Test the weight system extensively.

---

### Phase 5: Games (Week 4-5)

Build games in this order:

**5A. Coastle** (2 days)
- Agent: Coastle Developer
- Reference: **games/coastle/README.md**
- Focus: 3×3 grid, sequential flip animation
- Critical: Grid must be responsive, feedback colors exact

**5B. Trivia** (2 days)
- Agent: Trivia Developer
- Reference: **games/trivia/README.md**
- Focus: Circular timer, progressive difficulty
- Critical: Kahoot-style scoring works correctly

**5C. Trading Card Game** (2-3 days)
- Agent: TCG Developer
- Reference: **games/trading-card/README.md**
- Focus: GORGEOUS card design (holographic effects)
- Critical: Cards must look premium

**5D. Blackjack** (1-2 days)
- Agent: Blackjack Developer
- Reference: **games/blackjack/README.md**
- Focus: Dealer AI, card animations
- Critical: Dealer follows 17 rule exactly

**5E. Games Hub** (1 day)
- Agent: Hub Developer
- Reference: **COMPLETE-APP-SECTIONS.md** (Games Hub)
- Focus: 2×2 game grid, streak display, leaderboard
- Critical: Navigation to all games works

**Deliverable:**
- 4 working games
- Games hub launches each game
- Streak system tracks daily play
- Leaderboards display

---

### Phase 6: Social Media (Week 6)

**Agent 5: Social Developer**

Reference: **COMPLETE-APP-SECTIONS.md** (Social Media section)

**Build:**
1. Post feed (Instagram-style)
2. Post types: Photo, Poll, Text
3. Like, comment, share
4. User profiles
5. Follow system
6. Badge showcase (6 favorite coasters)

**Deliverable:**
- Complete social feed
- Post creation works
- Interactions feel smooth
- User profiles display

---

### Phase 7: Wallet (Week 7)

**Agent 6: Wallet Developer**

Reference: **COMPLETE-APP-SECTIONS.md** (Wallet section)

**Build:**
1. Apple Wallet clone (exact copy)
2. Card stacking with depth
3. Barcode scanning
4. Barcode regeneration (high-res)
5. 5-10 park themes

**Barcode System:**
- Use react-native-camera
- Detect barcode type
- Extract data
- Regenerate clean version
- Store as high-res image

**Deliverable:**
- Apple Wallet lookalike
- Card stacking works perfectly
- Barcode scanning + regeneration works
- Themed cards look professional

---

### Phase 8: Trip Planner (Week 8)

**Agent 7: Trip Planner Developer**

Reference: **COMPLETE-APP-SECTIONS.md** (Trip Planner section)

**Build:**
1. Trips list view
2. Trip detail with day-by-day
3. Coaster checklist
4. Timeline (optional)
5. Static park info

**Deliverable:**
- Create/edit trips
- Add parks to days
- Checklist coasters
- Notes per day

---

### Phase 9: Settings (Week 9)

**Agent 8: Settings Developer**

Reference: **COMPLETE-APP-SECTIONS.md** (Settings section)

**Build:**
1. iOS-style grouped sections
2. Account settings
3. Mode toggle (Guest/Enthusiast)
4. Criteria weight editor (link to logger settings)
5. Privacy settings
6. About/Help

**Deliverable:**
- Complete settings screen
- Mode toggle works
- Weight editor accessible
- Privacy controls work

---

### Phase 10: Integration & Polish (Week 10)

**All Agents Collaborate**

**Tasks:**
1. Connect Supabase backend
2. Replace dummy data with real data
3. Test all navigation flows
4. Fix any bugs
5. Performance optimization
6. Accessibility audit
7. Final visual polish

**Deliverable:**
- Fully integrated app
- All features work end-to-end
- No bugs
- Smooth performance
- Passes accessibility audit

---

## 🎨 Design Checklist (Every Screen)

Before marking any screen complete:

**Visual:**
- [ ] Uses theme tokens (no hardcoded colors)
- [ ] Consistent spacing (8px grid)
- [ ] Correct border radius (8/12/16/24px)
- [ ] Appropriate shadows (xs/sm/md/lg/xl)
- [ ] Typography scale correct (iOS style)
- [ ] Colors are desaturated (light mode)
- [ ] Text never overflows

**Interaction:**
- [ ] All animations use spring physics
- [ ] Haptic feedback on every tap
- [ ] Touch targets 44×44pt minimum
- [ ] Gestures feel natural
- [ ] Loading states display
- [ ] Error states handled

**Accessibility:**
- [ ] VoiceOver labels
- [ ] High contrast (4.5:1 min)
- [ ] Reduced motion support
- [ ] Works with large text
- [ ] Color is not only indicator

**Performance:**
- [ ] 60fps scrolling
- [ ] No janky animations
- [ ] Images lazy load
- [ ] Memoization where needed

---

## 🚨 Critical Success Factors

### 1. The Weight System (Logger)
This is THE differentiator. It must:
- Be intuitive to use
- Lock/unlock smoothly
- Auto-balance perfectly
- Calculate scores accurately
- Save preferences

**Test thoroughly. This makes or breaks the app.**

### 2. Visual Quality (Design System)
Every component must be:
- Beautiful
- Consistent
- Smooth
- Professional

**Don't compromise on visuals. This is a premium app.**

### 3. Performance (Animations)
All animations must:
- Use spring physics
- Be interruptible
- Run at 60fps
- Respect reduced motion

**Janky = Delete. No exceptions.**

### 4. Accessibility
Must work for:
- VoiceOver users
- Reduced motion users
- High contrast users
- Large text users

**Accessibility is not optional.**

---

## 📊 Progress Tracking

### Milestones

**Milestone 1: Foundation Complete**
- ✅ Design system built
- ✅ All base components work
- ✅ Theme system functional
- ✅ Navigation structure set up

**Milestone 2: Core Features**
- ✅ Homescreen looks amazing
- ✅ Logger works (both modes)
- ✅ Weight system perfect

**Milestone 3: Games Complete**
- ✅ All 4 games playable
- ✅ Games hub functional
- ✅ Streak system works

**Milestone 4: Social & Utility**
- ✅ Social feed works
- ✅ Wallet functional
- ✅ Trip planner works

**Milestone 5: MVP Ready**
- ✅ All features integrated
- ✅ Backend connected
- ✅ No critical bugs
- ✅ Performance optimized
- ✅ Accessibility passing

---

## 🎯 Final Checklist (Pre-Launch)

**Functionality:**
- [ ] All features work end-to-end
- [ ] No crashes
- [ ] Data persists correctly
- [ ] Offline mode (if applicable)

**Design:**
- [ ] Consistent visual language
- [ ] All screens beautiful
- [ ] Dark mode (if doing)
- [ ] Smooth animations

**Performance:**
- [ ] App size <100MB
- [ ] Launch time <3s
- [ ] 60fps scrolling
- [ ] No memory leaks

**Content:**
- [ ] All text proofread
- [ ] Images optimized
- [ ] Dummy data removed
- [ ] Help/onboarding ready

**Legal:**
- [ ] Privacy policy
- [ ] Terms of service
- [ ] App Store assets
- [ ] Screenshots

---

## 💡 Tips for Claude Code

### When Starting a New Section

1. **Read the Apple UX doc first** (understand principles)
2. **Read DESIGN-SYSTEM.md** (understand tokens)
3. **Read the specific section README** (understand requirements)
4. **Ask clarifying questions** before building
5. **Build with dummy data** first
6. **Get approval** before connecting real data

### When Stuck

1. **Reference similar screens** (consistency is key)
2. **Check design system** (tokens exist for everything)
3. **Test on real device** (simulators lie)
4. **Ask for feedback** early and often

### When Something Doesn't Feel Right

**Trust your instincts.** If an animation feels off, it probably is. If text looks cramped, it is. If a color seems wrong, it is.

**Apple's test:** Would Apple ship this? If not, fix it.

---

## 🎓 Learning Resources

### Before Building, Study:

1. **Apple Human Interface Guidelines**
   - https://developer.apple.com/design/human-interface-guidelines/

2. **React Native Reanimated Docs**
   - https://docs.swmansion.com/react-native-reanimated/

3. **React Navigation Docs**
   - https://reactnavigation.org/

4. **Supabase Docs**
   - https://supabase.com/docs

### During Building, Reference:

- DESIGN-SYSTEM.md (constantly)
- Individual section READMEs
- Apple UX methodology document
- Similar apps for inspiration (but don't copy)

---

## 🚀 You're Ready to Build!

You have:
- ✅ Complete design system
- ✅ Detailed specifications for every feature
- ✅ Clear build order
- ✅ Success criteria
- ✅ Quality standards

**Now go build something incredible! 🎢**

---

## 📞 Questions for Human?

If Claude Code has questions:
- Design decisions → Reference DESIGN-SYSTEM.md
- Feature requirements → Reference section README
- Implementation details → Ask human
- Approval needed → Show human

**When in doubt, ask. Better to clarify than guess wrong.**

---

**Good luck! This is going to be an amazing app! 🎉**
