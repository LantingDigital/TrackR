# Complete App Sections - Master Reference

This document provides comprehensive specifications for all remaining app sections. Use in conjunction with DESIGN-SYSTEM.md and individual game READMEs.

---

## 📱 HOMESCREEN / NEWS FEED

### Layout Structure (Top to Bottom)

```
┌─────────────────────────────────────────┐
│  Header (80px height)                   │
│  "Welcome Back, Chris!" (title2)        │
│  🔥 5 Day Streak (subheadline)          │
├─────────────────────────────────────────┤
│  Quick Action Widgets (2×2 Grid)        │
│  ┌──────────┐ ┌──────────┐             │
│  │ Quick    │ │ Wallet   │             │
│  │ Add Ride │ │ Shortcut │             │
│  └──────────┘ └──────────┘             │
│  ┌──────────┐ ┌──────────┐             │
│  │ Games    │ │ Trip     │             │
│  │ Hub      │ │ Planner  │             │
│  └──────────┘ └──────────┘             │
├─────────────────────────────────────────┤
│  Streak & Game Overview Card            │
│  Daily Coastle: ✓ Complete              │
│  Daily Trivia: Not started              │
│  [Play Games →]                         │
├─────────────────────────────────────────┤
│  Last Logged Rides (Carousel)           │
│  ← [Card] [Card] [Card] →              │
├─────────────────────────────────────────┤
│  News Feed (Vertical Scroll)            │
│  ┌─────────────────────────────────┐   │
│  │ 📰 Breaking: New RMC at SFMM   │   │
│  │ [Image]                         │   │
│  │ Screamscape • 2 hours ago       │   │
│  └─────────────────────────────────┘   │
│  [More news cards...]                   │
└─────────────────────────────────────────┘
```

### Key Components

**1. Header**
- Background: Gradient (primaryGradientStart → primaryGradientEnd)
- Height: 80px
- Padding: 16px
- Border radius: 0 (full width) OR 20px bottom corners only
- Shadow: md
- Streak badge pulses (2s loop, scale 1.0 → 1.05 → 1.0)

**2. Quick Action Widgets**
- Size: 48% screen width each (2 per row with 4% gap)
- Height: 120px
- Border radius: 16px
- Background: background.secondary
- Shadow: lg (3D effect)
- Icon: 48×48px at top
- Text: headline typography
- **Smart Sizing:** Container auto-expands if text needs more space (CRITICAL)
- Press animation: Scale to 0.97 with spring
- Haptic: Light on tap

**Icons:**
- Quick Add: "+" in circle
- Wallet: Wallet icon
- Games: Controller icon
- Trip: Calendar icon

**3. Streak & Game Overview Card**
- Full width (margin 16px horizontal)
- Auto-height based on content
- Border radius: 16px
- Background: background.secondary
- Shadow: md
- Shows daily game completion status
- CTA button to Games Hub

**4. Last Logged Rides Carousel**
- Horizontal scroll, snap to center
- Card size: 85% screen width
- Card height: 200px
- Gap: 16px
- Shows 3 most recent logged rides

**Logged Ride Card:**
```typescript
{
  width: '85%',
  height: 200,
  borderRadius: borderRadius.xl (20px),
  shadow: shadows.lg,
  
  image: {
    height: 140,
    borderRadius: '20px 20px 0 0',
    gradientOverlay: 'transparent → rgba(26,26,26,0.8)',
  },
  
  content: {
    padding: spacing.sm (16px),
    coasterName: typography.headline,
    parkName: typography.subheadline,
    rating: typography.title3 + colors.semantic.warning,
  },
}
```

**5. News Feed**
- Vertical scroll
- Card per news item
- Full width (margin 16px)
- Margin bottom: 16px between cards

**News Card:**
```typescript
{
  width: '100% - 32px',  // 16px margin each side
  minHeight: 120,
  borderRadius: borderRadius.lg (16px),
  backgroundColor: colors.background.secondary,
  shadow: shadows.md,
  padding: spacing.sm (16px),
  
  layout: {
    emoji: '📰' (left, 24px),
    title: typography.title3 (2 line max, ellipsis),
    source: typography.caption1 + colors.text.tertiary,
    timestamp: typography.caption1 + colors.text.tertiary,
    image: 'optional, 200px height, rounded 12px',
    readMore: typography.body + colors.primary.blue,
  },
}
```

### Interactions

**Pull-to-Refresh:**
- Pull down from top
- Rubber band spring physics
- Spinner appears
- Haptic: Medium on trigger
- Fetches latest news

**Infinite Scroll:**
- Load 10 news items initially
- When scroll reaches bottom 200px, load next 10
- Loading indicator at bottom
- No more: "You're all caught up! 🎉"

### Data Structure

```typescript
interface HomeScreenState {
  user: {
    name: string;
    streakCount: number;
    streakActive: boolean;
  };
  
  dailyGames: {
    coastleComplete: boolean;
    triviaComplete: boolean;
    // ... other games
  };
  
  recentLogs: LoggedRide[];
  newsItems: NewsItem[];
}

interface LoggedRide {
  id: string;
  coasterName: string;
  parkName: string;
  date: Date;
  rating: number;  // 1-10
  imageUrl: string;
}

interface NewsItem {
  id: string;
  title: string;
  source: 'Screamscape';
  publishedAt: Date;
  imageUrl?: string;
  url: string;
  category: 'breaking' | 'update' | 'rumor';
}
```

---

## 📝 LOGGER SYSTEM

### Bottom Sheet Modal

**Trigger:** Tap "Quick Add Ride" widget OR "Log" tab in bottom nav

**Initial State:**
- Slides up from bottom (spring animation)
- Height: 50% screen (adaptive)
- Border radius: 24px top corners only
- Background: background.primary
- Drag handle at top (for dismissal)

### Components

**1. Featured Coasters Carousels (2 Carousels)**

**Carousel 1: Popular Coasters (Trending Globally)**
- Horizontal scroll
- 5-7 coasters
- Card size: 120px × 160px
- Shows coaster image + name
- Tap to select

**Carousel 2: Nearby Coasters**
- Based on user location
- Shows coasters within 50 miles
- Same visual style as Carousel 1

**2. Search Bar**
- Full width (margin 16px)
- Height: 48px
- Border radius: 12px
- Placeholder: "Search for any coaster..."
- Auto-complete dropdown appears below

**Auto-Complete:**
- Max height: 300px (scrollable)
- Shows matching coasters from RCDB database
- Each result: Coaster name, Park name, Country
- Tap to select

**3. Rating System (TWO MODES)**

### **GUEST MODE (Simple):**

Simple 1-5 star rating:
```
How would you rate this ride?
★☆☆☆☆  (Tap stars)
```

### **ENTHUSIAST MODE (Advanced - THE GAME CHANGER):**

**Criteria Selection:**
1. User selects from preset criteria:
   - Airtime
   - Smoothness
   - Intensity
   - Theme
   - Speed
   - Inversions
   - Pacing
   - Layout
   - Restraints
   - Operations
   
2. OR user creates custom criteria (text input)

3. For each criterion, user rates 1-10 with slider

4. User sets WEIGHT for each criterion (%)

**Weight System (CRITICAL FEATURE):**

```typescript
interface Criterion {
  name: string;
  rating: number;      // 1-10
  weight: number;      // Percentage (e.g., 40)
  locked: boolean;     // If locked, doesn't change when others adjust
}

// Example:
const criteria = [
  { name: 'Airtime', rating: 10, weight: 40, locked: false },
  { name: 'Smoothness', rating: 7, weight: 20, locked: false },
  { name: 'Intensity', rating: 9, weight: 30, locked: false },
  { name: 'Theme', rating: 3, weight: 10, locked: false },
];

// Total weight MUST = 100%
```

**Weight Editor UI:**

```
┌─────────────────────────────────────────┐
│  Set Your Criteria Weights              │
├─────────────────────────────────────────┤
│  Airtime                        40% 🔒  │ ← Lock icon
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ ← Slider
│                                         │
│  Smoothness                     20%     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                         │
│  Intensity                      30%     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                         │
│  Theme                          10%     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                         │
│  Total: 100% ✓                          │ ← Must be 100%
└─────────────────────────────────────────┘
```

**Locking Behavior:**
1. User adjusts "Airtime" to 40%
2. User taps lock icon 🔒 (now locked at 40%)
3. User adjusts "Smoothness" to 25%
4. System auto-adjusts "Intensity" and "Theme" to share remaining 35%
5. User locks "Smoothness" at 25%
6. Now "Intensity" and "Theme" share remaining 35%
7. When all are locked, must equal 100% to save

**Final Score Calculation:**
```typescript
const calculateWeightedScore = (criteria: Criterion[]): number => {
  let totalScore = 0;
  
  criteria.forEach(criterion => {
    const weightedValue = (criterion.rating / 10) * (criterion.weight / 100);
    totalScore += weightedValue * 10;  // Scale back to 0-10
  });
  
  return Math.round(totalScore * 10) / 10;  // Round to 1 decimal
};

// Example:
// Airtime: 10/10 × 40% = 4.0
// Smoothness: 7/10 × 20% = 1.4
// Intensity: 9/10 × 30% = 2.7
// Theme: 3/10 × 10% = 0.3
// Total: 8.4/10
```

**4. Photo Upload**
- Optional
- Tap to open camera or gallery
- Thumbnail preview after upload
- Can add multiple photos

**5. Log History Screen**

Access via "History" button in logger or separate tab.

**Views:**
- List view (chronological)
- Park view (grouped by park)
- Timeline view (visual calendar)

**Sorting:**
- By date (newest/oldest)
- By rating (highest/lowest)
- By park (alphabetical)
- By coaster name (alphabetical)

**Filtering:**
- By park
- By date range
- By rating range
- By country

### Data Structure

```typescript
interface LoggedRide {
  id: string;
  coasterId: string;  // RCDB ID
  coasterName: string;
  parkName: string;
  country: string;
  
  userId: string;
  loggedAt: Date;
  
  mode: 'guest' | 'enthusiast';
  
  // Guest mode
  simpleRating?: number;  // 1-5 stars
  
  // Enthusiast mode
  criteria?: Criterion[];
  finalScore?: number;  // Calculated weighted score
  
  photos?: string[];  // URLs
  notes?: string;
}
```

---

## 👥 SOCIAL MEDIA FEED

### Layout (Instagram-Style)

```
┌─────────────────────────────────────────┐
│  [Header: Social Feed]          [+]     │ ← New post
├─────────────────────────────────────────┤
│  [Post Card]                            │
│  ┌─────────────────────────────────┐   │
│  │ @CoasterFan99        [...]       │   │
│  │ 2 hours ago                      │   │
│  ├─────────────────────────────────┤   │
│  │                                  │   │
│  │        [Coaster Image]           │   │ ← Swipeable if multiple
│  │                                  │   │
│  ├─────────────────────────────────┤   │
│  │ ❤️ 42  💬 5  🔄 2               │   │ ← Like, Comment, Share
│  ├─────────────────────────────────┤   │
│  │ Just rode Steel Vengeance...    │   │ ← Caption
│  │ #RMC #CedarPoint                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [More posts...]                        │
└─────────────────────────────────────────┘
```

### Post Types

**1. Photo Post (Primary)**
- 1-10 photos per post
- Swipe horizontally to see more
- Coaster tag (links to coaster page)
- Caption (max 500 characters)
- Hashtags supported

**2. Poll Post**
- Question + 2-4 options
- Users vote by tapping option
- Results shown after voting
- Binary: "Steel Vengeance vs Fury 325?"
- Multiple choice: "Best Giga?" (4 options)

**3. Text-Only Post**
- No image required
- Max 500 characters
- Good for discussions, questions

### Interactions

**Double-Tap to Like:**
- Double-tap anywhere on image
- Heart animation appears at tap location
- Like counter increments
- Haptic: success

**Comments:**
- Tap comment icon or caption
- Opens comment sheet (bottom modal)
- Can reply to comments
- Threaded conversations

**Share/Repost:**
- Share to your own feed
- Appears as repost with credit
- Original post shown in card

**Follow System:**
- Follow/Unfollow users
- Following feed vs Discover feed
- Follower/following count on profile

### User Profile (Within Social)

```
┌─────────────────────────────────────────┐
│  [Avatar]  @CoasterFan99                │
│  Chris Johnson                          │
│                                         │
│  127 Coasters Logged                    │
│  Favorite Park: Cedar Point             │
│                                         │
│  Bio: Enthusiast since 2010. RMC fan!  │
│                                         │
│  42 Followers  |  89 Following          │
│  [Follow] or [Edit Profile]            │
├─────────────────────────────────────────┤
│  ✨ Showcase Coasters                   │
│  [Badge] [Badge] [Badge] [Badge]        │ ← 6 favorite coasters
│  [Badge] [Badge]                        │   (user selects)
├─────────────────────────────────────────┤
│  Posts (24)                             │
│  [Grid of user's posts]                 │
└─────────────────────────────────────────┘
```

**Badge System:**
- User selects up to 6 "showcase" coasters
- Displayed as badges on profile
- Coaster photo + name
- 100×100px each
- Tap to see full coaster info

### Privacy

**Profile Settings:**
- Public (anyone can see)
- Private (followers only)
- Hidden (no public profile)

**Post Settings:**
- Share with community (default)
- Followers only
- Private (just me)

### Data Structure

```typescript
interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  
  type: 'photo' | 'poll' | 'text';
  
  // Photo post
  images?: string[];
  caption?: string;
  taggedCoasters?: string[];  // Coaster IDs
  hashtags?: string[];
  
  // Poll post
  pollQuestion?: string;
  pollOptions?: PollOption[];
  
  // Text post
  textContent?: string;
  
  createdAt: Date;
  likes: number;
  comments: number;
  shares: number;
}

interface PollOption {
  id: string;
  text: string;
  votes: number;
  voters: string[];  // User IDs
}
```

---

## 💳 WALLET (Apple Wallet Clone)

### Visual Design (EXACT Apple Wallet Copy)

```
┌─────────────────────────────────────────┐
│  Wallet                         [+]     │ ← Add pass
├─────────────────────────────────────────┤
│                                         │
│     ┌───────────────────────────┐      │
│     │ Six Flags Season Pass     │      │ ← Top card (expanded)
│     │                           │      │
│     │ [Barcode/QR Code]         │      │
│     │                           │      │
│     │ Valid: 2025               │      │
│     └───────────────────────────┘      │
│    ┌─────────────────────────────┐     │
│    │ Cedar Point Platinum Pass   │     │ ← 2nd card (stacked)
│    └─────────────────────────────┘     │
│   ┌───────────────────────────────┐    │
│   │ Universal Orlando Tickets     │    │ ← 3rd card (stacked)
│   └───────────────────────────────┘    │
│  ┌─────────────────────────────────┐   │
│  │ (More passes...)                │   │ ← Scrollable
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Card Stacking Behavior

**At Rest:**
- Show ~3-4 cards stacked
- Each card offset down by 40px
- Depth increases (shadows get larger)

**On Tap:**
- Tapped card expands to full size
- Other cards compress below
- Spring animation
- Haptic: medium

**On Expanded Card:**
- Shows full details
- Barcode/QR prominently displayed
- Tap again to reveal barcode (security)
- Swipe down to collapse

### Card Themes (5-10 Presets)

**1. Six Flags Theme:**
```typescript
{
  backgroundColor: '#0033A0',  // Six Flags blue
  accentColor: '#FFD700',     // Gold
  pattern: 'diagonal stripes',
  logo: 'Six Flags logo (top right)',
}
```

**2. Cedar Fair Theme:**
```typescript
{
  backgroundColor: '#003B71',  // Cedar Fair blue
  accentColor: '#C8102E',     // Red
  pattern: 'subtle waves',
  logo: 'Cedar Fair logo',
}
```

**3. Universal Theme:**
```typescript
{
  backgroundColor: '#1A1A1A',  // Black
  accentColor: '#00A3E0',     // Universal blue
  pattern: 'globe pattern',
  logo: 'Universal logo',
}
```

**4. SeaWorld Theme:**
```typescript
{
  backgroundColor: '#0077C8',  // Ocean blue
  accentColor: '#00B5E2',     // Light blue
  pattern: 'wave pattern',
  logo: 'SeaWorld logo',
}
```

**5. Generic Theme:**
```typescript
{
  backgroundColor: colors.primary.blue,
  accentColor: colors.accent.blue,
  pattern: 'subtle grid',
  logo: 'none',
}
```

### Adding a Pass

**Method 1: Scan Existing Pass**
1. Tap [+] button
2. Camera opens
3. Point at barcode/QR code on physical ticket
4. System extracts barcode data
5. Decodes format (QR, Code 128, etc.)
6. Regenerates clean digital version
7. User selects theme
8. Pass saved to wallet

**Method 2: Manual Entry**
1. Tap [+] → "Manual Entry"
2. Form:
   - Pass name (text)
   - Pass type (dropdown: Season Pass, Single Day, Fast Pass, etc.)
   - Park/chain (dropdown)
   - Barcode/QR data (text input or scan)
   - Valid dates (date picker)
   - Notes (optional)
3. Select theme
4. Save

### Barcode Recreation (CRITICAL FEATURE)

**Why:** Blurry photos don't scan at park gates.

**How:**
1. Extract barcode data from photo (OCR + barcode detection)
2. Decode barcode type:
   - QR Code
   - Code 128
   - Code 39
   - PDF417
   - Aztec
3. Regenerate barcode image at high resolution
4. Store in wallet with perfect clarity

**Tech:**
- Use react-native-camera for scanning
- Use barcode detection library
- Use barcode generation library
- Store as SVG for perfect scaling

### Data Structure

```typescript
interface Pass {
  id: string;
  userId: string;
  
  name: string;
  type: 'season_pass' | 'single_day' | 'fast_pass' | 'other';
  parkChain: 'six_flags' | 'cedar_fair' | 'universal' | 'seaworld' | 'other';
  theme: PassTheme;
  
  barcode: {
    type: 'qr' | 'code128' | 'code39' | 'pdf417' | 'aztec';
    data: string;
    imageUrl: string;  // Regenerated high-res
  };
  
  validFrom: Date;
  validUntil: Date;
  
  notes?: string;
  createdAt: Date;
}
```

---

## 🗺️ TRIP PLANNER

### Views

**1. Trips List View**
- Card per trip
- Shows: Destination, Dates, # of parks
- Tap to open trip detail

**2. Trip Detail View**
- Overview card (trip name, dates, parks)
- Day-by-day itinerary
- Checklist of coasters to ride
- Notes section

**3. Single Day View**
- Park info (hours, weather)
- Timeline (8am: Rope drop, 9am: Ride X, etc.)
- Checklist (tap to check off coasters)
- Notes

### Creating a Trip

**Step 1: Trip Info**
- Trip name (text)
- Start date (date picker)
- End date (date picker)

**Step 2: Add Parks**
- Search for parks
- Assign to specific days
- Can add multiple parks per day

**Step 3: Add Coasters to Checklist**
- For each park, search RCDB database
- Add coasters to "want to ride" list
- Can set priority (high/medium/low)

**Step 4: Build Timeline (Optional)**
- Drag coasters onto timeline
- Set times (e.g., "Ride Fury 325 at 10:00am")
- Add travel time between rides
- Add meals, breaks, etc.

### Data Structure

```typescript
interface Trip {
  id: string;
  userId: string;
  name: string;
  
  startDate: Date;
  endDate: Date;
  
  days: TripDay[];
  
  status: 'planning' | 'in_progress' | 'completed';
}

interface TripDay {
  id: string;
  date: Date;
  parks: Park[];
  coasterChecklist: CoasterChecklistItem[];
  timeline?: TimelineEvent[];
  notes?: string;
}

interface CoasterChecklistItem {
  coasterId: string;
  coasterName: string;
  parkName: string;
  priority: 'high' | 'medium' | 'low';
  checked: boolean;
  checkedAt?: Date;
}

interface TimelineEvent {
  id: string;
  time: Date;
  type: 'ride' | 'meal' | 'travel' | 'break' | 'show' | 'other';
  coasterId?: string;
  coasterName?: string;
  notes?: string;
}
```

---

## ⚙️ SETTINGS

### Grouped Sections (iOS Style)

```
┌─────────────────────────────────────────┐
│  Settings                               │
├─────────────────────────────────────────┤
│                                         │
│  ACCOUNT                                │
│  ┌─────────────────────────────────┐   │
│  │ Name             Chris Johnson  │   │
│  │ Email            chris@...      │   │
│  │ Password         ••••••••       │   │
│  └─────────────────────────────────┘   │
│                                         │
│  APP PREFERENCES                        │
│  ┌─────────────────────────────────┐   │
│  │ Mode             Enthusiast ▼   │   │ ← Guest/Enthusiast toggle
│  │ Theme            Light          │   │
│  │ Haptics          On             │   │
│  │ Reduced Motion   Off            │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ENTHUSIAST SETTINGS                    │ ← Only if enthusiast mode
│  ┌─────────────────────────────────┐   │
│  │ Criteria Weights →              │   │ ← Opens weight editor
│  └─────────────────────────────────┘   │
│                                         │
│  PRIVACY                                │
│  ┌─────────────────────────────────┐   │
│  │ Profile Visibility  Public ▼    │   │
│  │ Share Logs          Off         │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ABOUT                                  │
│  ┌─────────────────────────────────┐   │
│  │ Version          1.0.0          │   │
│  │ Help & Support   →              │   │
│  │ Privacy Policy   →              │   │
│  │ Terms of Service →              │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Criteria Weight Editor (Enthusiast Only)

Access: Settings → Enthusiast Settings → Criteria Weights

**Screen:**
- List of user's criteria
- Slider for each (0-100%)
- Lock icon to lock weight
- Total must = 100%
- "Reset to Default" button
- "Save" button

**See Logger section above for detailed weight system specs.**

---

## 🎮 GAMES HUB

### Layout

```
┌─────────────────────────────────────────┐
│  Games                          [Stats] │
├─────────────────────────────────────────┤
│                                         │
│  🔥 5 Day Streak                        │
│  Play daily to keep your streak!        │
│                                         │
│  ┌────────────────────────────────┐    │
│  │ Daily Challenges               │    │
│  │ ✓ Coastle complete             │    │
│  │ ○ Trivia not started           │    │
│  └────────────────────────────────┘    │
│                                         │
│  ┌──────────┐ ┌──────────┐             │
│  │ Coastle  │ │ Trivia   │             │ ← 2×2 grid
│  │  🎯      │ │  🧠      │             │   of games
│  └──────────┘ └──────────┘             │
│  ┌──────────┐ ┌──────────┐             │
│  │  Cards   │ │Blackjack │             │
│  │  🃏      │ │  🎰      │             │
│  └──────────┘ └──────────┘             │
│                                         │
│  ┌────────────────────────────────┐    │
│  │ Leaderboard (Top 10)           │    │
│  │ 1. CoasterFan99    9850 pts    │    │
│  │ 2. ThrillSeeker    9720 pts    │    │
│  │ ...                            │    │
│  └────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### Game Icons (2×2 Grid)

Each icon is:
- Size: 48% screen width × 140px height
- Border radius: 20px
- Shadow: lg
- Icon: 64×64px emoji or custom icon
- Game name below icon
- "New!" badge if applicable
- Tap to launch game

### Streak System

**Tracked Across All Games:**
- User must complete at least 1 daily challenge per day
- Coastle OR Trivia counts
- Other games don't affect streak (yet)
- Streak resets if miss a day

**Rewards (Future):**
- 7-day streak: 100 bonus coins
- 30-day streak: Special badge
- 100-day streak: Legendary card pack (TCG)

---

## 📊 Data Models Summary

```typescript
// User
interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  
  mode: 'guest' | 'enthusiast';
  criteria?: Criterion[];  // For enthusiast mode
  
  stats: {
    coastersLogged: number;
    favoriteP: string;
    streakCount: number;
  };
  
  createdAt: Date;
}

// Complete logged ride (combines guest + enthusiast)
interface LoggedRide {
  id: string;
  userId: string;
  coasterId: string;
  coasterName: string;
  parkName: string;
  country: string;
  loggedAt: Date;
  
  mode: 'guest' | 'enthusiast';
  simpleRating?: number;  // Guest mode
  criteria?: Criterion[];  // Enthusiast mode
  finalScore?: number;     // Calculated
  
  photos?: string[];
  notes?: string;
}
```

---

## 🎯 Priority Implementation Order

1. **DESIGN SYSTEM** ✅ (Already done)
2. **HOMESCREEN** (Foundation)
3. **LOGGER** (Core feature)
4. **GAMES:**
   - Coastle
   - Trivia
   - Trading Card
   - Blackjack
   - Games Hub
5. **SOCIAL MEDIA**
6. **WALLET**
7. **TRIP PLANNER**
8. **SETTINGS**

---

## ✅ Claude Code Checklist (For Every Section)

- [ ] Uses DESIGN-SYSTEM.md tokens (colors, typography, spacing)
- [ ] TypeScript interfaces defined
- [ ] Spring animations (no easing curves)
- [ ] Haptic feedback on all interactions
- [ ] Reduced motion support
- [ ] VoiceOver labels
- [ ] High contrast (4.5:1 minimum)
- [ ] Touch targets 44×44pt minimum
- [ ] Text never overflows (auto-expand containers)
- [ ] Follows Apple's Clarity, Deference, Depth principles

---

**This document + DESIGN-SYSTEM.md + individual game READMEs = Complete specification for Claude Code! 🚀**
