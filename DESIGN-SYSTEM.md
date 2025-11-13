# Design System - Roller Coaster Companion App

## 🎨 Philosophy

This design system is built on Apple's Human Interface Guidelines principles, adapted for a roller coaster enthusiast app. Every decision prioritizes **Clarity, Deference, and Depth** while ensuring **accessibility** and **delight**.

### Core Principles

1. **Clarity** - Every element is legible and easy to understand at a glance
2. **Deference** - The UI steps back to let coaster content take center stage
3. **Depth** - Visual layers and physics-based motion create spatial understanding
4. **Fluidity** - All interactions are Responsive, Interruptible, and Redirectable
5. **Harmony** - Visual, haptic, and audio feedback are perfectly synchronized

---

## 🎨 Color System

### Philosophy
Light mode with **desaturated colors** creates a calm, professional aesthetic that lets coaster photography and content shine. Colors are warm and inviting without being overwhelming.

### Base Colors

```typescript
export const colors = {
  // Backgrounds
  background: {
    primary: '#F8F7F5',      // Very light warm gray (main background)
    secondary: '#FEFDFB',    // Off-white (card background)
    tertiary: '#F3F2F0',     // Slightly darker for contrast
  },
  
  // Text Hierarchy
  text: {
    primary: '#1A1A1A',      // Near-black (headings, important text)
    secondary: '#3A3A3A',    // Dark gray (body text)
    tertiary: '#6B6B6B',     // Medium gray (captions, metadata)
    quaternary: '#9B9B9B',   // Light gray (placeholders, disabled)
  },
  
  // Primary Brand Colors (Desaturated)
  primary: {
    blue: '#5B7C99',         // Calm, professional
    purple: '#8B7B9E',       // Playful, unique
    teal: '#5C9A9A',         // Fresh, modern
    orange: '#C68B5A',       // Warm, energetic
  },
  
  // CTA/Accent (Same saturation as primary)
  accent: {
    blue: '#4A6B88',         // Slightly darker for CTAs
    purple: '#7A6A8D',
    teal: '#4B8989',
    orange: '#B57A49',
  },
  
  // Semantic Colors (Desaturated)
  semantic: {
    success: '#6B9B6B',      // Desaturated green
    warning: '#C9A857',      // Desaturated yellow/amber
    error: '#C96B6B',        // Desaturated red
    info: '#5B7C99',         // Desaturated blue (same as primary.blue)
  },
  
  // Game-Specific (Coastle)
  game: {
    correct: '#6B9B6B',      // Desaturated green
    close: '#C9A857',        // Desaturated yellow (arrows)
    wrong: '#C96B6B',        // Desaturated red
  },
  
  // Overlays & Effects
  overlay: {
    light: 'rgba(248, 247, 245, 0.9)',   // 90% opacity background
    medium: 'rgba(248, 247, 245, 0.7)',  // 70% opacity
    dark: 'rgba(26, 26, 26, 0.4)',       // 40% dark overlay
  },
  
  // Borders & Dividers
  border: {
    light: '#E8E7E5',        // Subtle borders
    medium: '#D8D7D5',       // More prominent borders
    dark: '#C8C7C5',         // Strong borders
  },
};
```

### Color Usage Guidelines

**DO:**
- Use `background.primary` for main screen backgrounds
- Use `background.secondary` for elevated card surfaces
- Use `text.primary` for headings and important information
- Use semantic colors for their intended purpose (success = green, error = red)

**DON'T:**
- Don't use pure black (#000000) - it's too harsh
- Don't mix primary brand colors in the same view (pick one per screen/section)
- Don't use semantic colors decoratively (green doesn't mean "go", it means "success")

---

## 📝 Typography System

### Font Family

```typescript
export const fonts = {
  // iOS System Font Stack
  primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  
  // Monospace (for code, numbers)
  mono: 'SF Mono, Menlo, Monaco, Courier, monospace',
};
```

### Type Scale (iOS-Inspired)

```typescript
export const typography = {
  // Display (Extra Large)
  display: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700' as const,  // Bold
    letterSpacing: 0.374,
  },
  
  // Title 1 (Large Titles)
  title1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
    letterSpacing: 0.364,
  },
  
  // Title 2 (Section Headers)
  title2: {
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '600' as const,  // Semibold
    letterSpacing: 0.352,
  },
  
  // Title 3 (Subsection Headers)
  title3: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600' as const,
    letterSpacing: 0.38,
  },
  
  // Headline (Emphasized Body)
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600' as const,
    letterSpacing: -0.408,
  },
  
  // Body (Standard Text)
  body: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400' as const,  // Regular
    letterSpacing: -0.408,
  },
  
  // Callout (Slightly Smaller)
  callout: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: -0.24,
  },
  
  // Subheadline (Metadata)
  subheadline: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
    letterSpacing: -0.078,
  },
  
  // Footnote (Small Text)
  footnote: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
    letterSpacing: -0.078,
  },
  
  // Caption 1 (Very Small)
  caption1: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '400' as const,
    letterSpacing: 0.066,
  },
  
  // Caption 2 (Tiny)
  caption2: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '400' as const,
    letterSpacing: 0.066,
  },
};
```

### Typography Usage Guidelines

| Element | Type Style | Use Case |
|---------|-----------|----------|
| Screen Titles | `title1` or `title2` | Main page headings |
| Section Headers | `title3` | Grouping content |
| Card Titles | `headline` | Individual item names |
| Body Text | `body` | Main content, descriptions |
| Metadata | `subheadline` | Dates, locations, secondary info |
| Captions | `caption1` | Small labels, helper text |

**Smart Text Handling:**
- Text must **NEVER** overflow or get cut off
- Containers auto-expand if content needs more space
- Use `numberOfLines` with ellipsis for intentional truncation
- Always test with long coaster names (e.g., "Twisted Colossus at Six Flags Magic Mountain")

---

## 📏 Spacing System

### 8px Grid Base

```typescript
export const spacing = {
  // Micro Spacing (4px increments)
  xxs: 4,
  xs: 8,
  
  // Standard Spacing (8px increments)
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 48,
  xxxl: 64,
};
```

### Spacing Usage

| Space | Value | Use Case |
|-------|-------|----------|
| `xxs` | 4px | Internal padding within small components |
| `xs` | 8px | Tight spacing, button padding |
| `sm` | 16px | Standard card padding, list item spacing |
| `md` | 24px | Section spacing, card margins |
| `lg` | 32px | Large gaps between major sections |
| `xl` | 40px | Extra large gaps |
| `xxl` | 48px | Screen padding top/bottom |
| `xxxl` | 64px | Spacious layouts |

### Layout Principles

1. **Consistent Padding:** All cards use `sm` (16px) internal padding
2. **Consistent Margins:** Cards are separated by `md` (24px) vertically
3. **Screen Margins:** Horizontal margins of `sm` (16px) from screen edges
4. **Touch Targets:** Minimum 44x44pt for all interactive elements

---

## 🎨 Border Radius System

### Varied by Component

```typescript
export const borderRadius = {
  // Small Elements
  xs: 4,
  sm: 8,
  
  // Medium Elements
  md: 12,
  lg: 16,
  
  // Large Elements
  xl: 20,
  xxl: 24,
  
  // Special
  full: 9999,  // Circular/pill shape
};
```

### Border Radius Usage

| Component | Radius | Value |
|-----------|--------|-------|
| Buttons | `sm` | 8px |
| Input Fields | `sm` | 8px |
| Small Badges | `sm` | 8px |
| Cards | `lg` | 16px |
| Large Cards | `xl` | 20px |
| Modals | `xxl` | 24px |
| Bottom Sheets | `xxl` | 24px (top corners only) |
| Avatar | `full` | Circular |
| Pills/Tags | `full` | Pill shape |

**Apple Harmony Principle:**
Match software corner radius to hardware. Since modern phones have ~20-24px corner radius on the physical device, our modals and full-screen elements use `xxl` (24px) to harmonize.

---

## 🌓 Shadow System

### 5-Level System

```typescript
export const shadows = {
  // XS - Subtle Lift
  xs: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  
  // SM - Small Elevation
  sm: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // MD - Medium Elevation (Default Card)
  md: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  
  // LG - High Elevation (Modals, Floating)
  lg: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
  
  // XL - Maximum Elevation (Alerts, Overlays)
  xl: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.20,
    shadowRadius: 24,
    elevation: 12,
  },
};
```

### Shadow Usage

| Component | Shadow | Use Case |
|-----------|--------|----------|
| Flat Cards | `sm` | Subtle depth |
| Standard Cards | `md` | Default elevation |
| Pressed Cards | `xs` | Reduces on press for feedback |
| Floating Action Button | `lg` | Prominent, always accessible |
| Modals | `lg` | Floats above content |
| Alerts/Toasts | `xl` | Demands attention |

### 3D Card Effect

For the signature "3D card" look:
1. Card uses `md` shadow in rest state
2. Card uses `background.secondary` (slightly darker than screen bg)
3. Card has `borderRadius.lg` (16px)
4. On press: Scale to 0.97 + reduce shadow to `xs` (physics-based spring)

---

## 🎭 Animation System

### Philosophy: Spring Physics Over Easing Curves

All animations use **spring-based physics** for natural, interruptible motion. No pre-programmed easing curves.

### Spring Presets

```typescript
export const springs = {
  // Gentle - Slow, smooth (modals, large movements)
  gentle: {
    damping: 20,
    stiffness: 120,
    mass: 1,
  },
  
  // Smooth - Balanced (default for most interactions)
  smooth: {
    damping: 15,
    stiffness: 180,
    mass: 0.8,
  },
  
  // Snappy - Quick, responsive (buttons, small interactions)
  snappy: {
    damping: 12,
    stiffness: 250,
    mass: 0.6,
  },
  
  // Bouncy - Playful (game elements, celebrations)
  bouncy: {
    damping: 10,
    stiffness: 200,
    mass: 0.8,
  },
};
```

### Animation Durations (Reference Only)

While springs don't have fixed durations, these values represent typical animation lengths:

```typescript
export const durations = {
  instant: 100,   // Immediate feedback
  fast: 200,      // Quick transitions
  normal: 300,    // Default
  slow: 400,      // Large movements
  slower: 500,    // Modal presentations
};
```

### Animation Principles

1. **Responsive:** Animation starts **immediately** on touch (no delay)
2. **Interruptible:** User can change direction mid-animation
3. **Redirectable:** User can reverse their action (e.g., start swipe-to-dismiss, then cancel)
4. **1-to-1:** Touch and content move together (direct manipulation)

### Common Animations

```typescript
export const animations = {
  // Button Press
  buttonPress: {
    scale: 0.97,
    spring: springs.snappy,
  },
  
  // Card Press
  cardPress: {
    scale: 0.97,
    shadowReduce: 'md → xs',
    spring: springs.snappy,
  },
  
  // Modal Present
  modalPresent: {
    translateY: 'screenHeight → 0',
    opacity: '0 → 1',
    spring: springs.gentle,
  },
  
  // List Item Appear (Stagger)
  listItemAppear: {
    translateY: '20 → 0',
    opacity: '0 → 1',
    spring: springs.smooth,
    stagger: 50, // ms between each item
  },
  
  // Pulse (Streak Badge)
  pulse: {
    scale: '1.0 → 1.05 → 1.0',
    duration: 2000,
    loop: true,
  },
};
```

### Accessibility: Reduced Motion

**CRITICAL:** All animations must respect `prefers-reduced-motion`.

```typescript
import { useReducedMotion } from '@/hooks/useReducedMotion';

const reducedMotion = useReducedMotion();

// If reduced motion is enabled, use instant transitions
const animationConfig = reducedMotion 
  ? { duration: 0 } 
  : springs.smooth;
```

---

## 🎮 Haptic Feedback System

### Haptic Types (iOS/Android)

```typescript
export enum HapticType {
  // Light
  LIGHT = 'light',           // Selection, toggle
  
  // Medium
  MEDIUM = 'medium',         // Button press
  
  // Heavy
  HEAVY = 'heavy',           // Important action
  
  // Selection
  SELECTION = 'selection',   // Picker, slider change
  
  // Impact
  IMPACT_LIGHT = 'impactLight',
  IMPACT_MEDIUM = 'impactMedium',
  IMPACT_HEAVY = 'impactHeavy',
  
  // Notification
  SUCCESS = 'notificationSuccess',
  WARNING = 'notificationWarning',
  ERROR = 'notificationError',
}
```

### Haptic Usage Guide

| Interaction | Haptic Type | Use Case |
|-------------|-------------|----------|
| Button Tap | `LIGHT` | Standard button press |
| Toggle Switch | `LIGHT` | On/off switch |
| Card Press | `MEDIUM` | Opening card detail |
| CTA Button | `MEDIUM` | Primary action |
| Delete Action | `HEAVY` | Destructive action |
| Slider Change | `SELECTION` | Adjusting weight slider |
| Pull-to-Refresh Trigger | `MEDIUM` | Refresh activates |
| Success (Log Saved) | `SUCCESS` | Confirmation |
| Error | `ERROR` | Something went wrong |
| Tab Switch | `LIGHT` | Bottom tab navigation |

### Haptic Principles

1. **Meaningful:** Every haptic has a purpose (feedback, confirmation, warning)
2. **Synchronized:** Haptic fires at exact moment of visual change
3. **Optional:** User can disable haptics in settings
4. **Consistent:** Same action = same haptic across the app

### Audio-Haptic Harmony

When combining sound + haptic:
- **Light haptic** = High-pitched sound (tap, click)
- **Medium haptic** = Mid-pitched sound (thud, pop)
- **Heavy haptic** = Low-pitched sound (boom, thump)

Visual weight should match haptic intensity:
- Small button (8px radius) = Light haptic
- Card press (16px radius) = Medium haptic
- Large modal dismiss = Heavy haptic

---

## 🖐️ Touch Targets & Gestures

### Minimum Touch Target

```typescript
export const touchTargets = {
  minimum: 44,  // 44x44pt minimum (Apple HIG)
  comfortable: 48,  // 48x48pt comfortable
  large: 56,  // 56x56pt for primary actions
};
```

### Common Gestures

```typescript
export const gestures = {
  // Tap
  tap: 'Single tap',
  doubleTap: 'Double tap (e.g., like post)',
  longPress: 'Long press (e.g., context menu)',
  
  // Swipe
  swipeLeft: 'Swipe left (e.g., delete)',
  swipeRight: 'Swipe right (e.g., archive)',
  swipeUp: 'Swipe up (e.g., dismiss modal)',
  swipeDown: 'Swipe down (e.g., pull-to-refresh)',
  
  // Pinch
  pinchToZoom: 'Pinch in/out (e.g., image zoom)',
  
  // Pan
  pan: 'Drag (e.g., reorder list items)',
};
```

### Gesture Principles

1. **Prefer System Gestures:** Use familiar iOS/Android patterns
2. **Provide Visual Feedback:** Show what gesture will do (e.g., list item shifts on swipe)
3. **Allow Cancellation:** User can reverse gesture mid-action
4. **Haptic Confirmation:** Haptic feedback when gesture threshold is reached

---

## 📦 Component Library Structure

### Base Components (Reusable)

```
shared/components/
├── Button.tsx              // Primary, Secondary, Ghost variants
├── Card.tsx                // 3D card with shadow
├── Input.tsx               // Text input with validation
├── Avatar.tsx              // User avatar (circular)
├── Badge.tsx               // Notification/streak badges
├── Chip.tsx                // Small tag/category pill
├── Divider.tsx             // Horizontal line separator
├── IconButton.tsx          // Icon-only button
├── ProgressBar.tsx         // Linear progress
├── ProgressRing.tsx        // Circular progress (Trivia timer)
├── Slider.tsx              // Range slider (Weight editor)
├── Switch.tsx              // Toggle switch
├── Tab.tsx                 // Tab bar item
├── Tag.tsx                 // Removable tag
└── Toast.tsx               // Toast notification
```

### Layout Components

```
shared/components/layout/
├── BottomSheet.tsx         // Modal from bottom (Logger)
├── Modal.tsx               // Full-screen modal (Wallet, Games)
├── Screen.tsx              // Screen wrapper with safe areas
├── ScrollView.tsx          // Enhanced scroll with physics
├── Section.tsx             // Grouped section with header
└── Stack.tsx               // Vertical/horizontal stack
```

### Composite Components (Feature-Specific)

Built from base components, documented in individual README files:
- `NewsCard` (Homescreen)
- `LoggerSearchBar` (Logger)
- `PostCard` (Social)
- `PassCard` (Wallet)
- `TripCard` (Trip Planner)
- `CoastleGrid` (Coastle Game)
- etc.

---

## 🎯 Accessibility Standards

### POUR Framework Compliance

Our design system follows WCAG 2.1 Level AA standards:

#### Perceivable
- ✅ Minimum contrast ratio 4.5:1 for text
- ✅ All interactive elements have visual + haptic feedback
- ✅ Icons have text labels or alt text
- ✅ Motion can be disabled (reduced motion)

#### Operable
- ✅ All touch targets minimum 44x44pt
- ✅ All gestures are simple and standard
- ✅ Keyboard navigation supported (where applicable)
- ✅ No time limits on interactions

#### Understandable
- ✅ Consistent navigation patterns
- ✅ Clear, simple language
- ✅ Error messages are helpful
- ✅ Logical information hierarchy

#### Robust
- ✅ VoiceOver/TalkBack support
- ✅ Dynamic type scaling
- ✅ Works in high contrast mode
- ✅ Semantic HTML/ARIA labels

### Dark Mode Support (Future)

While MVP is light mode only, the system is structured for easy dark mode addition:
- All colors use semantic names (not hex codes directly in components)
- Shadow system will invert (lighter shadows in dark mode)
- Typography contrast will adjust

---

## 🛠️ Implementation with TypeScript

### Theme Object Structure

```typescript
// theme.ts
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { borderRadius } from './borderRadius';
import { shadows } from './shadows';
import { springs } from './springs';

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  springs,
  
  // Derived values
  touchTarget: {
    minimum: 44,
    comfortable: 48,
    large: 56,
  },
};

export type Theme = typeof theme;
```

### Usage in Components

```typescript
import { theme } from '@/theme';

const Button = styled.Pressable`
  background-color: ${theme.colors.primary.blue};
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.sm}px;
  shadow-color: ${theme.shadows.md.shadowColor};
  shadow-offset: ${theme.shadows.md.shadowOffset};
  shadow-opacity: ${theme.shadows.md.shadowOpacity};
  shadow-radius: ${theme.shadows.md.shadowRadius};
  elevation: ${theme.shadows.md.elevation};
  min-height: ${theme.touchTarget.minimum}px;
  min-width: ${theme.touchTarget.minimum}px;
`;
```

---

## ✅ Design System Checklist

When creating new components, ensure:

- [ ] Uses theme tokens (no hardcoded colors/spacing)
- [ ] Minimum touch target 44x44pt
- [ ] Spring-based animations (no easing curves)
- [ ] Haptic feedback on interactions
- [ ] Respects reduced motion preference
- [ ] Text never overflows (auto-expand containers)
- [ ] Consistent border radius per component type
- [ ] Appropriate shadow level for elevation
- [ ] VoiceOver labels (accessibility)
- [ ] High contrast (4.5:1 minimum)
- [ ] TypeScript types defined
- [ ] Follows Apple's Clarity, Deference, Depth principles

---

## 🎓 Resources

### Internal Documentation
- See individual README files for feature-specific components
- Review Apple UX Methodology document for interaction patterns

### External References
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) (for spring physics)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**This design system is living documentation. It evolves as we build, but these core principles remain constant.**
