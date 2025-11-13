# Coastle - Wordle for Roller Coasters

## 🎮 Game Overview

Coastle is a daily puzzle game where players guess a mystery roller coaster in 6 tries. After each guess, a 3×3 grid provides feedback on 9 different coaster attributes, helping players narrow down the answer.

**Think:** Wordle meets roller coaster stats

---

## 🎯 Game Mechanics

### Core Loop

1. **Daily Mystery Coaster**
   - One mystery coaster selected each day
   - Same coaster for all players globally
   - Resets at midnight local time

2. **6 Guesses**
   - Player has 6 attempts to identify the coaster
   - Each guess must be a valid roller coaster from the database
   - Search with autocomplete to find coasters

3. **3×3 Feedback Grid**
   - After each guess, grid shows feedback on 9 stats
   - Green (✓) = Correct
   - Yellow (↑↓) = Close (higher/lower)
   - Red (✗) = Wrong

4. **Win/Loss**
   - Win: Identify coaster within 6 guesses
   - Loss: Run out of guesses
   - Share results (like Wordle)

### Practice Mode

- Unlimited random mystery coasters
- Doesn't count toward streak
- Great for learning coaster stats

---

## 📊 The 9 Stats (3×3 Grid)

### Layout

```
┌─────────────┬─────────────┬─────────────┐
│   HEIGHT    │    SPEED    │   LENGTH    │
│   (↑↓ ✓)    │   (↑↓ ✓)    │   (↑↓ ✓)    │
├─────────────┼─────────────┼─────────────┤
│    YEAR     │ INVERSIONS  │   COUNTRY   │
│   (↑↓ ✓)    │   (↑↓ ✓)    │   (✗ ✓)     │
├─────────────┼─────────────┼─────────────┤
│MANUFACTURER │    TYPE     │    PARK     │
│   (✗ ✓)     │   (✗ ✓)     │   (✗ ✓)     │
└─────────────┴─────────────┴─────────────┘
```

### Stat Definitions

#### Row 1: Numeric Stats (Arrows)

1. **HEIGHT (feet)**
   - Feedback: ↑ (guess is too low) | ↓ (guess is too high) | ✓ (correct)
   - Tolerance: Exact match required
   - Example: Mystery = 325ft, Guess = 200ft → ↑

2. **SPEED (mph)**
   - Feedback: ↑ (guess is too slow) | ↓ (guess is too fast) | ✓ (correct)
   - Tolerance: Exact match required
   - Example: Mystery = 95mph, Guess = 120mph → ↓

3. **LENGTH (feet)**
   - Feedback: ↑ (guess is too short) | ↓ (guess is too long) | ✓ (correct)
   - Tolerance: Exact match required
   - Example: Mystery = 6800ft, Guess = 5000ft → ↑

#### Row 2: Mixed Stats

4. **YEAR OPENED**
   - Feedback: ↑ (guess is too old) | ↓ (guess is too new) | ✓ (correct)
   - Tolerance: Exact year match
   - Example: Mystery = 2018, Guess = 2010 → ↑

5. **INVERSIONS (count)**
   - Feedback: ↑ (guess has fewer) | ↓ (guess has more) | ✓ (correct)
   - Tolerance: Exact count
   - Special: 0 inversions = no inversions
   - Example: Mystery = 4, Guess = 2 → ↑

6. **COUNTRY**
   - Feedback: ✗ (wrong country) | ✓ (correct country)
   - Binary: Yes or No
   - Example: Mystery = USA, Guess = Germany → ✗

#### Row 3: Categorical Stats (Binary)

7. **MANUFACTURER**
   - Feedback: ✗ (different manufacturer) | ✓ (same manufacturer)
   - Binary: Yes or No
   - Example: Mystery = Intamin, Guess = B&M → ✗

8. **TYPE**
   - Feedback: ✗ (different type) | ✓ (same type)
   - Types: Steel, Wooden, Hybrid, Inverted, Wing, Dive, Hyper, Giga, etc.
   - Binary: Yes or No
   - Example: Mystery = Giga, Guess = Hyper → ✗

9. **PARK**
   - Feedback: ✗ (different park) | ✓ (same park)
   - Binary: Yes or No
   - Example: Mystery = Cedar Point, Guess = Kings Island → ✗

---

## 🎨 Visual Design Specifications

### Grid Layout

**Overall Grid:**
- Size: ~90% screen width
- Aspect ratio: 1:1 (square)
- Border radius: 16px (card radius)
- Shadow: `md` (elevated card)
- Background: `background.secondary` (off-white)
- Spacing between cells: 8px

**Individual Cells:**
- Size: (Grid width - 16px) / 3 (equal thirds with 8px gaps)
- Aspect ratio: 1:1 (square)
- Border radius: 12px
- Background: Dynamic (based on feedback)
- Border: 2px solid when selected/revealed

### Cell States

#### Empty State (Before Guess)
```typescript
{
  backgroundColor: colors.background.tertiary,  // Light gray
  border: '2px solid transparent',
}
```

#### Correct (✓)
```typescript
{
  backgroundColor: colors.game.correct,  // Desaturated green #6B9B6B
  border: '2px solid #5A8A5A',  // Slightly darker border
  icon: '✓' (white, size 24),
}
```

#### Close - Higher (↑)
```typescript
{
  backgroundColor: colors.game.close,  // Desaturated yellow #C9A857
  border: '2px solid #B89746',
  icon: '↑' (white, size 24),
}
```

#### Close - Lower (↓)
```typescript
{
  backgroundColor: colors.game.close,  // Desaturated yellow #C9A857
  border: '2px solid #B89746',
  icon: '↓' (white, size 24),
}
```

#### Wrong (✗)
```typescript
{
  backgroundColor: colors.game.wrong,  // Desaturated red #C96B6B
  border: '2px solid #B85A5A',
  icon: '✗' (white, size 24),
}
```

### Cell Content Layout

```
┌─────────────────┐
│   STAT NAME     │ ← caption2 (11px), text.tertiary
│                 │
│       ↑         │ ← Icon (24px), white
│    (or ✓/✗)     │
│                 │
│   VALUE         │ ← footnote (13px), white
│   "325 ft"      │    (only shown after reveal)
└─────────────────┘
```

**Typography in Cells:**
- Stat name (top): `typography.caption2`, `colors.text.tertiary` (before reveal)
- Icon (center): 24px, white, bold
- Value (bottom): `typography.footnote`, white (after reveal)

### Animation Sequence

**When Guess is Submitted:**

1. **Search bar dismisses** (slide down, spring animation)
2. **Grid cells flip sequentially** (left to right, top to bottom)
   - Delay: 100ms between each cell
   - Animation: 3D flip (rotateY: 0deg → 180deg)
   - Duration: 300ms with spring physics
   - Haptic: Light tap on each flip
3. **Cell reveals feedback**
   - Background color animates to correct state
   - Icon fades in (opacity 0 → 1)
   - Value text appears
4. **Victory/Defeat Handling**
   - If correct: Confetti animation + success haptic
   - If wrong: Grid stays, guess count increments

---

## 📱 Screen Layout

### Game Screen Structure

```
┌─────────────────────────────────────────┐
│  [Header]                               │
│  Coastle                       [Help]   │ ← 16px padding
│  Guess 3/6                              │
├─────────────────────────────────────────┤
│                                         │
│  [Previous Guesses - Scrollable]        │ ← Shows past grid states
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ Guess 1: Millennium Force           ││
│  │ [3×3 Grid with feedback]            ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ Guess 2: Steel Vengeance            ││
│  │ [3×3 Grid with feedback]            ││
│  └─────────────────────────────────────┘│
│                                         │
│  [Current Guess Area]                   │
│  [Search: Type coaster name...]         │ ← Input always visible
│                                         │
├─────────────────────────────────────────┤
│  [Bottom Safe Area - 16px padding]      │
└─────────────────────────────────────────┘
```

### Component Breakdown

#### 1. Header
```typescript
interface HeaderProps {
  currentGuess: number;
  maxGuesses: number;
  onHelpPress: () => void;
}
```

- Height: 64px
- Layout: Title left, Help icon right
- Title: "Coastle" (typography.title2)
- Subtitle: "Guess 3/6" (typography.subheadline, text.secondary)

#### 2. Previous Guesses List
```typescript
interface GuessCardProps {
  coasterName: string;
  gridFeedback: GridFeedback[];  // 9 cells
  guessNumber: number;
}
```

- Scrollable vertical list
- Each guess is a card:
  - Coaster name at top (typography.headline)
  - 3×3 grid below
  - Card padding: 16px
  - Card margin bottom: 16px
  - Shadow: `sm`

#### 3. Search Input

**Resting State:**
```typescript
<SearchBar
  placeholder="Type coaster name..."
  onSearch={handleSearch}
  autoFocus={true}
/>
```

- Full width input
- Border radius: 12px
- Height: 48px
- Background: `background.secondary`
- Border: 2px solid `border.light`
- Focus state: Border becomes `primary.blue`

**Autocomplete Results:**
```typescript
interface AutocompleteResult {
  id: string;
  name: string;
  park: string;
  country: string;
  imageUrl?: string;
}
```

- Appears below input as card
- Max height: 300px (scrollable)
- Each result:
  - Height: 64px
  - Layout: Coaster name + park + country
  - Tap to select
  - Haptic: Light tap on select

---

## 🎯 User Flow

### Starting Daily Game

1. User opens Coastle from Games Hub
2. Screen loads with header showing "Guess 1/6"
3. Search input is auto-focused (keyboard appears)
4. User types coaster name
5. Autocomplete shows matching coasters
6. User taps a coaster to submit guess

### After Each Guess

1. Search bar dismisses (slide down)
2. New guess card appears at bottom
3. Grid cells flip sequentially (animation)
4. Feedback reveals (green/yellow/red)
5. Guess counter increments (e.g., "Guess 2/6")
6. Search input reappears, ready for next guess

### Victory

1. All cells turn green (✓)
2. Confetti animation
3. Success haptic
4. Victory modal appears:
   - "You got it in X guesses!"
   - [Share Results] button
   - [Play Practice Mode] button
   - [Return to Games Hub] button

### Defeat

1. After 6th incorrect guess
2. Grid shows final feedback
3. Defeat modal appears:
   - "The answer was: [Coaster Name]"
   - [View Answer Stats] button (shows mystery coaster's grid)
   - [Play Practice Mode] button
   - [Return to Games Hub] button

### Share Results

Copy to clipboard in this format:
```
Coastle #123 4/6

🟩⬜️🟨
⬜️🟩🟨
🟨🟨🟩
```

Each emoji represents a cell:
- 🟩 = Correct (✓)
- 🟨 = Close (↑↓)
- ⬜️ = Wrong (✗)

---

## 🎮 Practice Mode

### Differences from Daily Mode

- **Unlimited plays**
- **Random mystery coaster** (not daily coaster)
- **No streak tracking**
- **No sharing** (practice doesn't count)

### Accessing Practice Mode

- Available after completing daily game (win or loss)
- Also accessible from Games Hub as secondary button
- Visual distinction: "Practice Mode" badge in header

---

## 📊 Data Structure

### Mystery Coaster Object

```typescript
interface MysteryCoaster {
  id: string;
  name: string;
  park: string;
  country: string;
  manufacturer: string;
  type: CoasterType;
  
  stats: {
    height: number;        // feet
    speed: number;         // mph
    length: number;        // feet
    year: number;          // year opened
    inversions: number;    // count (0 if none)
  };
  
  imageUrl?: string;
}

enum CoasterType {
  STEEL = 'Steel',
  WOODEN = 'Wooden',
  HYBRID = 'Hybrid',
  INVERTED = 'Inverted',
  WING = 'Wing',
  DIVE = 'Dive',
  HYPER = 'Hyper',
  GIGA = 'Giga',
  LAUNCHED = 'Launched',
  // ... more types
}
```

### Grid Feedback Object

```typescript
interface GridFeedback {
  cell: number;           // 0-8 (position in grid)
  stat: StatType;
  feedback: FeedbackType;
  value?: string;         // Displayed value (e.g., "325 ft")
}

enum StatType {
  HEIGHT = 'height',
  SPEED = 'speed',
  LENGTH = 'length',
  YEAR = 'year',
  INVERSIONS = 'inversions',
  COUNTRY = 'country',
  MANUFACTURER = 'manufacturer',
  TYPE = 'type',
  PARK = 'park',
}

enum FeedbackType {
  CORRECT = 'correct',    // ✓
  HIGHER = 'higher',      // ↑
  LOWER = 'lower',        // ↓
  WRONG = 'wrong',        // ✗
}
```

### Game State

```typescript
interface GameState {
  dailyNumber: number;           // e.g., "Coastle #123"
  mysteryCoaster: MysteryCoaster;
  guesses: Guess[];
  currentGuessIndex: number;     // 0-5
  status: GameStatus;
  mode: GameMode;
}

interface Guess {
  coaster: MysteryCoaster;
  gridFeedback: GridFeedback[];  // 9 items
  timestamp: Date;
}

enum GameStatus {
  IN_PROGRESS = 'in_progress',
  WON = 'won',
  LOST = 'lost',
}

enum GameMode {
  DAILY = 'daily',
  PRACTICE = 'practice',
}
```

---

## 🎨 Interaction Details

### Haptic Feedback

| Action | Haptic Type | Timing |
|--------|-------------|--------|
| Select coaster from search | `LIGHT` | On tap |
| Grid cell flip | `LIGHT` | Each cell flip |
| All cells correct (win) | `SUCCESS` | After final flip |
| Run out of guesses (loss) | `ERROR` | After 6th guess |
| Tap help button | `LIGHT` | On tap |
| Share results copied | `MEDIUM` | On copy |

### Animations

**Grid Cell Flip:**
```typescript
const cellFlip = {
  transform: [
    { rotateY: withSpring('180deg', springs.smooth) }
  ],
  backgroundColor: withTiming(feedbackColor, { duration: 200 }),
};
```

**Confetti (Victory):**
- Origin: Top center of screen
- Duration: 2 seconds
- Colors: Green, yellow, orange (desaturated palette)
- Particle count: 50-100

**Shake (Wrong Guess - Optional):**
- If guess is invalid (not in database)
- Input shakes left-right 3 times
- Haptic: Error
- Border flashes red

---

## 📐 Responsive Design

### iPhone SE (Small Screen)

- Grid: 85% screen width
- Cell size: ~90px × 90px
- Font sizes: Use `caption1` for stat names
- Reduce padding to 12px

### iPhone Pro Max (Large Screen)

- Grid: 90% screen width
- Cell size: ~120px × 120px
- Font sizes: Standard (`caption2`)
- Standard padding: 16px

### iPad (Tablet)

- Grid: Max width 500px (centered)
- Cell size: ~160px × 160px
- Larger fonts: Use `footnote` for stat names
- Increased padding: 24px

---

## 🌙 Dark Mode (Future)

When dark mode is added:
- Background: `#1A1A1A` (dark)
- Cards: `#2A2A2A` (slightly lighter)
- Grid empty state: `#3A3A3A`
- Correct: Brighter green `#7BAB7B`
- Close: Brighter yellow `#D9B867`
- Wrong: Brighter red `#D97B7B`
- Text: White or light gray
- Shadows: Lighter (use elevation instead)

---

## ♿ Accessibility

### VoiceOver Support

```typescript
<GridCell
  accessibilityLabel={`${stat.name}: ${feedback.type}`}
  accessibilityHint={`Your guess ${feedback.description}`}
  accessibilityRole="button"
/>
```

Example:
- "Height: Higher. Your guess was too low."
- "Manufacturer: Correct. Same manufacturer as mystery coaster."

### Color Blindness

- Icons (✓ ✗ ↑ ↓) provide feedback beyond color
- High contrast between states
- Optional: Patterns in addition to colors (future)

### Reduced Motion

- Disable confetti animation
- Simplify cell flip (fade instead of 3D rotate)
- Instant grid reveal (no stagger delay)

---

## 🔧 Implementation Notes

### Tech Stack

- **React Native** with TypeScript
- **React Native Reanimated 3** for animations
- **React Native Gesture Handler** for touch
- **Haptic Feedback** via Expo Haptics

### Key Libraries

```json
{
  "react-native-reanimated": "^3.x",
  "react-native-gesture-handler": "^2.x",
  "expo-haptics": "^13.x",
  "date-fns": "^2.x"
}
```

### Performance Considerations

- Memoize grid cells to prevent re-renders
- Use `FlatList` for previous guesses (virtualization)
- Optimize confetti particles (use fewer on lower-end devices)
- Cache coaster database locally (don't fetch on each search)

---

## 🎯 Success Metrics

### Engagement

- Daily return rate (users playing daily game)
- Average guesses per win
- Practice mode plays per user
- Share rate (% of wins shared)

### Difficulty Balance

- Win rate should be ~70-80% (not too hard)
- Average guesses: 4-5 (not too easy)
- Monitor by coaster difficulty (famous coasters = easier)

---

## 🚀 Future Enhancements

### Post-MVP Features

1. **Hard Mode**
   - Must use feedback from previous guesses
   - Can't guess coasters ruled out by stats

2. **Multiplayer**
   - Race against friend to solve first
   - Real-time updates

3. **Custom Leagues**
   - "Intamin Coasters Only"
   - "Pre-2000 Coasters"
   - "USA Only"

4. **Stats Tracking**
   - Win streak
   - Average guesses
   - Hardest coaster solved

5. **Hints**
   - Reveal one cell for 50 coins
   - Watch ad for hint

---

## 📝 Claude Code Instructions

### Agent: Coastle Game Developer

**Your Task:** Build the Coastle game following this README exactly.

**Priority Order:**

1. **Set up game state management**
   - TypeScript interfaces from Data Structure section
   - State hooks for game progress
   - Daily coaster selection logic

2. **Build 3×3 grid component**
   - Follow visual specs exactly
   - Cell component with 4 states (empty, correct, close, wrong)
   - Responsive sizing for different screens

3. **Implement search & autocomplete**
   - Coaster search from database
   - Autocomplete dropdown
   - Handle selection

4. **Add flip animation**
   - Sequential cell reveal
   - 3D flip with spring physics
   - Haptic on each flip

5. **Victory/defeat modals**
   - Confetti on win
   - Share results function
   - Practice mode option

6. **Polish**
   - Haptics throughout
   - Accessibility labels
   - Reduced motion support
   - Loading states

**Critical Requirements:**
- ✅ Grid must be 3×3 (9 cells, not 6 like Wordle)
- ✅ Use spring animations, not easing curves
- ✅ Haptic feedback on every interaction
- ✅ Text must never overflow (smart cell sizing)
- ✅ Respect reduced motion preference
- ✅ VoiceOver support

**Questions to Ask Before Building:**
- Confirm coaster database structure
- Confirm daily coaster selection algorithm
- Any specific edge cases to handle?

---

**Coastle is the flagship game - make it PERFECT! 🎢**
