# Coaster Blackjack - Stat-Based 21

## 🎮 Game Overview

A unique twist on blackjack where coaster stats replace traditional card values. Try to get as close to 21 as possible without going over by drawing coaster cards with random stat values. Each round uses a different stat category (Height, Speed, or Intensity).

**Think:** Traditional blackjack meets roller coaster stats

---

## 🎯 Game Mechanics

### Core Rules

1. **Goal:** Get as close to 21 as possible without going over
2. **Card Values:** Each coaster has a stat value (1-10)
3. **Random Stat:** AI chooses Height, Speed, OR Intensity at start of round
4. **Hit or Stand:** Draw more cards or stop
5. **Dealer AI:** Dealer follows same rules (hits until 17+)

### How It Works

**Example Round (Speed Category):**

1. **Round starts:** AI announces "This round: SPEED"
2. **Initial deal:**
   - Your cards: Fury 325 (Speed: 9) + Phoenix (Speed: 4) = **13**
   - Dealer: One card face-up (Speed: 6), one face-down
3. **Your turn:**
   - HIT: Draw Cedar Creek Mine Ride (Speed: 2) = **15** (safe)
   - HIT: Draw Velocicoaster (Speed: 8) = **23** (BUST!)
4. **OR you STAND at 15:**
   - Dealer reveals second card (Speed: 7) = **13**
   - Dealer HITs: Gets (Speed: 5) = **18**
   - Dealer STANDs (18 > 17)
   - **Dealer wins** (18 beats your 15)

### Dealer AI Rules

- Dealer must HIT on 16 or lower
- Dealer must STAND on 17 or higher
- Dealer reveals hidden card after player stands/busts

---

## 🎲 Stat Categories

### 3 Possible Categories (Random Each Round)

#### 1. Height Category
- Uses coaster height stat (1-10 scale)
- Example values:
  - Kingda Ka: 10
  - Fury 325: 9
  - Phoenix: 3

#### 2. Speed Category
- Uses coaster speed stat (1-10 scale)
- Example values:
  - Top Thrill 2: 10
  - Velocicoaster: 8
  - Wild Mouse: 2

#### 3. Intensity Category
- Uses coaster intensity stat (1-10 scale)
- Example values:
  - Intimidator 305: 10
  - Steel Vengeance: 9
  - Carousel: 1

### Random Selection

```typescript
const categories = ['height', 'speed', 'intensity'];
const randomCategory = categories[Math.floor(Math.random() * 3)];
```

AI announces category at start:
- "This round: HEIGHT"
- "This round: SPEED"
- "This round: INTENSITY"

---

## 📱 Screen Layout

### Game Screen

```
┌─────────────────────────────────────────┐
│  Coaster Blackjack                      │
│  High Score: 8 Wins  [X]                │
├─────────────────────────────────────────┤
│                                         │
│  This Round: SPEED                      │ ← Stat category
│                                         │
│  ┌────────────────────────────────┐    │
│  │  DEALER                        │    │
│  │  ┌─────┐  ┌─────┐              │    │
│  │  │Fury │  │ ??? │              │    │ ← One face-down
│  │  │ 325 │  │     │              │    │
│  │  │ [9] │  │ [?] │              │    │
│  │  └─────┘  └─────┘              │    │
│  │  Total: 9 + ?                  │    │
│  └────────────────────────────────┘    │
│                                         │
│  ─────────────────────                 │
│                                         │
│  ┌────────────────────────────────┐    │
│  │  YOU                           │    │
│  │  ┌─────┐  ┌─────┐  ┌─────┐    │    │
│  │  │Steel│  │Phoen│  │Cedar│    │    │ ← Your cards
│  │  │Veng.│  │ ix  │  │Creek│    │    │
│  │  │ [8] │  │ [4] │  │ [2] │    │    │
│  │  └─────┘  └─────┘  └─────┘    │    │
│  │  Total: 14                     │    │
│  └────────────────────────────────┘    │
│                                         │
│  ┌─────────┐  ┌─────────┐             │
│  │   HIT   │  │  STAND  │             │ ← Action buttons
│  └─────────┘  └─────────┘             │
│                                         │
│  Wins: 3  |  Losses: 1                 │ ← Score tracking
└─────────────────────────────────────────┘
```

---

## 🎨 Visual Design Specifications

### Card Display (Mini Version)

**Simplified from TCG:**
```typescript
{
  width: 100,
  height: 140,
  borderRadius: borderRadius.md (12px),
  backgroundColor: colors.background.secondary,
  shadow: shadows.sm,
  
  layout: {
    coasterImage: 'top 60px (cropped)',
    coasterName: 'center, 12px font',
    statValue: 'bottom, 24px font, bold',
  },
}
```

**Example:**
```
┌──────────────┐
│  [Image]     │ ← Coaster photo
│              │
│ Fury 325     │ ← Name
│              │
│    [9]       │ ← Stat value (large)
└──────────────┘
```

### Face-Down Card

```typescript
{
  backgroundColor: colors.primary.blue,
  content: '?' (white, 48px),
  pattern: 'diagonal stripes' (subtle),
}
```

### Total Display

```
┌────────────────────┐
│  Total: 14         │ ← headline typography
│  9 + 4 + 2         │ ← subheadline (breakdown)
└────────────────────┘
```

**Color Coding:**
- Safe (1-16): `text.primary` (normal)
- Close (17-20): `semantic.warning` (yellow)
- 21 (Blackjack!): `semantic.success` (green, bold)
- Bust (22+): `semantic.error` (red)

### Action Buttons

**HIT Button:**
```typescript
{
  width: '45%',
  height: 56,
  backgroundColor: colors.primary.blue,
  borderRadius: borderRadius.sm (8px),
  shadow: shadows.md,
  
  text: {
    label: 'HIT',
    typography: typography.headline,
    color: 'white',
  },
}
```

**STAND Button:**
```typescript
{
  width: '45%',
  height: 56,
  backgroundColor: colors.accent.blue,
  borderRadius: borderRadius.sm (8px),
  shadow: shadows.md,
  
  text: {
    label: 'STAND',
    typography: typography.headline,
    color: 'white',
  },
}
```

**Disabled State (During Dealer Turn):**
```typescript
{
  backgroundColor: colors.border.medium,
  opacity: 0.5,
  pointer-events: 'none',
}
```

---

## 🎯 User Flow

### Starting a Round

1. User taps "Play Blackjack" from Games Hub
2. Game screen loads
3. AI announces stat category: "This round: SPEED"
4. Initial deal (2 cards each):
   - Your 2 cards: Face-up, values shown
   - Dealer: 1 face-up, 1 face-down
5. Your turn begins

### Player Turn

**Decision Point: HIT or STAND?**

**If HIT:**
1. New card animates in (slide from right)
2. Card flips to reveal coaster + stat
3. Total updates
4. Check for bust:
   - If total > 21: **BUST!** (you lose)
   - If total ≤ 21: Can HIT again or STAND

**If STAND:**
1. Your total locks
2. Dealer's turn begins

### Dealer Turn

1. Dealer's face-down card flips over (3D animation)
2. Dealer's total revealed
3. Dealer logic executes:
   - If dealer < 17: Auto-HIT (new card animates in)
   - If dealer ≥ 17: Auto-STAND
   - If dealer > 21: Dealer BUST (you win!)
4. Repeat until dealer stands or busts

### Outcome

**You Win (3 Scenarios):**
1. Your total > Dealer's total (both ≤21)
2. You get 21 (Blackjack!)
3. Dealer busts

**You Lose (2 Scenarios):**
1. Your total < Dealer's total (both ≤21)
2. You bust

**Tie (Push):**
- Both have same total
- No winner, round doesn't count

### Result Screen

```
┌─────────────────────────┐
│      YOU WIN! 🎉        │
│                         │
│   Your Total: 19        │
│   Dealer Total: 17      │
│                         │
│   +100 Coins            │
│   Wins: 4               │
│                         │
│   [Play Again]          │
│   [Return to Games Hub] │
└─────────────────────────┘
```

---

## 🎮 Game Modes

### Single Round (Default)

- One round per game
- Quick play (~60 seconds)
- Good for casual sessions

### Best of 5 (Challenge Mode)

- 5 rounds total
- Each round uses different stat (random)
- Winner = most rounds won
- Longer session (~5 minutes)
- Higher rewards

**Best of 5 Score Tracking:**
```
Round 1 (Speed): You ✓
Round 2 (Height): Dealer ✓
Round 3 (Intensity): You ✓
Round 4 (Speed): You ✓
─────────────────────────
You Win 3-1!
```

---

## 📊 Data Structure

### Card Object

```typescript
interface BlackjackCard {
  coaster: {
    id: string;
    name: string;
    imageUrl: string;
  };
  statCategory: 'height' | 'speed' | 'intensity';
  value: number;  // 1-10
}
```

### Game State

```typescript
interface BlackjackGameState {
  mode: 'single' | 'best_of_5';
  currentRound: number;
  statCategory: 'height' | 'speed' | 'intensity';
  
  playerHand: BlackjackCard[];
  dealerHand: BlackjackCard[];
  
  playerTotal: number;
  dealerTotal: number;
  
  turn: 'player' | 'dealer' | 'finished';
  outcome?: 'win' | 'lose' | 'push' | 'player_bust' | 'dealer_bust';
  
  wins: number;
  losses: number;
}
```

### Coaster Deck

```typescript
// Pool of ~100 coasters with varied stats
const coasterDeck: Coaster[] = [
  {
    id: 'fury-325',
    name: 'Fury 325',
    stats: { height: 9, speed: 9, intensity: 7 },
    imageUrl: '...',
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    stats: { height: 3, speed: 4, intensity: 5 },
    imageUrl: '...',
  },
  // ... 98 more
];

// Draw random card
const drawCard = (statCategory: string): BlackjackCard => {
  const randomCoaster = coasterDeck[Math.floor(Math.random() * coasterDeck.length)];
  return {
    coaster: randomCoaster,
    statCategory,
    value: randomCoaster.stats[statCategory],
  };
};
```

---

## 🎨 Interaction Details

### Haptic Feedback

| Action | Haptic Type |
|--------|-------------|
| Card dealt | `LIGHT` |
| HIT button | `MEDIUM` |
| STAND button | `MEDIUM` |
| Bust | `ERROR` |
| Win | `SUCCESS` |
| Blackjack (21) | `SUCCESS` (with confetti) |

### Animations

**Card Deal:**
```typescript
const cardDeal = {
  // Slide in from deck position
  translateX: withTiming(0, { duration: 300 }),
  
  // Flip to reveal
  rotateY: withTiming('180deg', { duration: 200, delay: 300 }),
  
  // Settle
  scale: withSpring(1, springs.smooth),
};
```

**Bust Animation:**
```typescript
const bustAnimation = {
  // Cards shake
  transform: [
    {
      translateX: withSequence(
        withTiming(-5, { duration: 50 }),
        withTiming(5, { duration: 50 }),
        withTiming(-5, { duration: 50 }),
        withTiming(0, { duration: 50 }),
      ),
    },
  ],
  
  // Total flashes red
  color: withSequence(
    withTiming(colors.semantic.error, { duration: 100 }),
    withTiming(colors.text.primary, { duration: 100 }),
    withTiming(colors.semantic.error, { duration: 100 }),
  ),
};
```

**Dealer Card Flip:**
```typescript
const dealerFlip = {
  rotateY: withSpring('180deg', springs.smooth),
  duration: 400,
};
```

---

## 🏆 Scoring & Rewards

### Per-Game Rewards

**Win:**
- +100 coins
- +10 XP

**Loss:**
- +25 coins (consolation)
- +5 XP

**Blackjack (21 exactly):**
- +200 coins (2x bonus)
- +20 XP

### High Score Tracking

- Track best winning streak
- Track highest total reached without busting
- Track total wins/losses

**Leaderboard:**
- Top win streaks
- Most blackjacks
- Highest win rate

---

## ♿ Accessibility

### VoiceOver

```typescript
<Card
  accessibilityLabel={`${card.coaster.name}, ${card.statCategory} value ${card.value}`}
  accessibilityRole="image"
/>

<TotalDisplay
  accessibilityLabel={`Your total: ${playerTotal}${playerTotal > 21 ? ', Bust!' : ''}`}
  accessibilityLiveRegion="polite"
/>
```

**Announce Key Events:**
```typescript
if (outcome === 'player_bust') {
  announceForAccessibility('Bust! Your total exceeded 21. You lose this round.');
}

if (outcome === 'win') {
  announceForAccessibility(`You win! Your ${playerTotal} beats dealer's ${dealerTotal}.`);
}
```

### High Contrast

- Increase card border thickness
- Higher contrast between card states
- Larger stat value display

---

## 📐 Responsive Design

### iPhone SE (Small Screen)

- Card size: 80px × 112px
- Max 4 cards visible (scroll if more)
- Reduce spacing

### iPhone Pro Max (Large Screen)

- Card size: 100px × 140px
- Can show 5-6 cards
- Standard spacing

### iPad

- Card size: 120px × 168px
- Horizontal layout (dealer left, you right)
- Larger buttons

---

## 🎯 Strategy Tips (For Players)

**Displayed in Help Modal:**

1. **Basic Strategy:**
   - HIT if total < 12 (low risk)
   - STAND if total ≥ 17 (high risk to hit)
   - Consider dealer's visible card

2. **Stat Awareness:**
   - Speed cards tend to be higher (8-10 common)
   - Height cards are varied (3-10 range)
   - Intensity cards are mixed (1-10 range)

3. **Risk Management:**
   - Never hit on 19-20 (too risky)
   - Always hit on 11 or less (safe)
   - 12-16 is the "danger zone" (use judgment)

---

## 🔧 Implementation Notes

### Dealer AI Logic

```typescript
const dealerTurn = (dealerHand: BlackjackCard[]): void => {
  let total = calculateTotal(dealerHand);
  
  while (total < 17) {
    const newCard = drawCard(statCategory);
    dealerHand.push(newCard);
    total = calculateTotal(dealerHand);
    
    // Animate card dealt
    animateCardDeal(newCard);
    
    // Wait 1 second between cards
    await delay(1000);
  }
  
  // Dealer stands at 17+
  determineWinner();
};
```

### Fair Deck

**Problem:** If deck isn't managed, could draw same coaster twice.

**Solution:**
```typescript
// Create shuffled deck at start of each round
const createDeck = (): Coaster[] => {
  const deck = [...coasterDeck];  // Copy
  shuffle(deck);  // Fisher-Yates shuffle
  return deck;
};

let currentDeck = createDeck();
let deckIndex = 0;

const drawCard = (): BlackjackCard => {
  if (deckIndex >= currentDeck.length) {
    // Reshuffle if deck exhausted (rare)
    currentDeck = createDeck();
    deckIndex = 0;
  }
  
  const coaster = currentDeck[deckIndex];
  deckIndex++;
  
  return {
    coaster,
    statCategory,
    value: coaster.stats[statCategory],
  };
};
```

---

## 🚀 Future Enhancements

### Post-MVP Features

1. **Double Down**
   - Double your bet, get exactly 1 more card
   - Higher risk, higher reward

2. **Split**
   - If first 2 cards have same value, split into 2 hands
   - Traditional blackjack mechanic

3. **Side Bets**
   - Bet on specific outcomes (e.g., "Will dealer bust?")
   - Higher payout odds

4. **Tournaments**
   - Compete for most wins in 1 hour
   - Leaderboard prizes

5. **Custom Decks**
   - Choose which coasters to include
   - "Intamin Only" deck
   - "Wooden Coasters" deck

---

## 📝 Claude Code Instructions

**Your Task:** Build stat-based blackjack following this README.

**Priority Order:**

1. **Core game logic**
   - Card drawing (random stat, random coaster)
   - Total calculation
   - Bust detection
   - Dealer AI (hit until 17)

2. **Game screen UI**
   - Dealer area (1 face-up, 1 face-down)
   - Player area (all face-up)
   - Total displays
   - HIT/STAND buttons

3. **Card animations**
   - Deal animation
   - Flip animation
   - Bust shake effect

4. **Outcome handling**
   - Win/lose/push detection
   - Result modal
   - Rewards (coins, XP)

5. **Best of 5 mode**
   - Multi-round tracking
   - Round results history

**Critical:**
- ✅ Dealer AI must follow 17 rule exactly
- ✅ Random stat category each round
- ✅ Cards animate smoothly
- ✅ Fair deck (no duplicate cards in same round)
- ✅ Haptic feedback on key events

---

**Make it feel like Vegas (but with coasters)! 🎰🎢**
