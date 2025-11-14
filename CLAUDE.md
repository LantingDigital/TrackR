# TrackR - Claude Development Reference

**Last Updated:** 2025-11-14
**Current Phase:** Phase 4 - Minigames Complete ✅

---

## Project Overview

**TrackR** is a React Native mobile app for roller coaster enthusiasts to log rides, track statistics, play daily games, and engage with the coaster community.

### Tech Stack
- **Framework:** React Native + Expo SDK ~50.0.0
- **Language:** TypeScript
- **Navigation:** React Navigation v6 (Stack)
- **Animations:** React Native Reanimated v3
- **State Management:** Context API (theme, haptics, auth)
- **Design System:** Custom component library with Material Design principles

---

## Phase Progress

### ✅ Phase 1: Foundation & Base Components (COMPLETE)
- Design system with theme provider
- Base components (Text, Button, Card, etc.)
- Hooks (useTheme, useHaptic, useReducedMotion, useAuth)
- Material Design shadows and 8px grid system

### ✅ Phase 2: Navigation Structure (COMPLETE)
- Bottom tab navigation (Home, Logger, Games Hub, Profile, Wallet)
- Stack navigation with proper TypeScript types
- Placeholder screens for all main sections

### ✅ Phase 3: Homescreen with Widgets (COMPLETE)
- Quick Action widgets (2×2 grid)
- Streak & Daily Games widget
- Last Logged Rides carousel
- News Feed widget
- Floating Action Button (FAB)
- **Key Achievement:** Resolved emoji rendering and layout issues

### ✅ Phase 4: Minigames Navigation & Headers (COMPLETE)
- Unified "MINIGAMES" header across all game screens (all caps, bold, letter spacing)
- Consistent game header layout: game name (left) + X button (right)
- Exit confirmation modals for all games (Trivia, Coastle, Trading Cards, Higher or Lower)
- Games Hub with back button navigation to main app
- Fullscreen presentation for all minigame screens
- **Key Achievement:** Consistent navigation UX across all minigames

### 🚧 Phase 5: Logger System (NEXT)
- Weighted criteria ride logging system
- Park/coaster selection
- Rating with multiple criteria
- Photo uploads
- Notes and tags

---

## Design Principles

### 1. **8px Grid System**
All spacing MUST follow the 8px grid:
- **Small gaps:** 8px, 12px
- **Medium spacing:** 16px, 24px
- **Large spacing:** 32px, 40px

### 2. **4-Section Horizontal Spacing**
The screen is divided into 4 horizontal sections with consistent 16px edge padding:
- ScrollView: `padding: 16px`
- Full-width elements: No additional horizontal padding
- Cards/widgets: Inherit from parent container

### 3. **Border Radius Consistency**
- **Large widgets:** `borderRadius: 16px`
- **Medium components:** `borderRadius: 14px`
- **Small elements:** `borderRadius: 12px`
- **Buttons:** `borderRadius: 12px`

### 4. **Emoji Rendering (CRITICAL)**
React Native Text clips emojis by default. Always add `lineHeight` to emoji text:

```typescript
// ✅ CORRECT - Emoji won't clip
<Text style={{ fontSize: 32, lineHeight: 40 }}>🎢</Text>

// ❌ WRONG - Emoji will clip at top
<Text style={{ fontSize: 32 }}>🎢</Text>
```

**Rule of thumb:** `lineHeight = fontSize × 1.25` (minimum 1.2x)

### 5. **Aspect Ratios**
- **Quick Action widgets:** `aspectRatio: 16 / 9` (landscape rectangles)
- **Game icons:** `aspectRatio: 1` (squares)
- **Ride cards:** Fixed width (180px) with flexible height

### 6. **No Overflow Hidden on Emoji Containers**
Avoid `overflow: 'hidden'` on containers with emoji content - use proper lineHeight instead to prevent clipping while maintaining rounded corners.

---

## Key Files & Architecture

### Core Structure
```
src/
├── components/
│   ├── base/           # Atomic components (Text, Button, Card)
│   └── widgets/        # Homescreen widgets
├── screens/            # Screen components
├── navigation/         # Navigation config & types
├── hooks/              # Custom hooks
├── contexts/           # React Context providers
├── theme/              # Design tokens
└── types/              # TypeScript definitions
```

### Important Files

#### **src/components/widgets/QuickActionWidget.tsx**
- Landscape rectangle widgets (16:9)
- Simple icon + background color
- No Widget wrapper (direct View component)
- Uses `flex: 1` within row layout

#### **src/components/widgets/StreakWidget.tsx**
- Header layout: "Daily Games" (left) + "Streak: X 🔥" (right)
- 4 game icons in horizontal row
- All icons same size (32px with lineHeight: 40)
- Opacity: 1.0 (completed), 0.4 (incomplete)

#### **src/components/widgets/RidesCarouselWidget.tsx**
- Horizontal scrolling carousel
- Card width: 180px
- Snap to interval: `180 + 12` (card width + gap)
- Image placeholder with TOP border radius matching parent

#### **src/components/widgets/NewsFeedWidget.tsx**
- Vertical list of articles
- NO horizontal padding (inherits from ScrollView)
- Each card has full shadow and rounded corners

#### **src/components/widgets/Widget.tsx**
- Base pressable widget with animations
- Spring animations: scale (0.97) + shadow on press
- NO `overflow: 'hidden'` in styles
- Respects reduced motion preferences

#### **src/screens/HomeScreen.tsx**
- Main container: ScrollView with `padding: 16`
- Quick Actions: Explicit 2-row structure (NO flexWrap)
- FAB: Positioned at `bottom: 24, right: 16`

---

## Common Patterns & Solutions

### Flexbox Layout for 2×2 Grid
```typescript
// ✅ CORRECT - Explicit rows
<View style={styles.widgetGridContainer}>
  <View style={styles.widgetRow}>
    <QuickActionWidget {...props1} />
    <QuickActionWidget {...props2} />
  </View>
  <View style={styles.widgetRow}>
    <QuickActionWidget {...props3} />
    <QuickActionWidget {...props4} />
  </View>
</View>

const styles = StyleSheet.create({
  widgetGridContainer: {
    marginBottom: 32,
    gap: 8,
  },
  widgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
});

// ❌ WRONG - flexWrap causes layout issues
<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
  {/* widgets */}
</View>
```

### Rounded Corners with Background Children
```typescript
// ✅ CORRECT - Child matches parent radius
<View style={{ borderRadius: 16 }}>
  <View style={{
    backgroundColor: 'blue',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  }}>
    {/* content */}
  </View>
</View>

// ❌ WRONG - Child covers parent corners
<View style={{ borderRadius: 16 }}>
  <View style={{ backgroundColor: 'blue' }}>
    {/* content - will cover rounded top */}
  </View>
</View>
```

### Emoji Text Rendering
```typescript
// ✅ CORRECT - All emoji sizes used in app
<Text style={{ fontSize: 24, lineHeight: 30 }}>📝</Text>  // FAB
<Text style={{ fontSize: 28, lineHeight: 36 }}>🔍</Text>  // Quick Actions
<Text style={{ fontSize: 32, lineHeight: 40 }}>🎢</Text>  // Game Icons
<Text style={{ fontSize: 40, lineHeight: 50 }}>🎢</Text>  // Ride Cards
```

### Avoiding Double Padding
```typescript
// ✅ CORRECT - Only outer container has padding
<ScrollView contentContainerStyle={{ padding: 16 }}>
  <View style={{ marginBottom: 24 }}>  // Use margin, not padding
    <Text>Content</Text>
  </View>
</ScrollView>

// ❌ WRONG - Padding at multiple levels
<ScrollView contentContainerStyle={{ padding: 16 }}>
  <View style={{ paddingHorizontal: 16 }}>  // Creates double padding
    <Text>Content</Text>
  </View>
</ScrollView>
```

### Minigames Navigation Pattern
```typescript
// Navigation header configuration (RootNavigator.tsx)
<Stack.Screen
  name="GameName"
  component={GameScreen}
  options={{
    ...modalOptions,
    title: 'MINIGAMES',
    presentation: 'fullScreenModal',
    headerTitleStyle: {
      ...theme.typography.title3,
      color: theme.colors.text.primary,
      fontWeight: '700',
      letterSpacing: 1,
    },
  }}
/>

// Games Hub with custom back button (GamesHubScreen)
<Stack.Screen
  name="GamesHub"
  component={GamesHubScreen}
  options={({ navigation }) => ({
    ...modalOptions,
    title: 'MINIGAMES',
    presentation: 'fullScreenModal',
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>←</Text>
      </TouchableOpacity>
    ),
  })}
/>

// Individual game header (inside game screen)
<View style={styles.header}>
  <View style={styles.headerLeft}>
    <Text variant="title1">Game Name</Text>
  </View>
  <TouchableOpacity onPress={handleExitPress} style={styles.exitButton}>
    <Text>✕</Text>
  </TouchableOpacity>
</View>

// Exit confirmation modal pattern
<Modal visible={showExitModal} transparent animationType="fade">
  <View style={styles.modalOverlay}>
    <Animated.View entering={SlideInDown.springify()}>
      <Card>
        <Text>⚠️</Text>
        <Text variant="title2">Exit Game?</Text>
        <Text>Your progress will be lost. Are you sure?</Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity onPress={handleCancelExit}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleConfirmExit}>
            <Text>Exit Game</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </Animated.View>
  </View>
</Modal>
```

---

## Lessons Learned

### Phase 3 Homescreen Challenges

1. **flexWrap: 'wrap' Issue**
   - Problem: Caused unexpected layout with `flex: 1` children
   - Solution: Use explicit row containers instead

2. **Emoji Clipping**
   - Problem: Default Text lineHeight clips emoji glyphs
   - Solution: Always set `lineHeight: fontSize × 1.25`
   - Affects: All emoji text throughout app

3. **Double Padding**
   - Problem: ScrollView + Widget both adding horizontal padding
   - Solution: Only apply padding at ScrollView level

4. **Rounded Corner Coverage**
   - Problem: Child backgrounds covering parent's border radius
   - Solution: Apply matching border radius to child elements

5. **Aspect Ratio Confusion**
   - Problem: Multiple attempts with wrong ratios (3:2, 1:1)
   - Solution: 16:9 is standard landscape rectangle ratio

### Phase 4 Minigames Navigation Challenges

1. **Navigation Header Customization**
   - Problem: Needed custom back button while keeping navigation header
   - Solution: Use `headerLeft` in navigation options with custom component
   - Alternative: Could use `headerBackVisible: true` but loses fullscreen presentation

2. **Fullscreen vs Modal Presentation**
   - Problem: `fullScreenModal` presentation hides default back button
   - Solution: Use custom `headerLeft` component for Games Hub
   - Individual games: Use `presentation: 'fullScreenModal'` without back button (only X to exit)

3. **Exit Confirmation Pattern**
   - Problem: Need to prevent accidental exits during gameplay
   - Solution: Intercept navigation with `beforeRemove` listener during active gameplay
   - Implementation: Show modal with Cancel/Exit options, only proceed if confirmed

4. **Vertical Spacing in Trivia Screen**
   - Problem: Content vertically centered with large gap below header
   - Solution: Remove `justifyContent: 'center'` from ScrollView, use minimal top padding (8px)

---

## Development Workflow

### Running the App
```bash
npx expo start --clear  # Start dev server
```

### File Naming Conventions
- **Components:** PascalCase with `.tsx` extension
- **Screens:** `ScreenName.tsx` with `Screen` suffix
- **Hooks:** `useFunctionName.ts` (lowercase 'use')
- **Types:** `types.ts` or inline with component

### Git Commit Messages (if needed)
- `feat:` New features
- `fix:` Bug fixes
- `refactor:` Code restructuring
- `style:` UI/styling changes
- `docs:` Documentation updates

---

## Phase 4 Planning: Logger System

### Overview
Implement weighted criteria ride logging with park/coaster selection.

### Key Features
- [ ] Park search with autocomplete
- [ ] Coaster selection within park
- [ ] Multi-criteria rating system (thrill, smoothness, theming, etc.)
- [ ] Photo upload (camera + library)
- [ ] Notes and tags
- [ ] Date/time picker
- [ ] Save to user history

### Technical Considerations
- Form validation with proper TypeScript types
- Image compression before upload
- Local storage for drafts
- Optimistic UI updates
- Error handling and retry logic

---

## Mock Data & Placeholders

Currently using mock data for:
- Last logged rides (HomeScreen.tsx:127-149)
- News articles (HomeScreen.tsx:155-177)
- Streak data (HomeScreen.tsx:114-120)

**Note:** Emojis are temporary placeholders. Plan to replace with proper icon library (e.g., react-native-vector-icons or custom SVG icons) in future phase.

---

## Common Mistakes to Avoid

1. ❌ Using `flexWrap: 'wrap'` with `flex: 1` children
2. ❌ Forgetting `lineHeight` on emoji Text elements
3. ❌ Adding `overflow: 'hidden'` to emoji containers
4. ❌ Double padding at multiple container levels
5. ❌ Not matching child border radius to parent
6. ❌ Using aspect ratios other than 16:9 for Quick Actions
7. ❌ Spacing that doesn't follow 8px grid system

---

## References

- **Design System:** src/theme/index.ts
- **Navigation Types:** src/navigation/types.ts
- **Component Exports:** src/components/base/index.ts, src/components/widgets/index.ts
- **Hook Exports:** src/hooks/index.ts

---

## Questions for Future Sessions?

When continuing work on TrackR:
1. Review this document first
2. Check current phase status above
3. Follow established patterns and design principles
4. Ask clarifying questions before implementing new features
5. Test emoji rendering with proper lineHeight
6. Verify spacing follows 8px grid system

---

**Happy coding! 🎢**
