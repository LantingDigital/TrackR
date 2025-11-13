# Roller Coaster Trivia - Daily Quiz Challenge

## 🎮 Game Overview

A fast-paced trivia game where players answer 5 multiple-choice questions about roller coasters, parks, and enthusiast knowledge. Questions progress from easy to hard, and scoring rewards both accuracy and speed (Kahoot-style).

**Think:** Kahoot meets roller coaster knowledge

---

## 🎯 Game Mechanics

### Core Loop

1. **5 Questions Per Game**
   - Progressive difficulty: Easy → Medium → Hard
   - Question 1: Easy (warm-up)
   - Questions 2-3: Medium
   - Questions 4-5: Hard

2. **10 Seconds Per Question**
   - Circular progress ring around question
   - Timer counts down from 10 → 0
   - Answer locks at 0 (loses points if unanswered)

3. **4 Multiple Choice Answers**
   - Tap to select answer
   - Immediate feedback (correct/wrong)
   - Points awarded based on speed + accuracy

4. **Final Score & Leaderboard**
   - Max 5000 points (1000 per question)
   - Leaderboard shows top scores
   - Daily challenge counts toward streak

---

## 🏆 Scoring System (Kahoot-Style)

### Points Formula

```typescript
const calculatePoints = (
  isCorrect: boolean,
  timeRemaining: number,  // 0-10 seconds
  difficulty: QuestionDifficulty
): number => {
  if (!isCorrect) return 0;
  
  const basePoints = {
    easy: 500,
    medium: 750,
    hard: 1000,
  };
  
  const speedMultiplier = timeRemaining / 10;  // 0.0 to 1.0
  const speedBonus = basePoints[difficulty] * speedMultiplier;
  
  return Math.round(basePoints[difficulty] + speedBonus);
};
```

### Examples

**Easy Question (Base 500 pts):**
- Answer in 9s remaining: 500 + (500 × 0.9) = **950 pts**
- Answer in 5s remaining: 500 + (500 × 0.5) = **750 pts**
- Answer in 1s remaining: 500 + (500 × 0.1) = **550 pts**
- Wrong answer: **0 pts**

**Hard Question (Base 1000 pts):**
- Answer in 9s remaining: 1000 + (1000 × 0.9) = **1900 pts**
- Answer in 5s remaining: 1000 + (1000 × 0.5) = **1500 pts**
- Answer in 1s remaining: 1000 + (1000 × 0.1) = **1100 pts**

**Maximum Possible Score:** 
- 5 questions × ~1900 pts = **~9500 pts** (all correct, all answered in 9s)
- Realistic max: **~5000 pts**

### Score Display

After each question:
```
+1250 pts
─────────
Total: 2750 pts
```

---

## 📱 Screen Layout

### Question Screen Structure

```
┌─────────────────────────────────────────┐
│  [Header]                               │
│  Question 3/5                  [X]      │ ← Exit button
│                                         │
│  [Circular Progress Ring - 10s]         │ ← Countdown timer
│       ┌───────────────────┐             │
│       │                   │             │
│       │    What year did  │             │
│       │   Fury 325 open?  │ ← Question  │
│       │                   │             │
│       └───────────────────┘             │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │         A. 2015                   │  │ ← Answer option
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │         B. 2016                   │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │         C. 2017                   │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │         D. 2018                   │  │
│  └──────────────────────────────────┘  │
│                                         │
│  [Score: 1850 pts]                      │ ← Running score
└─────────────────────────────────────────┘
```

---

## 🎨 Visual Design Specifications

### Question Card (Center)

```typescript
{
  width: '90%',
  minHeight: 200,
  padding: spacing.md (24px),
  borderRadius: borderRadius.lg (16px),
  backgroundColor: colors.background.secondary,
  shadow: shadows.md,
  
  // Circular progress ring
  ring: {
    diameter: 300,
    strokeWidth: 8,
    color: colors.primary.blue,  // Depleting
    backgroundColor: colors.border.light,  // Track
  },
}
```

**Typography:**
- Question text: `typography.title3` (20px, semibold)
- Center aligned
- Max 3 lines, auto-expand if needed
- Color: `text.primary`

### Answer Buttons

**Resting State:**
```typescript
{
  width: '90%',
  height: 56,
  padding: spacing.sm (16px),
  borderRadius: borderRadius.sm (8px),
  backgroundColor: colors.background.secondary,
  border: '2px solid',
  borderColor: colors.border.light,
  shadow: shadows.sm,
}
```

**Selected (Before Reveal):**
```typescript
{
  borderColor: colors.primary.blue,
  backgroundColor: colors.primary.blue + '15',  // 15% opacity
  shadow: shadows.md,
  transform: [{ scale: 0.98 }],  // Slight press effect
}
```

**Correct Answer (After Reveal):**
```typescript
{
  backgroundColor: colors.semantic.success,  // Desaturated green
  borderColor: colors.semantic.success,
  icon: '✓' (white, 24px),
}
```

**Wrong Answer (After Reveal):**
```typescript
{
  backgroundColor: colors.semantic.error,  // Desaturated red
  borderColor: colors.semantic.error,
  icon: '✗' (white, 24px),
}
```

**Typography in Answers:**
- Answer text: `typography.body` (17px, regular)
- Letter prefix (A/B/C/D): `typography.headline` (17px, semibold)
- Color: `text.primary` (resting), white (revealed)

### Circular Progress Ring

**Implementation:**
```typescript
import Animated from 'react-native-reanimated';
import { CircularProgress } from 'react-native-circular-progress';

<CircularProgress
  size={300}
  width={8}
  fill={(timeRemaining / 10) * 100}  // Percentage
  tintColor={colors.primary.blue}
  backgroundColor={colors.border.light}
  rotation={0}  // Start at top
  duration={10000}  // 10 seconds
  easing={Easing.linear}
>
  {(fill) => (
    <Text style={typography.display}>
      {Math.ceil((fill / 100) * 10)}
    </Text>
  )}
</CircularProgress>
```

**Visual:**
- Diameter: 300px (adjusts for small screens)
- Stroke width: 8px
- Fill color: `primary.blue` (depletes clockwise)
- Background: `border.light`
- Center displays: Time remaining (9, 8, 7...)
  - Typography: `typography.display` (34px, bold)
  - Color: `text.primary`

**Urgency Colors (Last 3 Seconds):**
- 3s remaining: `warning` (desaturated yellow)
- 2s remaining: Flashes between `warning` and `error`
- 1s remaining: `error` (desaturated red)

---

## 🎭 Question Types & Examples

### Type 1: Year Questions (Easy)

**Example:**
```
What year did Fury 325 open?
A. 2013
B. 2015  ← Correct
C. 2017
D. 2019
```

**Variations:**
- "When did [Coaster] debut?"
- "What year was [Park] founded?"
- "In what year did [Manufacturer] release their first coaster?"

### Type 2: Manufacturer Questions (Easy-Medium)

**Example:**
```
Who manufactured Steel Vengeance?
A. Intamin
B. B&M
C. RMC  ← Correct
D. Vekoma
```

**Variations:**
- "Which company built [Coaster]?"
- "Who is known for making [Type] coasters?"

### Type 3: Records & Stats (Medium)

**Example:**
```
What is the tallest roller coaster in the world?
A. Fury 325
B. Millennium Force
C. Kingda Ka  ← Correct
D. Steel Dragon 2000
```

**Variations:**
- "What's the fastest coaster?"
- "Which coaster has the most inversions?"
- "What's the longest coaster?"

### Type 4: Park Questions (Medium)

**Example:**
```
Which park has the most roller coasters?
A. Cedar Point
B. Six Flags Magic Mountain  ← Correct
C. Kings Island
D. Busch Gardens Williamsburg
```

**Variations:**
- "Where is [Coaster] located?"
- "Which park opened first?"
- "What was the first coaster at [Park]?"

### Type 5: True/False (Easy)

**Example:**
```
True or False: Steel Vengeance was once called Mean Streak.
A. True  ← Correct
B. False
```

### Type 6: Technical/Enthusiast (Hard)

**Example:**
```
What is the term for the first drop on a roller coaster?
A. Apex
B. First descent
C. Initial drop  ← Correct
D. Launch point
```

**Variations:**
- "What does 'airtime' mean?"
- "What is a 'pre-drop'?"
- "What's the difference between a giga and a strata coaster?"

### Type 7: Trivia/Fun Facts (Hard)

**Example:**
```
Which coaster inspired the creation of Cedar Point's Millennium Force?
A. Magnum XL-200  ← Correct
B. Steel Dragon 2000
C. Superman: The Ride
D. Fury 325
```

---

## 📊 Data Structure

### Question Object

```typescript
interface Question {
  id: string;
  text: string;
  difficulty: QuestionDifficulty;
  answers: Answer[];
  correctAnswerIndex: number;  // 0-3
  category: QuestionCategory;
  tags?: string[];  // For filtering
}

enum QuestionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

enum QuestionCategory {
  YEAR = 'year',
  MANUFACTURER = 'manufacturer',
  RECORDS = 'records',
  PARKS = 'parks',
  TRUE_FALSE = 'true_false',
  TECHNICAL = 'technical',
  TRIVIA = 'trivia',
}

interface Answer {
  id: string;
  text: string;
  letter: 'A' | 'B' | 'C' | 'D';
}
```

### Game State

```typescript
interface TriviaGameState {
  questions: Question[];       // 5 questions (selected at start)
  currentQuestionIndex: number;  // 0-4
  timeRemaining: number;       // 0-10 seconds
  answers: QuestionAnswer[];   // User's answers
  totalScore: number;
  status: GameStatus;
}

interface QuestionAnswer {
  questionId: string;
  selectedAnswerIndex: number;  // 0-3
  isCorrect: boolean;
  timeRemaining: number;        // Seconds left when answered
  pointsEarned: number;
}

enum GameStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}
```

---

## 🎯 User Flow

### Starting Game

1. User taps "Play Daily Trivia" from Games Hub
2. Game screen loads with Question 1
3. Timer starts immediately (10s countdown)
4. User reads question and answer options
5. User taps an answer

### After Each Answer

1. **Immediate Feedback**
   - Selected answer highlights (blue border)
   - Timer pauses
   - Haptic feedback (success or error)

2. **Reveal (500ms delay)**
   - Correct answer turns green (✓)
   - Wrong answer (if selected) turns red (✗)
   - Points earned display: "+850 pts"
   - Running total updates: "Total: 2650 pts"

3. **Next Question (1.5s delay)**
   - Current question fades out
   - Next question fades in
   - Timer resets to 10s
   - Progress updates: "Question 3/5"

### Final Score

After 5th question:
1. Final points calculated
2. Success modal appears:
   ```
   ┌─────────────────────────┐
   │   Great Work!           │
   │                         │
   │   3825 pts              │
   │   4/5 Correct           │
   │                         │
   │   [View Leaderboard]    │
   │   [Play Again]          │
   │   [Return to Games]     │
   └─────────────────────────┘
   ```

3. Leaderboard shows:
   - User's rank
   - Top 10 scores
   - User's best score (if not in top 10)

---

## 🏅 Leaderboard

### Types

1. **Daily Leaderboard**
   - Resets every 24 hours
   - Shows today's top scores
   - Only today's plays count

2. **All-Time Leaderboard**
   - Persistent high scores
   - Shows best score per user
   - Never resets

### Leaderboard Entry

```typescript
interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  score: number;
  correctAnswers: number;  // e.g., "4/5"
  timestamp: Date;
  isCurrentUser: boolean;
}
```

### Visual Design

**Leaderboard Screen:**
```
┌─────────────────────────────────────────┐
│  Daily Leaderboard     [All-Time]       │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ 🥇 1. CoasterFan99    4850 pts   │  │
│  │              5/5 Correct          │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ 🥈 2. ThrillSeeker    4720 pts   │  │
│  │              5/5 Correct          │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ 🥉 3. AirtimeAddict   4650 pts   │  │
│  │              5/5 Correct          │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ...                                    │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │    12. You (Chris)    3825 pts   │  │ ← Current user
│  │              4/5 Correct          │  │    (highlighted)
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## 🎨 Interaction Details

### Haptic Feedback

| Action | Haptic Type | Timing |
|--------|-------------|--------|
| Tap answer option | `LIGHT` | On tap |
| Correct answer | `SUCCESS` | On reveal |
| Wrong answer | `ERROR` | On reveal |
| Timer hits 3s | `WARNING` | At 3s mark |
| Timer runs out | `ERROR` | At 0s |
| Final score reveal | `SUCCESS` | On modal appear |

### Animations

**Question Transition:**
```typescript
// Fade out current question
const fadeOut = {
  opacity: withTiming(0, { duration: 300 }),
  translateY: withTiming(-20, { duration: 300 }),
};

// Fade in next question
const fadeIn = {
  opacity: withTiming(1, { duration: 300 }),
  translateY: withTiming(0, { duration: 300 }),
};
```

**Answer Reveal:**
```typescript
// Correct answer
const correctAnimation = {
  backgroundColor: withTiming(colors.semantic.success, { duration: 300 }),
  scale: withSpring(1.02, springs.bouncy),
};

// Wrong answer
const wrongAnimation = {
  backgroundColor: withTiming(colors.semantic.error, { duration: 300 }),
  transform: [
    { translateX: withSequence(
        withTiming(-5, { duration: 50 }),
        withTiming(5, { duration: 50 }),
        withTiming(-5, { duration: 50 }),
        withTiming(0, { duration: 50 }),
      )
    }
  ],
};
```

**Points Pop-Up:**
```typescript
const pointsAnimation = {
  opacity: withSequence(
    withTiming(1, { duration: 200 }),
    withDelay(1000, withTiming(0, { duration: 300 }))
  ),
  translateY: withSequence(
    withTiming(0, { duration: 200 }),
    withDelay(1000, withTiming(-20, { duration: 300 }))
  ),
  scale: withSequence(
    withSpring(1.2, springs.bouncy),
    withDelay(1000, withTiming(1, { duration: 300 }))
  ),
};
```

---

## 📐 Responsive Design

### iPhone SE (Small Screen)

- Progress ring: 250px diameter
- Answer buttons: Height 48px
- Font sizes: Reduce by 1 level (title3 → headline)
- Padding: 12px

### iPhone Pro Max (Large Screen)

- Progress ring: 300px diameter
- Answer buttons: Height 56px
- Standard font sizes
- Padding: 16px

### iPad

- Progress ring: 400px diameter
- Answer buttons: Height 64px, max-width 600px (centered)
- Larger fonts: title2 for questions
- Padding: 24px

---

## ♿ Accessibility

### VoiceOver Support

```typescript
<AnswerButton
  accessibilityLabel={`Answer ${answer.letter}: ${answer.text}`}
  accessibilityHint="Double tap to select this answer"
  accessibilityRole="button"
  accessibilityState={{
    selected: isSelected,
    disabled: hasAnswered,
  }}
/>
```

**Announce Results:**
```typescript
// After answer
if (isCorrect) {
  announceForAccessibility(`Correct! You earned ${points} points.`);
} else {
  announceForAccessibility(`Incorrect. The correct answer was ${correctAnswer}.`);
}
```

### Reduced Motion

- Disable answer reveal animation (instant color change)
- Disable question transition animation (instant swap)
- Keep progress ring (essential information)

### High Contrast Mode

- Increase border thickness to 3px
- Use darker success/error colors
- Add patterns in addition to colors (future)

---

## 🎮 Question Bank Management

### Admin Interface (Future)

For custom questions, create admin panel:

```typescript
interface QuestionInput {
  text: string;
  difficulty: QuestionDifficulty;
  category: QuestionCategory;
  answers: string[];  // 4 answers
  correctAnswerIndex: number;  // 0-3
  tags?: string[];
}
```

**Features:**
- Add new questions
- Edit existing questions
- Mark questions as "approved"
- Filter by category, difficulty
- Bulk import from CSV

### Question Selection Algorithm

**For Daily Game:**
```typescript
const selectQuestions = (): Question[] => {
  return [
    getRandomQuestion('easy'),      // Q1
    getRandomQuestion('medium'),    // Q2
    getRandomQuestion('medium'),    // Q3
    getRandomQuestion('hard'),      // Q4
    getRandomQuestion('hard'),      // Q5
  ];
};
```

**Ensure Variety:**
- No duplicate questions
- Try to vary categories (don't do 5 year questions)
- Randomize answer order (A/B/C/D positions)

---

## 🔧 Implementation Notes

### Tech Stack

- React Native with TypeScript
- React Native Reanimated 3 (animations)
- Expo Haptics (feedback)
- React Native Circular Progress (timer ring)

### Key Libraries

```json
{
  "react-native-reanimated": "^3.x",
  "react-native-gesture-handler": "^2.x",
  "react-native-circular-progress": "^3.x",
  "expo-haptics": "^13.x",
  "date-fns": "^2.x"
}
```

### Timer Implementation

```typescript
import { useEffect, useRef } from 'react';

const useQuestionTimer = (onTimeout: () => void) => {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const timerRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timerRef.current);
  }, []);
  
  return timeRemaining;
};
```

---

## 🎯 Success Metrics

### Engagement

- Daily play rate
- Average score
- Question completion rate (% who finish all 5)
- Repeat play rate (playing multiple times per day)

### Difficulty Balance

- % correct per difficulty level
  - Easy: ~80-90% correct
  - Medium: ~60-70% correct
  - Hard: ~40-50% correct

---

## 🚀 Future Enhancements

### Post-MVP Features

1. **Power-Ups**
   - 50/50 (Remove 2 wrong answers)
   - Extra Time (+5 seconds)
   - Skip Question

2. **Multiplayer**
   - Head-to-head real-time
   - See opponent's answers
   - First to answer correctly wins

3. **Custom Quizzes**
   - User-created question sets
   - Share with friends
   - Community voting on questions

4. **Achievements**
   - "Perfect Score" (5/5 correct)
   - "Speed Demon" (Answer all in <5s)
   - "Comeback King" (Miss first 2, get last 3)

5. **Themed Weeks**
   - "Intamin Week" (only Intamin questions)
   - "Classic Coasters" (pre-1980 questions)
   - "International Parks"

---

## 📝 Claude Code Instructions

### Agent: Trivia Game Developer

**Your Task:** Build the trivia game following this README exactly.

**Priority Order:**

1. **Question selection & game state**
   - Implement progressive difficulty
   - Randomize answer order
   - Track score calculation

2. **Build circular timer**
   - 10-second countdown
   - Smooth animation
   - Urgency colors (last 3 seconds)

3. **Answer buttons & feedback**
   - 4 options (A/B/C/D)
   - Tap to select
   - Correct/wrong reveal animation

4. **Scoring system**
   - Kahoot-style: base + speed bonus
   - Display after each question
   - Running total

5. **Leaderboard**
   - Daily and all-time
   - Rank display
   - User highlighting

6. **Polish**
   - Haptics throughout
   - Smooth transitions
   - Accessibility labels

**Critical Requirements:**
- ✅ Progressive difficulty (easy → hard)
- ✅ Circular progress ring (not linear bar)
- ✅ Speed + accuracy scoring
- ✅ Haptic feedback on every interaction
- ✅ Reduced motion support

---

**Make trivia addictive and fun! 🧠**
