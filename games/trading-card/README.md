# Coaster Trading Card Game - Simplified Battles

## 🎮 Game Overview

A streamlined trading card game where players collect 50 curated famous roller coasters and battle using 3-card decks. Each coaster has 3 core stats (Height, Speed, Intensity) and special manufacturer abilities. Battles are fast (60 seconds), strategic, and focus on gorgeous card design over complex mechanics.

**Think:** Simplified Hearthstone meets beautiful coaster photography

---

## 🎯 Game Mechanics

### Core Concept

- **Collection:** 50 curated famous coasters as cards
- **Deck Building:** Select 3 cards from your collection
- **Battle:** Compare stats across 3 rounds
- **Victory:** Win 2 out of 3 rounds

### Battle Flow

1. **Deck Selection (Pre-Battle)**
   - Choose 3 cards from your collection
   - Can't see opponent's deck
   - Must commit to all 3 before battle starts

2. **Simultaneous Reveal (Each Round)**
   - Both players' cards flip at same time
   - Stats are compared in pre-determined category
   - Higher stat wins the round

3. **3 Rounds Per Battle**
   - Round 1: Compare Height
   - Round 2: Compare Speed
   - Round 3: Compare Intensity
   - Best 2 of 3 wins the match

4. **Quick Matches**
   - Average match: 60 seconds
   - No turn-based waiting
   - Instant results

---

## 🃏 Card System

### The 50 Curated Coasters

**Selection Criteria:**
- Must be iconic/famous
- Variety of types (giga, hyper, wooden, launched, etc.)
- Variety of manufacturers
- Variety of stats (not all tall coasters)
- Geographical diversity

**Example Cards (15 Starter + 35 Unlockable):**

**Starter Collection (15 Cards):**
1. Fury 325 (B&M Giga)
2. Steel Vengeance (RMC Hybrid)
3. Velocicoaster (Intamin Launched)
4. Millennium Force (Intamin Giga)
5. Lightning Rod (RMC Launched Wooden)
6. Intimidator 305 (Intamin Giga)
7. Phoenix (Wooden Classic)
8. Maverick (Intamin Launched)
9. X2 (Arrow 4D)
10. Montu (B&M Inverted)
11. The Voyage (Gravity Group Wooden)
12. Twisted Colossus (RMC Hybrid)
13. Top Thrill 2 (Intamin Strata)
14. Banshee (B&M Inverted)
15. Goliath SFMM (Giovanola Hyper)

**Unlockable (35 More - Earned Through Play)**
- Win battles to earn card packs
- Daily login rewards
- Complete challenges
- Level up

### Card Rarities

**Distribution Across 50 Cards:**
- **Common:** 20 cards (40%)
- **Rare:** 15 cards (30%)
- **Epic:** 10 cards (20%)
- **Legendary:** 5 cards (10%)

**Rarity Affects:**
1. **Visual Design** - Holographic effects, borders, particle effects
2. **Pack Odds** - Legendary cards are harder to get
3. **Stats** - Legendary cards tend to have higher stats (but not always)

**NOT Affected by Rarity:**
- Gameplay balance - A clever Common can beat a Legendary
- Deck restrictions - Can mix any rarities

---

## 📊 Card Stats (The 3 Core Stats)

### 1. Height (1-10 Scale)

**What It Represents:** How tall the coaster is

**Scoring:**
- 1-2: <100 feet
- 3-4: 100-150 feet
- 5-6: 150-250 feet
- 7-8: 250-350 feet
- 9: 350-450 feet
- 10: 450+ feet

**Examples:**
- Kingda Ka: 10 (456 feet)
- Fury 325: 9 (325 feet)
- Steel Vengeance: 7 (205 feet)
- Phoenix: 3 (78 feet)

### 2. Speed (1-10 Scale)

**What It Represents:** Top speed achieved

**Scoring:**
- 1-2: <40 mph
- 3-4: 40-55 mph
- 5-6: 55-70 mph
- 7-8: 70-85 mph
- 9: 85-100 mph
- 10: 100+ mph

**Examples:**
- Top Thrill 2: 10 (120 mph)
- Fury 325: 9 (95 mph)
- Velocicoaster: 8 (70 mph)
- Phoenix: 4 (45 mph)

### 3. Intensity (1-10 Scale)

**What It Represents:** G-forces, inversions, aggressive elements

**Scoring (Subjective):**
- 1-2: Family-friendly, gentle
- 3-4: Mild thrills
- 5-6: Good thrills, some G's
- 7-8: Intense G-forces, multiple inversions
- 9: Extreme intensity
- 10: Borderline dangerous intensity

**Examples:**
- Intimidator 305: 10 (Insane positive G's)
- Velocicoaster: 9 (High G's, intense inversions)
- Fury 325: 7 (Good G's, sustained intensity)
- Phoenix: 5 (Moderate airtime)

### Stat Balance Philosophy

**No Perfect Card:**
- High Height usually = Lower Speed (slower climbs)
- High Speed usually = Lower Intensity (not sustained)
- High Intensity usually = Lower Height (compact coasters)

**Rock-Paper-Scissors Dynamic:**
- Tall coasters (Gigas) beat medium coasters in Height
- Fast coasters (Launched) beat tall coasters in Speed
- Compact coasters (Intamin blitz) beat fast coasters in Intensity

---

## 🎴 Card Visual Design

### Card Layout

```
┌────────────────────────────────┐
│  [Coaster Photo - Full Bleed]  │ ← Gorgeous photo (300px height)
│                                 │
│  ╔═══════════════════════════╗ │
│  ║ Fury 325              [9] ║ │ ← Name + Rarity level
│  ║ Carowinds • B&M Giga      ║ │ ← Park + Type
│  ╠═══════════════════════════╣ │
│  ║ HEIGHT:    9 ▓▓▓▓▓▓▓▓▓░  ║ │ ← Stat bars
│  ║ SPEED:     9 ▓▓▓▓▓▓▓▓▓░  ║ │
│  ║ INTENSITY: 7 ▓▓▓▓▓▓▓░░░  ║ │
│  ╠═══════════════════════════╣ │
│  ║ [B&M]: Swiss Precision    ║ │ ← Manufacturer perk
│  ╚═══════════════════════════╝ │
└────────────────────────────────┘
```

### Rarity Visual Differences

**Common (White Border):**
```typescript
{
  borderWidth: 3,
  borderColor: '#D8D7D5',
  backgroundColor: colors.background.secondary,
  shadow: shadows.sm,
}
```

**Rare (Blue Border + Subtle Glow):**
```typescript
{
  borderWidth: 3,
  borderColor: colors.primary.blue,
  backgroundColor: colors.background.secondary,
  shadow: shadows.md,
  glowColor: colors.primary.blue + '40',  // 40% opacity glow
}
```

**Epic (Purple Border + Holographic Effect):**
```typescript
{
  borderWidth: 4,
  borderColor: colors.primary.purple,
  backgroundColor: colors.background.secondary,
  shadow: shadows.lg,
  
  // Holographic gradient overlay
  overlay: {
    background: 'linear-gradient(135deg, 
      rgba(139,123,158,0.3) 0%, 
      rgba(91,124,153,0.3) 50%, 
      rgba(139,123,158,0.3) 100%)',
    animation: 'shimmer 3s ease-in-out infinite',
  },
}
```

**Legendary (Gold Border + Animated Particles):**
```typescript
{
  borderWidth: 4,
  borderColor: '#C9A857',  // Desaturated gold
  backgroundColor: colors.background.secondary,
  shadow: shadows.xl,
  
  // Particle effect
  particles: {
    count: 20,
    color: '#C9A857',
    size: 2-4px,
    animation: 'float 2s ease-in-out infinite',
  },
  
  // Shine effect
  shine: {
    animation: 'shine 2s ease-in-out infinite',
    gradient: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
  },
}
```

### Card States

**In Hand (Selectable):**
- Scale: 1.0
- Shadow: md
- Tap: Scale to 0.95, haptic light

**Selected (Pre-Battle):**
- Scale: 1.05
- Shadow: lg
- Border glows (pulsing animation)
- Haptic: medium

**During Battle (Flipping):**
- 3D flip animation (rotateY: 0→180deg)
- Spring physics
- Haptic: light on flip

**Winner (After Reveal):**
- Scale: 1.1
- Shadow: xl
- Glow effect (green tint)
- Particle burst
- Haptic: success

**Loser (After Reveal):**
- Scale: 0.95
- Opacity: 0.7
- Grayscale filter
- No animation

---

## 🏆 Manufacturer Perks (Passive Abilities)

### Intamin
**"High Risk, High Reward"**
- +1 to Speed stat
- 20% chance card "breaks down" (auto-loses round)
- Visual: Lightning bolt icon

### RMC (Rocky Mountain Construction)
**"Airtime Kings"**
- +2 to Intensity stat
- Visual: Airtime hill icon

### B&M (Bolliger & Mabillard)
**"Swiss Precision"**
- +1 to all stats
- Immune to "breakdown" effects
- Visual: Swiss cross icon

### Arrow Dynamics
**"Classic Chaos"**
- +1 to Intensity
- -1 to Speed (old tech)
- Visual: Vintage badge

### Vekoma (Modern)
**"Balanced"**
- +1 to stat that would win the round (smart perk)
- Visual: Balance scale icon

### Mack Rides
**"Innovation"**
- Can swap one stat with another before reveal (player chooses)
- Visual: Gear icon

### GCI/Gravity Group (Wooden)
**"Timeless"**
- +2 to Intensity in Round 3 only
- Visual: Wood grain texture

### Giovanola
**"Rare Breed"**
- +1 to Height
- Visual: Mountain icon

---

## 🎮 Battle Screen Layout

### Deck Selection Screen (Pre-Battle)

```
┌─────────────────────────────────────────┐
│  Select Your Battle Deck (3 Cards)     │
│                  [Start Battle]         │
├─────────────────────────────────────────┤
│                                         │
│  [Your Collection]                      │
│                                         │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐      │
│  │Card │ │Card │ │Card │ │Card │      │ ← Scrollable
│  │  1  │ │  2  │ │  3  │ │  4  │      │   horizontal
│  └─────┘ └─────┘ └─────┘ └─────┘      │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Selected Deck:                   │   │
│  │ ┌─────┐ ┌─────┐ ┌─────┐         │   │
│  │ │Fury │ │Steel│ │Velo │         │   │ ← Selected 3
│  │ │ 325 │ │Veng.│ │coast│         │   │
│  │ └─────┘ └─────┘ └─────┘         │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Battle Screen (During Round)

```
┌─────────────────────────────────────────┐
│  Round 1: HEIGHT                        │
│  You: 0  |  Opponent: 0                 │
├─────────────────────────────────────────┤
│                                         │
│  [Opponent's Card - Face Down]          │
│  ┌─────────────┐                        │
│  │     ???     │                        │
│  │             │                        │
│  │   HIDDEN    │                        │
│  └─────────────┘                        │
│                                         │
│  ─────── VS ───────                     │
│                                         │
│  [Your Card - Face Up]                  │
│  ┌─────────────┐                        │
│  │ Fury 325    │                        │
│  │ HEIGHT: 9   │ ← Stat being compared  │
│  │ SPEED:  9   │                        │
│  │ INTENSITY:7 │                        │
│  └─────────────┘                        │
│                                         │
│  [Reveal]                               │
└─────────────────────────────────────────┘
```

### After Reveal

```
┌─────────────────────────────────────────┐
│  Round 1: HEIGHT                        │
│  You: 1  |  Opponent: 0   ← Updated    │
├─────────────────────────────────────────┤
│                                         │
│  [Opponent's Card]                      │
│  ┌─────────────┐                        │
│  │ Millennium  │                        │
│  │ Force       │                        │
│  │ HEIGHT: 8   │ ← Lost (9 > 8)        │
│  └─────────────┘                        │
│  Opacity: 0.7 (loser)                   │
│                                         │
│  ──── YOU WIN ────                      │
│                                         │
│  [Your Card]                            │
│  ┌─────────────┐                        │
│  │ Fury 325    │                        │
│  │ HEIGHT: 9   │ ← Won!                │
│  └─────────────┘                        │
│  Scale: 1.1, glow effect (winner)       │
│                                         │
│  [Next Round →]                         │
└─────────────────────────────────────────┘
```

---

## 🎯 User Flow

### 1. Collection Management

**Viewing Collection:**
- Grid view of all 50 cards
- Locked cards show silhouette + "???"
- Tap card to view details
- Filter by: Rarity, Manufacturer, Owned/Unowned

**Unlocking Cards:**
- Win battles → Earn coins
- Open card packs (100 coins each)
- Each pack contains 3 random cards
- Daily free pack

### 2. Deck Building

1. Tap "Battle" from Games Hub
2. "Select Your Deck" screen appears
3. Scroll through collection (horizontal carousel)
4. Tap 3 cards to add to deck
5. Selected cards appear in "Selected Deck" area
6. Tap "Start Battle" (requires 3 cards)

### 3. Matchmaking

1. Finding opponent... (loading spinner)
2. "Opponent Found!" (success haptic)
3. Opponent profile shown briefly:
   - Username
   - Win/Loss record
   - Rank
4. Auto-transitions to Battle Screen

### 4. Battle

**Round 1:**
1. "Round 1: HEIGHT" appears
2. Both cards flip simultaneously (3D animation)
3. Stats compare (height vs height)
4. Winner announced ("YOU WIN" or "OPPONENT WINS")
5. Score updates (You: 1 | Opponent: 0)
6. 2-second pause
7. "Next Round" button appears

**Round 2:**
- Same process, comparing Speed

**Round 3:**
- Same process, comparing Intensity
- If score is 2-0, match ends early (no need for Round 3)

### 5. Victory/Defeat

**Victory Screen:**
```
┌─────────────────────────┐
│    🎉 VICTORY! 🎉       │
│                         │
│   You Won 2-1           │
│                         │
│   +50 Coins             │
│   +10 XP                │
│                         │
│   [Play Again]          │
│   [View Collection]     │
│   [Return to Games Hub] │
└─────────────────────────┘
```

**Defeat Screen:**
```
┌─────────────────────────┐
│      Defeat             │
│                         │
│   You Lost 1-2          │
│                         │
│   +10 Coins (Consolation)│
│   +5 XP                 │
│                         │
│   [Play Again]          │
│   [Adjust Deck]         │
│   [Return to Games Hub] │
└─────────────────────────┘
```

---

## 📊 Data Structure

### Card Object

```typescript
interface CoasterCard {
  id: string;
  name: string;
  park: string;
  country: string;
  manufacturer: Manufacturer;
  type: CoasterType;
  rarity: CardRarity;
  
  stats: {
    height: number;      // 1-10
    speed: number;       // 1-10
    intensity: number;   // 1-10
  };
  
  perk: ManufacturerPerk;
  imageUrl: string;
  isUnlocked: boolean;
}

enum CardRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

enum Manufacturer {
  INTAMIN = 'intamin',
  RMC = 'rmc',
  BM = 'b&m',
  ARROW = 'arrow',
  VEKOMA = 'vekoma',
  MACK = 'mack',
  GCI = 'gci',
  GIOVANOLA = 'giovanola',
}

interface ManufacturerPerk {
  name: string;
  description: string;
  icon: string;
  effect: PerkEffect;
}
```

### Battle State

```typescript
interface BattleState {
  id: string;
  playerDeck: CoasterCard[];    // 3 cards
  opponentDeck: CoasterCard[];  // 3 cards
  
  rounds: BattleRound[];         // Max 3 rounds
  currentRoundIndex: number;     // 0-2
  
  scores: {
    player: number;     // 0-2
    opponent: number;   // 0-2
  };
  
  status: BattleStatus;
  winner?: 'player' | 'opponent';
}

interface BattleRound {
  roundNumber: number;      // 1-3
  statCompared: 'height' | 'speed' | 'intensity';
  playerCard: CoasterCard;
  opponentCard: CoasterCard;
  winner: 'player' | 'opponent' | 'tie';
  playerScore: number;      // After perks applied
  opponentScore: number;
}

enum BattleStatus {
  DECK_SELECTION = 'deck_selection',
  MATCHMAKING = 'matchmaking',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}
```

---

## 🎨 Interaction Details

### Haptic Feedback

| Action | Haptic Type |
|--------|-------------|
| Select card for deck | `LIGHT` |
| Start battle | `MEDIUM` |
| Card flip (reveal) | `MEDIUM` |
| Win round | `SUCCESS` |
| Lose round | `ERROR` |
| Win match | `SUCCESS` (with confetti) |
| Lose match | `ERROR` |
| Unlock new card | `SUCCESS` |

### Animations

**Card Flip (3D):**
```typescript
const cardFlip = {
  transform: [
    {
      rotateY: withSpring('180deg', springs.smooth),
    },
  ],
  duration: 400,
};
```

**Winner Card Celebration:**
```typescript
const winnerAnimation = {
  scale: withSequence(
    withSpring(1.15, springs.bouncy),
    withSpring(1.1, springs.smooth),
  ),
  shadow: shadows.xl,
  glow: true,
};
```

**Pack Opening:**
```typescript
// Card pack opens like a booster pack
const packOpen = {
  transform: [
    { scale: withTiming(1.2, { duration: 300 }) },
    { rotateY: withTiming('180deg', { duration: 500 }) },
  ],
  opacity: withTiming(0, { duration: 300, delay: 500 }),
};

// Cards fly out
const cardsReveal = {
  translateY: withSpring(-100, springs.bouncy),
  translateX: // Stagger horizontally
  opacity: withTiming(1, { duration: 300 }),
  rotation: withSpring(random(-15, 15), springs.bouncy),
};
```

---

## ♿ Accessibility

### VoiceOver

```typescript
<Card
  accessibilityLabel={`${card.name}, ${card.rarity} rarity. Height ${card.stats.height}, Speed ${card.stats.speed}, Intensity ${card.stats.intensity}. ${card.perk.description}`}
  accessibilityRole="button"
  accessibilityHint="Double tap to select for your battle deck"
/>
```

### High Contrast

- Increase border width on cards
- Add patterns to rarity borders (not just color)
- Higher contrast stat bars

---

## 🔧 Implementation Notes

### Card Pack Algorithm

```typescript
const openCardPack = (): CoasterCard[] => {
  const packSize = 3;
  const cards: CoasterCard[] = [];
  
  for (let i = 0; i < packSize; i++) {
    const rarity = rollRarity();
    const card = getRandomCardByRarity(rarity);
    cards.push(card);
  }
  
  return cards;
};

const rollRarity = (): CardRarity => {
  const roll = Math.random();
  
  if (roll < 0.50) return CardRarity.COMMON;    // 50%
  if (roll < 0.80) return CardRarity.RARE;      // 30%
  if (roll < 0.95) return CardRarity.EPIC;      // 15%
  return CardRarity.LEGENDARY;                  // 5%
};
```

---

## 📝 Claude Code Instructions

**Your Task:** Build the simplified TCG following this README.

**Priority Order:**

1. **50-card database**
   - Create all 50 coaster cards
   - Assign stats (balanced)
   - Assign rarities
   - Assign manufacturer perks

2. **Collection screen**
   - Grid view
   - Lock/unlock system
   - Card detail view

3. **Deck builder**
   - Select 3 cards
   - Visual feedback

4. **Battle system**
   - 3 rounds (height, speed, intensity)
   - Simultaneous reveal
   - Winner calculation

5. **Card visual design**
   - Gorgeous card UI
   - Rarity effects (holo, particles)
   - Animations

6. **Rewards system**
   - Coins for wins
   - Card packs
   - Unlock progression

**Critical:**
- ✅ Cards must be BEAUTIFUL (focus on visuals)
- ✅ Holographic/particle effects on high-rarity cards
- ✅ Fast matches (60 seconds average)
- ✅ Balanced stats (no perfect card)

---

**Make these cards gorgeous collectors' items! 🃏✨**
