# TrackR Trading Card Game

**Status:** ✅ Production-Ready
**Last Updated:** 2025-11-13
**Phase:** Phase 5C - Complete

---

## Overview

A complete, production-ready **Trading Card Game** featuring 50 curated famous roller coasters as collectible cards. Players build 3-card decks and battle using a stat-based system with manufacturer perks.

### Key Features

- 🃏 **50 Curated Coaster Cards** - Balanced stats with 4 rarity tiers
- ⚔️ **3-Round Battle System** - Height vs Speed vs Intensity
- ✨ **Gorgeous Visual Effects** - Holographic, shimmer, and particle effects
- 🏭 **Manufacturer Perks** - 8 unique manufacturer abilities
- 📦 **Pack Opening** - Exciting animation with spring physics
- 📚 **Collection Management** - Grid view with filtering

---

## File Structure

```
src/screens/games/trading-card/
├── types.ts                  # TypeScript definitions
├── cardData.ts               # 50 curated coaster cards
├── battleLogic.ts            # Battle calculations & perks
├── cardEffects.tsx           # Visual effects (holo, particles, etc.)
├── CardDisplay.tsx           # Main card component ⭐
├── CardBattle.tsx            # 3-round battle screen
├── CardCollection.tsx        # Collection grid view
├── PackOpening.tsx           # Pack opening animation
├── TradingCardScreen.tsx     # Main hub screen
├── index.ts                  # Module exports
└── README.md                 # This file
```

---

## Card System

### Card Dimensions
```typescript
{
  width: 280,
  height: 400,
  borderRadius: 16,
  aspectRatio: 0.7, // Portrait card
}
```

### Card Layout
```
┌────────────────────────────────┐
│  [Coaster Photo - Full Bleed]  │  ← Top 50% (200px)
│                                 │
│  ╔═══════════════════════════╗ │
│  ║ Fury 325              [9] ║ │  ← Name + Overall rating
│  ║ Carowinds • B&M Giga      ║ │  ← Park • Type
│  ╠═══════════════════════════╣ │
│  ║ HEIGHT:    9 ▓▓▓▓▓▓▓▓▓░  ║ │  ← Stat bars (1-10)
│  ║ SPEED:     9 ▓▓▓▓▓▓▓▓▓░  ║ │
│  ║ INTENSITY: 7 ▓▓▓▓▓▓▓░░░  ║ │
│  ╠═══════════════════════════╣ │
│  ║ 🎯 [B&M]: Swiss Precision ║ │  ← Manufacturer perk
│  ╚═══════════════════════════╝ │
└────────────────────────────────┘
```

### Rarity System

**Distribution Across 50 Cards:**
- **Common:** 20 cards (40%) - Light gray border
- **Rare:** 15 cards (30%) - Blue border + subtle glow
- **Epic:** 10 cards (20%) - Purple border + shimmer effect
- **Legendary:** 5 cards (10%) - Gold border + holographic effect + particles

**Pack Drop Rates:**
- Common: 50%
- Rare: 30%
- Epic: 15%
- Legendary: 5%

### Stats (1-10 Scale)

**Height:**
- 1-2: <100 feet
- 3-4: 100-150 feet
- 5-6: 150-250 feet
- 7-8: 250-350 feet
- 9: 350-450 feet
- 10: 450+ feet

**Speed:**
- 1-2: <40 mph
- 3-4: 40-55 mph
- 5-6: 55-70 mph
- 7-8: 70-85 mph
- 9: 85-100 mph
- 10: 100+ mph

**Intensity:**
- 1-2: Family-friendly
- 3-4: Mild thrills
- 5-6: Good thrills
- 7-8: Intense G-forces
- 9: Extreme intensity
- 10: Borderline dangerous

---

## Manufacturer Perks

### Intamin - "Launch Master"
- **Bonus:** Speed +1
- **Icon:** 🚀

### RMC - "Airtime Kings"
- **Bonus:** Intensity +2
- **Icon:** ⚡

### B&M - "Swiss Precision"
- **Bonus:** All stats +1
- **Icon:** 🎯

### Arrow - "Classic Chaos"
- **Bonus:** Intensity +1, Speed -1
- **Icon:** 🏛️

### Vekoma - "Underdog"
- **Bonus:** +1 to stat that would win round (conditional)
- **Icon:** 🦾

### Mack - "Innovation"
- **Bonus:** Height +1
- **Icon:** ⚙️

### GCI - "Timeless"
- **Bonus:** Intensity +2 in Round 3 only (conditional)
- **Icon:** 🌲

### Giovanola - "Rare Breed"
- **Bonus:** Height +1
- **Icon:** ⛰️

---

## Battle System

### 3-Round Format

**Round 1:** Height vs Height
**Round 2:** Speed vs Speed
**Round 3:** Intensity vs Intensity

- Best 2 out of 3 wins
- Manufacturer perks apply to stats
- Simultaneous card reveals

### Battle Rewards

**Win:**
- +50 Coins
- +10 XP

**Loss:**
- +10 Coins (consolation)
- +5 XP

---

## Visual Effects

### Common Cards
- 2px light gray border
- Standard shadow

### Rare Cards
- 3px blue border
- Medium shadow
- Subtle glow effect (pulsing)

### Epic Cards
- 4px purple border
- Large shadow
- Shimmer effect (animated gradient sweep)
- Glow effect (pulsing)

### Legendary Cards ⭐ (MAKE IT STUNNING)
- 4px gold border
- Extra large shadow
- **Holographic effect** (rainbow gradient rotation)
- **Floating particles** (15 gold particles)
- **Shine effect** (periodic shine sweep)
- **Glow effect** (pulsing gold glow)

---

## Component Details

### CardDisplay.tsx

**THE signature component** - Must look absolutely gorgeous.

**Features:**
- Rarity-based border colors and widths
- Stat bars with visual fill (out of 10)
- Manufacturer perk display
- Overall rating badge
- Locked state for uncollected cards
- Flipped state for card back
- Spring-based press animation

**Usage:**
```tsx
<CardDisplay
  card={coasterCard}
  scale={1.0}
  showStats={true}
  isFlipped={false}
  onPress={() => handleCardPress(card)}
/>
```

### CardBattle.tsx

3-round battle with animated reveals.

**Phases:**
1. `ready` - Player can reveal cards
2. `revealing` - Cards flip animation
3. `round_result` - Show winner with stat highlight
4. `battle_complete` - Final results and rewards

**Features:**
- Simultaneous card reveal animation
- Stat highlighting (green = win, red = lose)
- Score tracking
- Haptic feedback on reveals
- Winner celebration screen

### CardCollection.tsx

Grid view of all 50 cards.

**Features:**
- Filter by: All, Owned, Locked, Common, Rare, Epic, Legendary
- Collection stats (total cards, legendaries, completion %)
- Locked card silhouettes
- Tap to view full card details

### PackOpening.tsx

Exciting pack opening animation.

**Features:**
- Tap sealed pack to open
- Pack explosion animation
- 3 cards fly out with spring physics
- Staggered reveals (200ms delay)
- Tap individual cards to enlarge
- Legendary card triggers success haptic

### TradingCardScreen.tsx

Main hub with collection management.

**Sections:**
1. **Player Stats** - Coins, XP, Cards, Legendaries
2. **Quick Actions** - Battle, Collection, Buy Pack
3. **Featured Cards** - Horizontal scroll of legendary cards
4. **How to Play** - Game rules

**Screens:**
- `hub` - Main hub
- `deck_builder` - Select 3 cards
- `battle` - 3-round battle
- `collection` - View all cards
- `pack_opening` - Open new packs

---

## Data Files

### cardData.ts

**50 Curated Coasters:**

**Legendary (5):**
1. Fury 325 (B&M Giga)
2. Steel Vengeance (RMC Hybrid)
3. Velocicoaster (Intamin Launched)
4. Intimidator 305 (Intamin Giga)
5. X2 (Arrow 4D)

**Epic (10):**
- Millennium Force
- Lightning Rod
- Maverick
- Twisted Colossus
- Top Thrill 2
- Phoenix
- The Voyage
- Montu
- Iron Gwazi
- Hagrid's Magical Creatures

**Rare (15):**
- Banshee
- Goliath (SFMM)
- Orion
- Storm Chaser
- Skyrush
- Diamondback
- Expedition Everest
- Outlaw Run
- Mako
- Blue Fire
- Wicked Cyclone
- Afterburn
- Copperhead Strike
- Zadra
- GateKeeper

**Common (20):**
- Raptor
- Thunderhead
- Mind Bender
- Mystic Timbers
- Alpengeist
- Goliath (SFGAm)
- Tennessee Tornado
- Griffon
- Time Traveler
- Apollo's Chariot
- Verbolten
- InvadR
- Loch Ness Monster
- Titan
- Carolina Cyclone
- Thunderbolt
- Kumba
- Patriot
- Powder Keg
- Wild Eagle

### battleLogic.ts

**Functions:**
- `applyManufacturerPerk()` - Apply perk bonuses to stats
- `calculateRoundWinner()` - Compare stats and determine winner
- `playBattle()` - Run complete 3-round battle
- `determineBattleWinner()` - Best of 3 winner
- `generateOpponentDeck()` - Create random opponent deck

---

## Design System Compliance

### ✅ 8px Grid System
- Card padding: 16px
- Stat bar gaps: 8px
- Card grid: 16px gaps

### ✅ Emoji Rendering
```tsx
// Manufacturer perk icons
<Text style={{ fontSize: 20, lineHeight: 26 }}>🚀</Text>
```

### ✅ Spring Animations
- Card press: Scale to 0.97
- Pack opening: Bouncy spring physics
- Card reveals: Staggered springs

### ✅ Haptic Feedback
- Card select: `LIGHT`
- Battle reveal: `MEDIUM`
- Win round: `SUCCESS`
- Lose round: `ERROR`
- Pack open: `HEAVY`
- Legendary reveal: `SUCCESS`

### ✅ Border Radius
- Cards: 16px
- Stat bars: 4px
- Buttons: 8px

### ✅ Reduced Motion
All animations respect `useReducedMotion()` hook.

---

## Testing Checklist

- [x] All 4 rarity levels have distinct visual styles
- [x] Legendary cards look STUNNING with holographic effect
- [x] Stat bars display correctly (filled portion)
- [x] Manufacturer perks apply correctly in battles
- [x] Battle rounds animate sequentially
- [x] Pack opening animation is exciting
- [x] Collection grid is responsive
- [x] All spacing follows 8px grid
- [x] Haptic feedback on all interactions
- [x] Card flip animation is smooth
- [x] Emoji icons display correctly (lineHeight set)

---

## Known Limitations

1. **No Image Support Yet** - Cards use emoji placeholders (🎢) instead of actual coaster photos
2. **No Persistence** - Collection resets on app restart (needs local storage/backend)
3. **No Multiplayer** - Opponent decks are randomly generated
4. **No Trading** - Player-to-player trading not implemented
5. **Linear Gradient** - React Native doesn't support CSS gradients natively (using opacity workaround)

---

## Future Enhancements

1. **Real Coaster Images** - Add high-quality photos for each card
2. **Persistence Layer** - Save collection to AsyncStorage or backend
3. **Multiplayer Battles** - Real-time battles with other players
4. **Trading System** - Player-to-player card trading
5. **Daily Quests** - Earn cards through challenges
6. **Card Upgrades** - Power up your favorite cards
7. **Deck Slots** - Save multiple deck configurations
8. **Battle History** - View past battle results
9. **Achievements** - Collection milestones and badges
10. **Animated Card Backs** - Custom card back designs

---

## Integration

### Import
```tsx
import { TradingCardScreen } from '@/screens/games/trading-card';
```

### Usage
```tsx
<TradingCardScreen onClose={() => navigation.goBack()} />
```

### Navigation
Already integrated with RootNavigator:
- Route: `TradingCardGame`
- Presentation: Full-screen modal
- Accessible from GamesHub

---

## Credits

- **Card Design:** Inspired by collectible card games (Hearthstone, Magic: The Gathering)
- **Visual Effects:** Custom React Native Reanimated animations
- **Coaster Data:** Curated selection of famous roller coasters worldwide
- **Manufacturer Perks:** Based on real coaster manufacturer characteristics

---

**THIS IS THE MOST VISUALLY IMPORTANT GAME** - Cards must look premium and collectors' items worthy! 🃏✨
