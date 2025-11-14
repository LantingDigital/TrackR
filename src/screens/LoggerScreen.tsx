/**
 * Logger Screen - TrackR
 * Multi-step ride logging with weighted criteria system
 * Phase 4: KILLER FEATURE
 */

import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Button, Card, TextInput, Slider } from '@/components/base';
import { useTheme, useHaptic, HapticType } from '@/hooks';

// Types
type LoggerMode = 'guest' | 'enthusiast';

interface RideLog {
  mode: LoggerMode;
  parkName: string;
  coasterName: string;
  date: Date;
  // Guest mode
  overallRating?: number;
  // Enthusiast mode
  criteriaRatings?: Record<string, number>;
  criteriaWeights?: Record<string, number>;
  // Additional
  notes?: string;
  tags?: string[];
  photos?: string[];
}

// Rating Criteria for Enthusiast Mode
const RATING_CRITERIA = [
  { id: 'thrill', label: 'Thrill/Intensity', icon: '⚡', color: '#FF6B35' },
  { id: 'smoothness', label: 'Smoothness', icon: '✨', color: '#4ECDC4' },
  { id: 'airtime', label: 'Airtime', icon: '☁️', color: '#95E1D3' },
  { id: 'theming', label: 'Theming', icon: '🎨', color: '#F38181' },
  { id: 'inversions', label: 'Inversions', icon: '🔄', color: '#AA96DA' },
  { id: 'speed', label: 'Speed', icon: '💨', color: '#FCBAD3' },
];

export const LoggerScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { trigger } = useHaptic();

  // Form state
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [mode, setMode] = useState<LoggerMode | null>(null);
  const [parkName, setParkName] = useState('');
  const [coasterName, setCoasterName] = useState('');
  const [overallRating, setOverallRating] = useState(5);

  // Enthusiast mode - criteria ratings & weights
  const [criteriaRatings, setCriteriaRatings] = useState<Record<string, number>>(
    RATING_CRITERIA.reduce((acc, c) => ({ ...acc, [c.id]: 5 }), {})
  );
  const [criteriaWeights, setCriteriaWeights] = useState<Record<string, number>>(
    RATING_CRITERIA.reduce((acc, c) => ({ ...acc, [c.id]: Math.round(100 / RATING_CRITERIA.length) }), {})
  );
  const [lockedCriteria, setLockedCriteria] = useState<Set<string>>(new Set());
  const [draggingCriteria, setDraggingCriteria] = useState<string | null>(null);

  const [notes, setNotes] = useState('');

  // Navigation helpers
  const canGoNext = () => {
    if (step === 1) return mode !== null;
    if (step === 2) return parkName.trim() !== '';
    if (step === 3) return coasterName.trim() !== '';
    return true;
  };

  const handleNext = () => {
    if (!canGoNext()) return;
    trigger(HapticType.MEDIUM);
    if (step < 4) {
      setStep((step + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleBack = () => {
    trigger(HapticType.MEDIUM);
    if (step > 1) {
      setStep((step - 1) as 1 | 2 | 3 | 4);
    } else {
      navigation.goBack();
    }
  };

  const handleSubmit = () => {
    trigger(HapticType.SUCCESS);
    // TODO: Save ride log to storage
    console.log('Submitting ride log:', {
      mode,
      parkName,
      coasterName,
      overallRating: mode === 'guest' ? overallRating : calculateWeightedScore(),
      criteriaRatings: mode === 'enthusiast' ? criteriaRatings : undefined,
      criteriaWeights: mode === 'enthusiast' ? criteriaWeights : undefined,
      notes,
    });
    navigation.goBack();
  };

  // Enthusiast mode helpers
  const calculateWeightedScore = () => {
    let totalScore = 0;
    RATING_CRITERIA.forEach((c) => {
      const weight = criteriaWeights[c.id] || 0;
      const rating = criteriaRatings[c.id] || 0;
      totalScore += (rating * weight) / 100;
    });
    return Math.round(totalScore * 10) / 10; // Round to 1 decimal place
  };

  // Calculate maximum allowed weight for a criteria based on locked totals
  const getMaxAllowedWeight = (criteriaId: string): number => {
    const lockedCriteriaIds = Array.from(lockedCriteria).filter(id => id !== criteriaId);
    const lockedTotal = lockedCriteriaIds.reduce(
      (sum, id) => sum + (criteriaWeights[id] || 0),
      0
    );
    return 100 - lockedTotal;
  };

  const handleWeightChange = (criteriaId: string, newWeight: number) => {
    // Build new weights object preserving ALL locked criteria exactly
    const newWeights = { ...criteriaWeights };

    // Treat dragging criteria as temporarily locked (if it's being dragged)
    // This ensures all OTHER unlocked sliders move proportionally
    const effectivelyLocked = new Set(lockedCriteria);
    if (draggingCriteria && draggingCriteria !== criteriaId) {
      effectivelyLocked.add(draggingCriteria);
    }

    // Get lists of locked and unlocked criteria (excluding the one being changed)
    const lockedCriteriaIds = Array.from(effectivelyLocked);
    const otherUnlocked = RATING_CRITERIA.filter(
      (c) => c.id !== criteriaId && !lockedCriteriaIds.includes(c.id)
    );

    // Calculate total weight that's locked (including dragging criteria if applicable)
    const lockedTotal = lockedCriteriaIds.reduce(
      (sum, id) => sum + (criteriaWeights[id] || 0),
      0
    );

    // Constrain the new weight to not exceed available space
    const maxAllowed = 100 - lockedTotal;
    const constrainedWeight = Math.max(0, Math.min(newWeight, maxAllowed));
    newWeights[criteriaId] = constrainedWeight;

    // If there are unlocked criteria to balance, distribute PROPORTIONALLY
    if (otherUnlocked.length > 0) {
      const remaining = 100 - lockedTotal - constrainedWeight;

      // Calculate current total of other unlocked sliders
      const currentOtherTotal = otherUnlocked.reduce(
        (sum, c) => sum + (criteriaWeights[c.id] || 0),
        0
      );

      if (currentOtherTotal > 0) {
        // Reduce proportionally based on current ratios
        let assignedTotal = 0;
        otherUnlocked.forEach((c, index) => {
          const currentValue = criteriaWeights[c.id] || 0;
          const proportion = currentValue / currentOtherTotal;

          if (index === otherUnlocked.length - 1) {
            // Last slider gets the remainder to ensure we hit exactly 100
            newWeights[c.id] = remaining - assignedTotal;
          } else {
            // Calculate proportional share and round
            const proportionalShare = Math.round(remaining * proportion);
            newWeights[c.id] = proportionalShare;
            assignedTotal += proportionalShare;
          }
        });
      } else {
        // If all others are at 0, distribute evenly
        const baseValue = Math.floor(remaining / otherUnlocked.length);
        const leftover = remaining - (baseValue * otherUnlocked.length);

        otherUnlocked.forEach((c, index) => {
          newWeights[c.id] = baseValue + (index < leftover ? 1 : 0);
        });
      }
    }

    // Ensure truly locked criteria (not just dragging) retain their exact original values
    Array.from(lockedCriteria).forEach((id) => {
      newWeights[id] = criteriaWeights[id];
    });

    setCriteriaWeights(newWeights);
  };

  const toggleLock = (criteriaId: string) => {
    trigger(HapticType.LIGHT);

    setLockedCriteria((prev) => {
      const next = new Set(prev);
      const wasLocked = next.has(criteriaId);

      if (wasLocked) {
        next.delete(criteriaId);

        // If unlocking and the slider is at 0%, redistribute weights
        if (criteriaWeights[criteriaId] === 0) {
          // Get all unlocked criteria (including the one we just unlocked)
          const unlockedCriteria = RATING_CRITERIA.filter(c => !next.has(c.id));
          const lockedTotal = Array.from(next).reduce(
            (sum, id) => sum + (criteriaWeights[id] || 0),
            0
          );

          if (unlockedCriteria.length > 0) {
            const remaining = 100 - lockedTotal;
            const perCriteria = remaining / unlockedCriteria.length;

            const newWeights = { ...criteriaWeights };
            unlockedCriteria.forEach((c) => {
              newWeights[c.id] = Math.round(perCriteria);
            });

            // Fix rounding errors
            const total = Object.values(newWeights).reduce((sum, w) => sum + w, 0);
            if (total !== 100 && unlockedCriteria.length > 0) {
              const diff = 100 - total;
              newWeights[unlockedCriteria[0].id] = Math.max(
                0,
                newWeights[unlockedCriteria[0].id] + diff
              );
            }

            setCriteriaWeights(newWeights);
          }
        }
      } else {
        next.add(criteriaId);
      }

      return next;
    });
  };

  // Render functions
  const renderProgressBar = () => {
    return (
      <View style={styles.progressContainer}>
        {[1, 2, 3, 4].map((s) => (
          <View
            key={s}
            style={[
              styles.progressSegment,
              {
                backgroundColor:
                  step >= s
                    ? theme.colors.primary.blue
                    : theme.colors.background.tertiary,
                borderRadius: theme.borderRadius.xs,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text variant="title2" color="primary" style={styles.stepTitle}>
        Choose Your Mode
      </Text>
      <Text variant="body" color="secondary" style={styles.stepSubtitle}>
        Select how you want to log this ride
      </Text>

      <View style={styles.modeCards}>
        <Pressable
          style={[
            styles.modeCard,
            {
              backgroundColor: theme.colors.background.secondary,
              borderWidth: mode === 'guest' ? 3 : 0,
              borderColor: theme.colors.primary.blue,
              borderRadius: theme.borderRadius.lg,
              ...theme.shadows.md,
            },
          ]}
          onPress={() => {
            setMode('guest');
            trigger(HapticType.MEDIUM);
          }}
        >
          <Text style={styles.modeIcon}>🎢</Text>
          <Text variant="title3" color="primary" style={styles.modeTitle}>
            Guest Mode
          </Text>
          <Text variant="caption1" color="secondary" style={styles.modeDescription}>
            Quick & simple 1-10 rating
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.modeCard,
            {
              backgroundColor: theme.colors.background.secondary,
              borderWidth: mode === 'enthusiast' ? 3 : 0,
              borderColor: theme.colors.primary.purple,
              borderRadius: theme.borderRadius.lg,
              ...theme.shadows.md,
            },
          ]}
          onPress={() => {
            setMode('enthusiast');
            trigger(HapticType.MEDIUM);
          }}
        >
          <Text style={styles.modeIcon}>⚡</Text>
          <Text variant="title3" color="primary" style={styles.modeTitle}>
            Enthusiast Mode
          </Text>
          <Text variant="caption1" color="secondary" style={styles.modeDescription}>
            Weighted criteria system with custom ratings
          </Text>
        </Pressable>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text variant="title2" color="primary" style={styles.stepTitle}>
        Select Park
      </Text>
      <Text variant="body" color="secondary" style={styles.stepSubtitle}>
        Where did you ride this coaster?
      </Text>

      <TextInput
        label="Park Name"
        placeholder="e.g., Cedar Point"
        value={parkName}
        onChangeText={setParkName}
        icon="🏰"
        autoCapitalize="words"
      />

      {/* TODO: Add autocomplete suggestions */}
      <Text variant="caption2" color="tertiary" style={styles.hint}>
        Autocomplete coming soon...
      </Text>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text variant="title2" color="primary" style={styles.stepTitle}>
        Select Coaster
      </Text>
      <Text variant="body" color="secondary" style={styles.stepSubtitle}>
        Which coaster did you ride at {parkName}?
      </Text>

      <TextInput
        label="Coaster Name"
        placeholder="e.g., Steel Vengeance"
        value={coasterName}
        onChangeText={setCoasterName}
        icon="🎢"
        autoCapitalize="words"
      />

      {/* TODO: Add filtered coaster suggestions based on park */}
      <Text variant="caption2" color="tertiary" style={styles.hint}>
        Coaster database coming soon...
      </Text>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text variant="title2" color="primary" style={styles.stepTitle}>
        Rate Your Experience
      </Text>

      {mode === 'guest' ? (
        <>
          <Text variant="body" color="secondary" style={styles.stepSubtitle}>
            How was your ride on {coasterName}?
          </Text>
          <Slider
            label="Overall Rating"
            value={overallRating}
            min={1}
            max={10}
            step={1}
            onChange={setOverallRating}
            color={theme.colors.primary.blue}
            snapOnRelease={true}
          />
        </>
      ) : (
        <>
          <Text variant="body" color="secondary" style={styles.stepSubtitle}>
            Rate each criterion for {coasterName}
          </Text>

          {/* Weighted Score Display */}
          <Card variant="elevated" style={styles.scoreCard}>
            <Text variant="caption1" color="secondary">
              Calculated Score
            </Text>
            <Text variant="largeTitle" color="primary" style={styles.scoreValue}>
              {calculateWeightedScore()}
            </Text>
          </Card>

          {/* Rating Criteria */}
          {RATING_CRITERIA.map((criteria) => (
            <View key={criteria.id}>
              <Slider
                label={`${criteria.icon} ${criteria.label}`}
                value={criteriaRatings[criteria.id]}
                min={1}
                max={10}
                step={1}
                onChange={(val) =>
                  setCriteriaRatings((prev) => ({ ...prev, [criteria.id]: val }))
                }
                color={criteria.color}
                snapOnRelease={true}
              />
            </View>
          ))}

          {/* Weight Editor */}
          <Text variant="title3" color="primary" style={styles.sectionTitle}>
            Adjust Weights
          </Text>
          <Text variant="caption1" color="secondary" style={styles.sectionSubtitle}>
            Lock criteria to prevent auto-balancing
          </Text>

          {RATING_CRITERIA.map((criteria) => {
            const maxAllowed = getMaxAllowedWeight(criteria.id);
            const isLocked = lockedCriteria.has(criteria.id);
            const isDisabled = maxAllowed === 0 && !isLocked;

            return (
              <View key={criteria.id}>
                <Slider
                  label={`${criteria.icon} ${criteria.label}`}
                  value={Math.round(criteriaWeights[criteria.id])}
                  min={0}
                  max={100} // Always 100 for visual range
                  dynamicMax={maxAllowed} // Dynamic constraint
                  step={1}
                  onChange={(val) => handleWeightChange(criteria.id, val)}
                  onDragStart={() => setDraggingCriteria(criteria.id)}
                  onDragEnd={() => setDraggingCriteria(null)}
                  color={criteria.color}
                  locked={isLocked}
                  disabled={isDisabled}
                  onLockToggle={() => toggleLock(criteria.id)}
                  allowOverscroll={true}
                  snapOnRelease={true}
                />
              </View>
            );
          })}
        </>
      )}

      {/* Notes */}
      <TextInput
        label="Notes (optional)"
        placeholder="Add your thoughts about this ride..."
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={4}
        containerStyle={{ marginTop: 24 }}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Progress Bar */}
      {renderProgressBar()}

      {/* Form Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={[styles.footer, { borderTopColor: theme.colors.border.primary }]}>
        <Button
          title="Back"
          onPress={handleBack}
          variant="secondary"
          style={styles.footerButton}
        />
        {step < 4 ? (
          <Button
            title="Next"
            onPress={handleNext}
            variant="primary"
            disabled={!canGoNext()}
            style={styles.footerButton}
          />
        ) : (
          <Button
            title="Log Ride"
            onPress={handleSubmit}
            variant="primary"
            style={styles.footerButton}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  progressSegment: {
    flex: 1,
    height: 4,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    marginBottom: 8,
    fontWeight: '700',
  },
  stepSubtitle: {
    marginBottom: 32,
  },
  modeCards: {
    gap: 16,
  },
  modeCard: {
    padding: 24,
    alignItems: 'center',
  },
  modeIcon: {
    fontSize: 48,
    lineHeight: 60,
    marginBottom: 12,
  },
  modeTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  modeDescription: {
    textAlign: 'center',
  },
  hint: {
    marginTop: -8,
    fontStyle: 'italic',
  },
  scoreCard: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreValue: {
    fontWeight: '700',
    marginTop: 4,
  },
  sectionTitle: {
    marginTop: 32,
    marginBottom: 8,
    fontWeight: '700',
  },
  sectionSubtitle: {
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
  },
  footerButton: {
    flex: 1,
  },
});

export default LoggerScreen;
