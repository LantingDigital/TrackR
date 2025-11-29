/**
 * Logger Screen - TrackR
 * Modern ride logging with intuitive UX
 *
 * Key UX principles:
 * - 3-tap quick log (Park → Ride → Rating)
 * - Mode from profile (not per-ride selection)
 * - Recent parks as horizontal carousel
 * - All Parks with animated filter buttons
 * - Coasters as square card grid
 * - Slider-based criteria ratings (enthusiast mode only)
 * - Success animation on log completion
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeInDown,
  Layout,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, Button, TextInput, Slider } from '@/components/base';
import { useTheme, useHaptic, HapticType, useReducedMotion } from '@/hooks';
import { useUserProfile, RATING_CRITERIA, useSuccessOverlay } from '@/contexts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// ═══════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════

const RECENT_PARKS = [
  { id: '1', name: 'Cedar Point', image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=200&h=200&fit=crop', location: 'Sandusky, OH' },
  { id: '2', name: 'Kings Island', image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=200&h=200&fit=crop', location: 'Mason, OH' },
  { id: '3', name: 'Six Flags Magic Mountain', image: 'https://images.unsplash.com/photo-1536086845232-38a8e7c91f55?w=200&h=200&fit=crop', location: 'Valencia, CA' },
  { id: '4', name: 'Busch Gardens Tampa', image: 'https://images.unsplash.com/photo-1534579512985-3f8e13e5ad2c?w=200&h=200&fit=crop', location: 'Tampa, FL' },
  { id: '5', name: 'Dollywood', image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=200&h=200&fit=crop', location: 'Pigeon Forge, TN' },
];

const ALL_PARKS = [
  { id: '1', name: 'Cedar Point', location: 'Sandusky, OH', coasterCount: 17 },
  { id: '2', name: 'Kings Island', location: 'Mason, OH', coasterCount: 14 },
  { id: '3', name: 'Six Flags Magic Mountain', location: 'Valencia, CA', coasterCount: 20 },
  { id: '4', name: 'Busch Gardens Tampa', location: 'Tampa, FL', coasterCount: 10 },
  { id: '5', name: 'Dollywood', location: 'Pigeon Forge, TN', coasterCount: 10 },
  { id: '6', name: 'Hersheypark', location: 'Hershey, PA', coasterCount: 15 },
  { id: '7', name: 'Carowinds', location: 'Charlotte, NC', coasterCount: 14 },
  { id: '8', name: 'Kings Dominion', location: 'Doswell, VA', coasterCount: 13 },
];

const COASTERS_BY_PARK: Record<string, Array<{ id: string; name: string; type: string; image: string }>> = {
  '1': [
    { id: 'sv', name: 'Steel Vengeance', type: 'Hybrid', image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=200&h=200&fit=crop' },
    { id: 'mf', name: 'Millennium Force', type: 'Giga', image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=200&h=200&fit=crop' },
    { id: 'mv', name: 'Maverick', type: 'Launch', image: 'https://images.unsplash.com/photo-1536086845232-38a8e7c91f55?w=200&h=200&fit=crop' },
    { id: 'tt2', name: 'Top Thrill 2', type: 'Launch', image: 'https://images.unsplash.com/photo-1534579512985-3f8e13e5ad2c?w=200&h=200&fit=crop' },
    { id: 'rp', name: 'Raptor', type: 'Inverted', image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=200&h=200&fit=crop' },
    { id: 'gk', name: 'GateKeeper', type: 'Wing', image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=200&h=200&fit=crop' },
  ],
  '2': [
    { id: 'orion', name: 'Orion', type: 'Giga', image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=200&h=200&fit=crop' },
    { id: 'beast', name: 'The Beast', type: 'Wooden', image: 'https://images.unsplash.com/photo-1536086845232-38a8e7c91f55?w=200&h=200&fit=crop' },
    { id: 'mystic', name: 'Mystic Timbers', type: 'Wooden', image: 'https://images.unsplash.com/photo-1534579512985-3f8e13e5ad2c?w=200&h=200&fit=crop' },
    { id: 'banshee', name: 'Banshee', type: 'Inverted', image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=200&h=200&fit=crop' },
  ],
  '3': [
    { id: 'x2', name: 'X2', type: '4th Dimension', image: 'https://images.unsplash.com/photo-1536086845232-38a8e7c91f55?w=200&h=200&fit=crop' },
    { id: 'tatsu', name: 'Tatsu', type: 'Flying', image: 'https://images.unsplash.com/photo-1534579512985-3f8e13e5ad2c?w=200&h=200&fit=crop' },
    { id: 'twisted', name: 'Twisted Colossus', type: 'Hybrid', image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=200&h=200&fit=crop' },
  ],
};

// Default coasters for parks not in our data
const DEFAULT_COASTERS = [
  { id: 'c1', name: 'Main Coaster', type: 'Steel', image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=200&h=200&fit=crop' },
  { id: 'c2', name: 'Family Coaster', type: 'Family', image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=200&h=200&fit=crop' },
];

type Step = 'park' | 'coaster' | 'rating';
type SortOption = 'name' | 'location' | 'coasters';

interface SelectedPark {
  id: string;
  name: string;
}

interface SelectedCoaster {
  id: string;
  name: string;
  type: string;
}

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════

export const LoggerScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { trigger } = useHaptic();
  const reducedMotion = useReducedMotion();
  const insets = useSafeAreaInsets();
  const { profile, calculateWeightedScore } = useUserProfile();
  const { showSuccess } = useSuccessOverlay();

  // Form state
  const [step, setStep] = useState<Step>('park');
  const [selectedPark, setSelectedPark] = useState<SelectedPark | null>(null);
  const [selectedCoaster, setSelectedCoaster] = useState<SelectedCoaster | null>(null);
  const [overallRating, setOverallRating] = useState(7);
  const [criteriaRatings, setCriteriaRatings] = useState<Record<string, number>>(
    RATING_CRITERIA.reduce((acc, c) => ({ ...acc, [c.id]: 7 }), {})
  );
  const [notes, setNotes] = useState('');


  // Search and filter state
  const [parkSearch, setParkSearch] = useState('');
  const [coasterSearch, setCoasterSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');

  // Animation values
  const sortButtonScale = useSharedValue(1);

  // Navigation
  const handleBack = () => {
    trigger(HapticType.LIGHT);
    if (step === 'park') {
      navigation.goBack();
    } else if (step === 'coaster') {
      setStep('park');
      setSelectedPark(null);
    } else if (step === 'rating') {
      setStep('coaster');
      setSelectedCoaster(null);
    }
  };

  const handleParkSelect = (park: SelectedPark) => {
    trigger(HapticType.LIGHT);
    setSelectedPark(park);
    setStep('coaster');
  };

  const handleCoasterSelect = (coaster: SelectedCoaster) => {
    trigger(HapticType.LIGHT);
    setSelectedCoaster(coaster);
    setStep('rating');
  };

  const handleLogRide = () => {
    trigger(HapticType.SUCCESS);

    // Calculate final score based on mode
    const finalScore = profile.ratingMode === 'enthusiast'
      ? calculateWeightedScore(criteriaRatings as Record<any, number>)
      : overallRating;

    console.log('Logged ride:', {
      park: selectedPark,
      coaster: selectedCoaster,
      rating: finalScore,
      criteriaRatings: profile.ratingMode === 'enthusiast' ? criteriaRatings : undefined,
      notes,
      mode: profile.ratingMode,
    });

    // Show global success overlay and navigate back immediately
    // The overlay covers the screen, so the Logger closing is invisible
    showSuccess({
      title: 'Ride Logged!',
      subtitle: `${selectedCoaster?.name} added to your collection`,
    });

    // Navigate back immediately - happens behind the overlay
    navigation.goBack();
  };

  // Sort cycling with animation
  const cycleSortOption = () => {
    trigger(HapticType.LIGHT);
    sortButtonScale.value = withSpring(0.9, { damping: 15 });
    setTimeout(() => {
      sortButtonScale.value = withSpring(1, { damping: 15 });
    }, 100);

    const options: SortOption[] = ['name', 'location', 'coasters'];
    const currentIndex = options.indexOf(sortBy);
    const nextIndex = (currentIndex + 1) % options.length;
    setSortBy(options[nextIndex]);
  };

  const sortButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sortButtonScale.value }],
  }));

  // Get sorted parks
  const getSortedParks = () => {
    let parks = [...ALL_PARKS];
    if (parkSearch) {
      parks = parks.filter(p =>
        p.name.toLowerCase().includes(parkSearch.toLowerCase()) ||
        p.location.toLowerCase().includes(parkSearch.toLowerCase())
      );
    }
    switch (sortBy) {
      case 'name':
        return parks.sort((a, b) => a.name.localeCompare(b.name));
      case 'location':
        return parks.sort((a, b) => a.location.localeCompare(b.location));
      case 'coasters':
        return parks.sort((a, b) => b.coasterCount - a.coasterCount);
      default:
        return parks;
    }
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case 'name': return 'A-Z';
      case 'location': return 'Location';
      case 'coasters': return 'Most Coasters';
    }
  };

  // ═══════════════════════════════════════════════════════════
  // STEP 1: PARK SELECTION
  // ═══════════════════════════════════════════════════════════

  const renderParkStep = () => (
    <Animated.View entering={reducedMotion ? undefined : FadeIn.duration(300)} style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.stepHeader}>
        <Text variant="title2" style={{ color: theme.colors.text.primary, fontWeight: '700' }}>
          Where are you?
        </Text>
      </View>

      {/* Recent Parks Carousel */}
      {RECENT_PARKS.length > 0 && !parkSearch && (
        <View style={styles.carouselSection}>
          <Text variant="caption1" style={{ ...styles.sectionLabel, color: theme.colors.text.tertiary }}>
            RECENT
          </Text>
          <FlatList
            horizontal
            data={[...RECENT_PARKS, { id: 'view-all', name: 'View All', image: '', location: '' }]}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContent}
            renderItem={({ item, index }) => {
              if (item.id === 'view-all') {
                return (
                  <Pressable
                    style={[styles.viewAllCard, { backgroundColor: theme.colors.background.secondary }]}
                    onPress={() => setParkSearch(' ')} // Trigger to show all parks
                  >
                    <View style={[styles.viewAllIcon, { backgroundColor: theme.colors.primary.blue + '15' }]}>
                      <Feather name="grid" size={24} color={theme.colors.primary.blue} />
                    </View>
                    <Text variant="callout" style={{ color: theme.colors.primary.blue, fontWeight: '600' }}>
                      View All
                    </Text>
                  </Pressable>
                );
              }
              return (
                <Animated.View entering={reducedMotion ? undefined : FadeInDown.delay(index * 50).duration(300)}>
                  <Pressable
                    onPress={() => handleParkSelect({ id: item.id, name: item.name })}
                    style={({ pressed }) => [
                      styles.recentParkCard,
                      {
                        transform: [{ scale: pressed ? 0.97 : 1 }],
                      },
                    ]}
                  >
                    <ImageBackground
                      source={{ uri: item.image }}
                      style={styles.recentParkImageBg}
                      imageStyle={styles.recentParkImageStyle}
                    >
                      <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)']}
                        style={styles.recentParkGradient}
                      >
                        <Text variant="callout" style={{ color: '#FFFFFF', fontWeight: '600' }} numberOfLines={1}>
                          {item.name}
                        </Text>
                        <Text variant="caption2" style={{ color: 'rgba(255,255,255,0.8)' }} numberOfLines={1}>
                          {item.location}
                        </Text>
                      </LinearGradient>
                    </ImageBackground>
                  </Pressable>
                </Animated.View>
              );
            }}
          />
        </View>
      )}

      {/* Search */}
      <TextInput
        placeholder="Search parks..."
        value={parkSearch}
        onChangeText={setParkSearch}
        icon={<Feather name="search" size={20} color={theme.colors.text.tertiary} />}
        containerStyle={{ marginBottom: 16, marginHorizontal: 16 }}
      />

      {/* Sort Button */}
      <View style={styles.filterRow}>
        <Text variant="caption1" style={{ ...styles.sectionLabel, color: theme.colors.text.tertiary, marginBottom: 0 }}>
          ALL PARKS
        </Text>
        <AnimatedPressable
          onPress={cycleSortOption}
          style={[styles.sortButton, { backgroundColor: theme.colors.background.secondary }, sortButtonStyle]}
        >
          <Feather name="sliders" size={14} color={theme.colors.text.secondary} />
          <Text variant="caption2" style={{ color: theme.colors.text.secondary, marginLeft: 4 }}>
            {getSortLabel()}
          </Text>
        </AnimatedPressable>
      </View>

      {/* All Parks List */}
      <ScrollView style={styles.parksList} showsVerticalScrollIndicator={false}>
        {getSortedParks().map((park, index) => (
          <Animated.View
            key={park.id}
            entering={reducedMotion ? undefined : FadeInDown.delay(index * 30).duration(200)}
            layout={Layout.springify()}
          >
            <Pressable
              onPress={() => handleParkSelect({ id: park.id, name: park.name })}
              style={({ pressed }) => [
                styles.parkListItem,
                {
                  backgroundColor: pressed ? theme.colors.background.tertiary : theme.colors.background.secondary,
                },
              ]}
            >
              <View style={[styles.parkIcon, { backgroundColor: theme.colors.primary.blue + '15' }]}>
                <MaterialCommunityIcons name="ferris-wheel" size={22} color={theme.colors.primary.blue} />
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="body" style={{ color: theme.colors.text.primary, fontWeight: '500' }}>
                  {park.name}
                </Text>
                <Text variant="caption2" style={{ color: theme.colors.text.tertiary }}>
                  {park.location} · {park.coasterCount} coasters
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color={theme.colors.text.quaternary} />
            </Pressable>
          </Animated.View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
  );

  // ═══════════════════════════════════════════════════════════
  // STEP 2: COASTER SELECTION (Square Card Grid)
  // ═══════════════════════════════════════════════════════════

  const renderCoasterStep = () => {
    const coasters = COASTERS_BY_PARK[selectedPark?.id || ''] || DEFAULT_COASTERS;
    const filteredCoasters = coasterSearch
      ? coasters.filter(c => c.name.toLowerCase().includes(coasterSearch.toLowerCase()))
      : coasters;

    const cardWidth = (SCREEN_WIDTH - 48 - 12) / 2; // 2 columns with gap

    return (
      <Animated.View entering={reducedMotion ? undefined : FadeIn.duration(300)} style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.stepHeader}>
          <Text variant="title2" style={{ color: theme.colors.text.primary, fontWeight: '700' }}>
            What did you ride?
          </Text>
        </View>

        {/* Search */}
        <TextInput
          placeholder="Search coasters..."
          value={coasterSearch}
          onChangeText={setCoasterSearch}
          icon={<Feather name="search" size={20} color={theme.colors.text.tertiary} />}
          containerStyle={{ marginBottom: 16, marginHorizontal: 16 }}
        />

        {/* Coaster Grid */}
        <ScrollView style={styles.coasterGrid} showsVerticalScrollIndicator={false}>
          <View style={styles.gridContainer}>
            {filteredCoasters.map((coaster, index) => (
              <Animated.View
                key={coaster.id}
                entering={reducedMotion ? undefined : FadeInDown.delay(index * 50).duration(300)}
                style={{ width: cardWidth }}
              >
                <Pressable
                  onPress={() => handleCoasterSelect(coaster)}
                  style={({ pressed }) => [
                    styles.coasterCard,
                    {
                      transform: [{ scale: pressed ? 0.97 : 1 }],
                    },
                  ]}
                >
                  <ImageBackground
                    source={{ uri: coaster.image }}
                    style={styles.coasterImageBg}
                    imageStyle={styles.coasterImageStyle}
                  >
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.75)']}
                      style={styles.coasterGradient}
                    >
                      <Text variant="callout" style={{ color: '#FFFFFF', fontWeight: '600' }} numberOfLines={2}>
                        {coaster.name}
                      </Text>
                      <View style={styles.typeBadge}>
                        <Text variant="caption2" style={{ color: '#FFFFFF' }}>
                          {coaster.type}
                        </Text>
                      </View>
                    </LinearGradient>
                  </ImageBackground>
                </Pressable>
              </Animated.View>
            ))}
          </View>
          <View style={{ height: 40 }} />
        </ScrollView>
      </Animated.View>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // STEP 3: RATING
  // ═══════════════════════════════════════════════════════════

  const renderRatingStep = () => {
    // Calculate weighted score for enthusiast mode display
    const weightedScore = profile.ratingMode === 'enthusiast'
      ? calculateWeightedScore(criteriaRatings as Record<any, number>)
      : overallRating;

    return (
      <Animated.View entering={reducedMotion ? undefined : FadeIn.duration(300)} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ratingContent}>
          {/* Simple Coaster Card */}
          <View style={[styles.simpleCoasterCard, { backgroundColor: theme.colors.background.secondary }]}>
            <View style={[styles.coasterCardIcon, { backgroundColor: theme.colors.primary.blue + '15' }]}>
              <MaterialCommunityIcons name="ferris-wheel" size={28} color={theme.colors.primary.blue} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="headline" style={{ color: theme.colors.text.primary, fontWeight: '700' }}>
                {selectedCoaster?.name}
              </Text>
              <Text variant="caption1" style={{ color: theme.colors.text.tertiary }}>
                {selectedPark?.name}
              </Text>
            </View>
          </View>

          {/* Guest Mode: Overall Rating with Slider */}
          {profile.ratingMode === 'guest' && (
            <View style={styles.ratingSection}>
              <Text variant="title3" style={{ color: theme.colors.text.primary, fontWeight: '700', marginBottom: 16 }}>
                How was it?
              </Text>

              <View style={[styles.ratingDisplay, { backgroundColor: theme.colors.background.secondary }]}>
                <Text style={{ ...styles.ratingNumber, color: theme.colors.primary.blue }}>
                  {overallRating}
                </Text>
                <Text variant="headline" style={{ color: theme.colors.text.tertiary }}>/10</Text>
              </View>

              {/* Overall Rating Slider */}
              <View style={styles.sliderContainer}>
                <Slider
                  value={overallRating}
                  min={1}
                  max={10}
                  step={1}
                  snapOnRelease={true}
                  onValueChange={(value) => setOverallRating(Math.round(value))}
                  onChange={setOverallRating}
                  color={theme.colors.primary.blue}
                  showValue={false}
                />
                <View style={styles.sliderLabels}>
                  <Text variant="caption2" style={{ color: theme.colors.text.tertiary }}>1</Text>
                  <Text variant="caption2" style={{ color: theme.colors.text.tertiary }}>10</Text>
                </View>
              </View>
            </View>
          )}

          {/* Enthusiast Mode: Criteria Ratings with Sliders */}
          {profile.ratingMode === 'enthusiast' && (
            <View style={[styles.criteriaSection, { backgroundColor: theme.colors.background.secondary }]}>
              <View style={styles.criteriaHeader}>
                <View style={{ flex: 1, marginRight: 12 }}>
                  <Text variant="headline" style={{ color: theme.colors.text.primary, fontWeight: '600' }}>
                    Rate Each Criteria
                  </Text>
                  <View style={styles.weightedScoreRow}>
                    <Text variant="caption2" style={{ color: theme.colors.text.tertiary }}>
                      Weighted Score:{' '}
                    </Text>
                    <Text variant="caption2" style={{ color: theme.colors.primary.purple, fontWeight: '700' }}>
                      {weightedScore.toFixed(1)}/10
                    </Text>
                  </View>
                </View>
                <View style={[styles.enthusiastBadge, { backgroundColor: theme.colors.primary.purple + '15' }]}>
                  <Feather name="star" size={12} color={theme.colors.primary.purple} />
                  <Text variant="caption2" style={{ color: theme.colors.primary.purple, marginLeft: 4 }}>
                    Enthusiast
                  </Text>
                </View>
              </View>

              {RATING_CRITERIA.map((criteria, index) => {
                const weight = profile.criteriaWeights.find(w => w.id === criteria.id)?.weight || 17;
                return (
                  <View key={criteria.id} style={[styles.criteriaSliderRow, index === RATING_CRITERIA.length - 1 && { marginBottom: 0 }]}>
                    <View style={styles.criteriaLabelRow}>
                      <View style={[styles.criteriaDot, { backgroundColor: criteria.color }]} />
                      <Text variant="callout" style={{ color: theme.colors.text.primary, flex: 1 }}>
                        {criteria.label}
                      </Text>
                      <Text variant="caption2" style={{ color: theme.colors.text.tertiary, marginRight: 8 }}>
                        {weight}%
                      </Text>
                      <Text variant="callout" style={{ color: criteria.color, fontWeight: '700', minWidth: 40, textAlign: 'right' }}>
                        {criteriaRatings[criteria.id]}/10
                      </Text>
                    </View>
                    <Slider
                      value={criteriaRatings[criteria.id]}
                      min={1}
                      max={10}
                      step={1}
                      snapOnRelease={true}
                      onValueChange={(value) => {
                        // Real-time updates during drag
                        setCriteriaRatings((prev) => ({ ...prev, [criteria.id]: Math.round(value) }));
                      }}
                      onChange={(value) => {
                        // Final value on release
                        setCriteriaRatings((prev) => ({ ...prev, [criteria.id]: value }));
                      }}
                      color={criteria.color}
                      showValue={false}
                    />
                  </View>
                );
              })}
            </View>
          )}

          {/* Notes */}
          <TextInput
            label="Notes (optional)"
            placeholder="Add your thoughts..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            containerStyle={{ marginTop: 16 }}
          />

          {/* Log Button */}
          <Button
            title="Log Ride"
            onPress={handleLogRide}
            variant="primary"
            fullWidth
            style={{ marginTop: 24 }}
          />

          <View style={{ height: 40 }} />
        </ScrollView>
      </Animated.View>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════

  // Get step subtitle
  const getStepSubtitle = () => {
    switch (step) {
      case 'park': return null; // "Where are you?" is shown in the step content
      case 'coaster': return selectedPark?.name;
      case 'rating': return `${selectedCoaster?.name} at ${selectedPark?.name}`;
      default: return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Header - Main title row with navigation icons */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Feather name={step === 'park' ? 'x' : 'arrow-left'} size={24} color={theme.colors.text.primary} />
        </Pressable>
        <Text variant="headline" style={{ color: theme.colors.text.primary, fontWeight: '700' }}>
          Log a Ride
        </Text>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={8}
        >
          <Feather name="x" size={24} color={theme.colors.text.primary} />
        </Pressable>
      </View>

      {/* Step subtitle - contextual info */}
      {getStepSubtitle() && (
        <View style={styles.subtitleRow}>
          <Text variant="body" style={{ color: theme.colors.text.secondary }}>
            {getStepSubtitle()}
          </Text>
        </View>
      )}

      {/* Progress */}
      <View style={styles.progressContainer}>
        {(['park', 'coaster', 'rating'] as const).map((s, i) => (
          <View
            key={s}
            style={[
              styles.progressDot,
              {
                backgroundColor:
                  step === s
                    ? theme.colors.primary.blue
                    : ['park', 'coaster', 'rating'].indexOf(step) > i
                    ? theme.colors.primary.blue
                    : theme.colors.background.tertiary,
              },
            ]}
          />
        ))}
      </View>

      {/* Content */}
      {step === 'park' && renderParkStep()}
      {step === 'coaster' && renderCoasterStep()}
      {step === 'rating' && renderRatingStep()}

    </View>
  );
};

// ═══════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitleRow: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingBottom: 12,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stepHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  // Carousel
  carouselSection: {
    marginBottom: 16,
  },
  sectionLabel: {
    marginBottom: 12,
    marginLeft: 16,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  carouselContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  recentParkCard: {
    width: 140,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
  },
  recentParkImageBg: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  recentParkImageStyle: {
    borderRadius: 16,
  },
  recentParkGradient: {
    padding: 12,
    paddingTop: 40,
    gap: 2,
  },
  viewAllCard: {
    width: 140,
    height: 140,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  viewAllIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Filter
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  // Parks List
  parksList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  parkListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  parkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Coaster Grid
  coasterGrid: {
    flex: 1,
    paddingHorizontal: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  coasterCard: {
    borderRadius: 16,
    overflow: 'hidden',
    aspectRatio: 1, // Square cards
  },
  coasterImageBg: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  coasterImageStyle: {
    borderRadius: 16,
  },
  coasterGradient: {
    padding: 12,
    paddingTop: 50,
    gap: 6,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

  // Rating
  ratingContent: {
    paddingHorizontal: 16,
  },
  simpleCoasterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 12,
    marginBottom: 24,
  },
  coasterCardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingSection: {
    marginBottom: 24,
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  ratingNumber: {
    fontSize: 56,
    fontWeight: '700',
    lineHeight: 64,
  },
  // Rating Slider
  sliderContainer: {
    marginTop: 8,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -16,
    paddingHorizontal: 4,
  },

  // Criteria
  criteriaSection: {
    padding: 16,
    borderRadius: 16,
  },
  criteriaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  weightedScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    flexWrap: 'wrap',
  },
  enthusiastBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  criteriaSliderRow: {
    marginBottom: 20,
  },
  criteriaLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  criteriaDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
});

export default LoggerScreen;
