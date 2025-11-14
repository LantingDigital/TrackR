# Higher or Lower Game - Testing Guide

## Manual Testing Checklist

### Game Flow Tests
- [ ] Game loads with two coasters displayed
- [ ] Left card shows stat value (revealed)
- [ ] Right card shows "???" (hidden)
- [ ] Current stat indicator displays correct stat and icon
- [ ] Streak starts at 0
- [ ] Score starts at 0

### Stat Rotation Tests (Critical!)
Test that all 4 stats work correctly in rotation:

1. **HEIGHT (📏)**
   - Example: "205 ft"
   - First stat shown

2. **SPEED (⚡)**
   - Example: "95 mph"
   - Second stat shown

3. **INVERSIONS (🔄)**
   - Example: "4"
   - Third stat shown

4. **YEAR (📅)**
   - Example: "2018"
   - Fourth stat shown, then loops back to HEIGHT

### Guess Tests

#### CORRECT Guess
- [ ] Press HIGHER or LOWER button
- [ ] Right card flips and reveals stat (300ms animation)
- [ ] Green border flashes on both cards (if correct)
- [ ] Success haptic triggers
- [ ] Score increases by 100 × (1 + streak/10)
- [ ] Streak increments by 1
- [ ] Wait 1 second
- [ ] Right card slides left, becomes new left card
- [ ] New card appears on right (hidden)
- [ ] Stat rotates to next type
- [ ] Buttons re-enable

#### WRONG Guess
- [ ] Press HIGHER or LOWER button
- [ ] Right card flips and reveals stat (300ms animation)
- [ ] Red border flashes on both cards
- [ ] Error haptic triggers
- [ ] Wait 1 second
- [ ] Game Over modal appears

### Game Over Modal Tests
- [ ] Shows final streak with 🔥 emoji
- [ ] Shows total score
- [ ] Shows "NEW HIGH SCORE!" badge if applicable
- [ ] Shows all-time stats:
  - Highest Streak
  - Games Played
  - Best Score
- [ ] "PLAY AGAIN" button restarts game
- [ ] "BACK TO GAMES HUB" button navigates back

### Animation Tests
- [ ] Card flip animation is smooth (3D perspective)
- [ ] Border flash animation is visible
- [ ] Button press scale animation (0.95)
- [ ] All animations use spring physics
- [ ] No jank or stuttering

### Scoring Tests
Test that scoring formula works:
- Streak 0: 100 × 1.0 = 100 points
- Streak 5: 100 × 1.5 = 150 points
- Streak 10: 100 × 2.0 = 200 points
- Streak 20: 100 × 3.0 = 300 points

### Edge Cases
- [ ] No coaster repeats in first 10 rounds
- [ ] Stats with same value (e.g., both 100 ft) - HIGHER should succeed
- [ ] Stats with same value - LOWER should succeed
- [ ] All 4 stat types cycle correctly
- [ ] Game doesn't break after 40+ rounds (entire database)

### Visual Tests
- [ ] 8px grid spacing everywhere
- [ ] Cards use 16px border radius
- [ ] Buttons use 12px border radius
- [ ] Emoji lineHeight prevents clipping (30, 40, 50, 60)
- [ ] No text overflow
- [ ] Proper shadows on cards (md level)
- [ ] Proper shadows on buttons (md level)
- [ ] Proper shadows on modal (xl level)

### Accessibility Tests
- [ ] Minimum touch target 44pt (buttons are 64pt height)
- [ ] High contrast text (4.5:1 minimum)
- [ ] Haptic feedback on all interactions
- [ ] Visual feedback on all interactions

## Sample Gameplay Session

Round 1 (HEIGHT):
- Left: Steel Vengeance - 205 ft
- Right: Fury 325 - ???
- Guess: HIGHER
- Result: CORRECT (325 > 205)
- Score: 100, Streak: 1

Round 2 (SPEED):
- Left: Fury 325 - 95 mph
- Right: Space Mountain - ???
- Guess: LOWER
- Result: CORRECT (28 < 95)
- Score: 250, Streak: 2

Round 3 (INVERSIONS):
- Left: Space Mountain - 0
- Right: Steel Vengeance - ???
- Guess: HIGHER
- Result: CORRECT (4 > 0)
- Score: 370, Streak: 3

Round 4 (YEAR):
- Left: Steel Vengeance - 2018
- Right: The Beast - ???
- Guess: LOWER
- Result: CORRECT (1979 < 2018)
- Score: 500, Streak: 4

Round 5 (HEIGHT - looped back):
- Left: The Beast - 110 ft
- Right: Kingda Ka - ???
- Guess: HIGHER
- Result: CORRECT (456 > 110)
- Score: 640, Streak: 5

Continue until wrong guess...

## Known Issues
None currently - all features implemented!

## Future Enhancements
- Persist stats with AsyncStorage
- Add sound effects
- Add leaderboard
- Add daily challenge mode
- Add different difficulty modes (easier stats, harder stats)
