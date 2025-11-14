/**
 * CoastleScreen - Main Coastle Game Screen
 * Roller coaster guessing game with 3x3 grid feedback
 * Daily and practice modes
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Modal,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
  withTiming,
  Easing,
  SlideInDown,
} from 'react-native-reanimated';
import { Text, Card } from '@/components/base';
import { useTheme, useHaptic, HapticType } from '@/hooks';
import {
  GameState,
  GameStatus,
  GameMode,
  MysteryCoaster,
  Guess,
  GAME_CONSTANTS,
} from './types';
import {
  getDailyCoaster,
  getRandomCoaster,
  getCurrentDayNumber,
} from './coastleData';
import { compareGuess, determineGameStatus } from './coastleLogic';
import { CoastleGrid } from './CoastleGrid';
import { CoastleSearch } from './CoastleSearch';
import { CoastleGameOver } from './CoastleGameOver';

/**
 * AnimatedPageIndicator Component
 * Separate component to avoid calling useAnimatedStyle inside .map()
 */
interface AnimatedPageIndicatorProps {
  index: number;
  screenWidth: number;
  scrollX: Animated.SharedValue<number>;
  theme: any;
}

const AnimatedPageIndicator: React.FC<AnimatedPageIndicatorProps> = ({
  index,
  screenWidth,
  scrollX,
  theme,
}) => {
  const inputRange = [
    (index - 1) * screenWidth,
    index * screenWidth,
    (index + 1) * screenWidth,
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      scrollX.value,
      inputRange,
      [8, 24, 8],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.4, 1, 0.4],
      Extrapolate.CLAMP
    );

    return {
      width,
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: 8,
          borderRadius: 4,
          backgroundColor: theme.colors.primary.blue,
        },
        animatedStyle,
      ]}
    />
  );
};

interface CoastleScreenProps {
  /** Navigation prop (if needed) */
  navigation?: any;

  /** Initial game mode (defaults to daily) */
  initialMode?: GameMode;
}

export const CoastleScreen: React.FC<CoastleScreenProps> = ({
  navigation,
  initialMode = GameMode.DAILY,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();

  // Game state
  const [gameState, setGameState] = useState<GameState>(() => {
    const dailyNumber = getCurrentDayNumber();
    const mysteryCoaster =
      initialMode === GameMode.DAILY
        ? getDailyCoaster(dailyNumber)
        : getRandomCoaster();

    return {
      dailyNumber,
      mysteryCoaster,
      guesses: [],
      currentGuessIndex: 0,
      status: GameStatus.IN_PROGRESS,
      mode: initialMode,
    };
  });

  const [showGameOver, setShowGameOver] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentAttemptPage, setCurrentAttemptPage] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);

  // Ref for horizontal scroll
  const scrollViewRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get('window').width;

  // Animated values for scroll-based animations
  const scrollX = useSharedValue(0);
  const prevScrollX = useSharedValue(0);
  const scrollDirection = useSharedValue(0); // 1 for forward, -1 for backward
  const currentGuessIndexShared = useSharedValue(gameState.currentGuessIndex);
  const buttonTranslateY = useSharedValue(0); // Actual button position (with speed cap)

  // Update shared value when guess index changes
  useEffect(() => {
    currentGuessIndexShared.value = gameState.currentGuessIndex;
  }, [gameState.currentGuessIndex, currentGuessIndexShared]);

  // Scroll handler for animated dot indicators and button position
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollX = event.contentOffset.x;

      // Detect scroll direction
      if (currentScrollX > prevScrollX.value) {
        scrollDirection.value = 1; // forward
      } else if (currentScrollX < prevScrollX.value) {
        scrollDirection.value = -1; // backward
      }

      prevScrollX.value = currentScrollX;
      scrollX.value = currentScrollX;
    },
  });

  // Animated style for Next button - tied to scroll position with speed cap
  const nextButtonAnimatedStyle = useAnimatedStyle(() => {
    const currentGuessIndexValue = currentGuessIndexShared.value;

    // If no guesses yet, hide button
    if (currentGuessIndexValue === 0) {
      buttonTranslateY.value = 200;
      return {
        transform: [{ translateY: 200 }],
      };
    }

    const lastCompletedPageX = (currentGuessIndexValue - 1) * screenWidth;
    const emptyPageX = currentGuessIndexValue * screenWidth;
    const threshold = screenWidth * 0.2; // 20% for the animation zone

    let targetTranslateY;

    // Bidirectional 80/20 rule with direction detection
    // Calculate TARGET position based on interpolation
    if (scrollDirection.value === 1) {
      // Forward scroll: visible for 80%, slide down in last 20%
      const inputRange = [lastCompletedPageX, emptyPageX - threshold, emptyPageX];
      const outputRange = [0, 0, 200];

      targetTranslateY = interpolate(
        scrollX.value,
        inputRange,
        outputRange,
        Extrapolate.CLAMP
      );
    } else if (scrollDirection.value === -1) {
      // Backward scroll: hidden for 80%, slide up in last 20%
      const inputRange = [lastCompletedPageX, lastCompletedPageX + threshold, emptyPageX];
      const outputRange = [0, 200, 200];

      targetTranslateY = interpolate(
        scrollX.value,
        inputRange,
        outputRange,
        Extrapolate.CLAMP
      );
    } else {
      // Default: use forward direction logic
      const inputRange = [lastCompletedPageX, emptyPageX - threshold, emptyPageX];
      const outputRange = [0, 0, 200];

      targetTranslateY = interpolate(
        scrollX.value,
        inputRange,
        outputRange,
        Extrapolate.CLAMP
      );
    }

    // Animate buttonTranslateY toward target with speed cap (250ms minimum duration)
    buttonTranslateY.value = withTiming(targetTranslateY, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });

    return {
      transform: [{ translateY: buttonTranslateY.value }],
    };
  });

  // Check if game should end after each guess
  useEffect(() => {
    const status = determineGameStatus(
      gameState.guesses,
      GAME_CONSTANTS.MAX_GUESSES
    );

    if (status !== GameStatus.IN_PROGRESS) {
      setGameState((prev) => ({ ...prev, status }));

      // Show game over modal after animation completes
      setTimeout(() => {
        setShowGameOver(true);
      }, GAME_CONSTANTS.CELL_ANIMATION_STAGGER * 9 + 500);
    }
  }, [gameState.guesses]);

  // Handle coaster selection
  const handleGuess = (coaster: MysteryCoaster) => {
    if (isAnimating || gameState.status !== GameStatus.IN_PROGRESS) {
      return;
    }

    // Set animating state
    setIsAnimating(true);

    // Generate feedback
    const gridFeedback = compareGuess(coaster, gameState.mysteryCoaster);

    // Create guess object
    const newGuess: Guess = {
      coaster,
      gridFeedback,
      timestamp: new Date(),
    };

    // Update game state
    setGameState((prev) => ({
      ...prev,
      guesses: [...prev.guesses, newGuess],
      currentGuessIndex: prev.currentGuessIndex + 1,
    }));

    // Re-enable search after animation
    setTimeout(() => {
      setIsAnimating(false);
    }, GAME_CONSTANTS.CELL_ANIMATION_STAGGER * 9 + 500);
  };

  // Handle play again (practice mode)
  const handlePlayAgain = () => {
    const newCoaster = getRandomCoaster();
    setGameState({
      dailyNumber: getCurrentDayNumber(),
      mysteryCoaster: newCoaster,
      guesses: [],
      currentGuessIndex: 0,
      status: GameStatus.IN_PROGRESS,
      mode: GameMode.PRACTICE,
    });
    setShowGameOver(false);
    setIsAnimating(false);
  };

  // Handle play practice mode
  const handlePlayPractice = () => {
    const newCoaster = getRandomCoaster();
    setGameState({
      dailyNumber: getCurrentDayNumber(),
      mysteryCoaster: newCoaster,
      guesses: [],
      currentGuessIndex: 0,
      status: GameStatus.IN_PROGRESS,
      mode: GameMode.PRACTICE,
    });
    setShowGameOver(false);
    setIsAnimating(false);
  };

  // Handle return to hub
  const handleReturnToHub = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  // Handle exit button press (show modal)
  const handleExitPress = () => {
    trigger(HapticType.SELECTION);
    setShowExitModal(true);
  };

  // Handle confirmed exit to games hub
  const handleConfirmExit = () => {
    trigger(HapticType.SELECTION);
    setShowExitModal(false);
    setTimeout(() => {
      if (navigation) {
        navigation.goBack();
      }
    }, 0);
  };

  // Handle cancel exit
  const handleCancelExit = () => {
    trigger(HapticType.SELECTION);
    setShowExitModal(false);
  };

  // Handle next attempt
  const handleNextAttempt = () => {
    if (currentAttemptPage < gameState.currentGuessIndex) {
      const nextPage = currentAttemptPage + 1;
      // Don't update currentAttemptPage here - let onMomentumScrollEnd handle it
      // This keeps the button mounted during the scroll animation
      scrollViewRef.current?.scrollTo({
        x: nextPage * screenWidth,
        animated: true,
      });
      trigger(HapticType.SELECTION);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme.colors.background.primary },
      ]}
    >
      <View style={styles.container}>
        {/* Header */}
        <View
          style={[
            styles.header,
            { paddingHorizontal: theme.spacing.sm },
          ]}
        >
          <View style={styles.headerLeft}>
            <Text variant="title1">Coastle</Text>
            {gameState.mode === GameMode.PRACTICE && (
              <View
                style={[
                  styles.practiceBadge,
                  {
                    backgroundColor: theme.colors.primary.purple,
                    borderRadius: theme.borderRadius.sm,
                  },
                ]}
              >
                <Text
                  variant="caption1"
                  color="white"
                  style={styles.practiceBadgeText}
                >
                  PRACTICE
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={handleExitPress}
            style={[
              styles.exitButton,
              {
                borderColor: theme.colors.text.primary,
              },
            ]}
            accessibilityLabel="Exit game"
            accessibilityRole="button"
          >
            <Text
              variant="title3"
              style={{
                ...styles.exitIcon,
                lineHeight: 30,
                color: theme.colors.text.primary,
              }}
            >
              ✕
            </Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal scrolling attempts */}
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          snapToInterval={screenWidth}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          scrollEnabled={gameState.currentGuessIndex > 0}
          style={styles.horizontalScroll}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(event) => {
            const page = Math.round(
              event.nativeEvent.contentOffset.x / screenWidth
            );

            // Prevent scrolling beyond current guess index
            if (page > gameState.currentGuessIndex) {
              scrollViewRef.current?.scrollTo({
                x: gameState.currentGuessIndex * screenWidth,
                animated: true,
              });
              return;
            }

            setCurrentAttemptPage(page);
          }}
        >
          {/* Render only pages up to current attempt (completed + next empty) */}
          {Array.from({ length: gameState.currentGuessIndex + 1 }).map((_, attemptIndex) => {
            const guess = gameState.guesses[attemptIndex];
            const isCurrentAttempt = attemptIndex === gameState.currentGuessIndex;
            const isPastAttempt = attemptIndex < gameState.currentGuessIndex;

            return (
              <View
                key={attemptIndex}
                style={[
                  styles.attemptPage,
                  { width: screenWidth },
                ]}
              >
                <ScrollView
                  style={styles.attemptScrollView}
                  contentContainerStyle={[
                    styles.attemptContent,
                    { paddingHorizontal: theme.spacing.sm },
                  ]}
                  showsVerticalScrollIndicator={true}
                  keyboardShouldPersistTaps="handled"
                >
                  {/* Attempt header */}
                  <Text variant="title3" style={styles.attemptTitle}>
                    Attempt {attemptIndex + 1} of {GAME_CONSTANTS.MAX_GUESSES}
                  </Text>

                  {/* Search bar (only for current attempt) */}
                  {isCurrentAttempt && gameState.status === GameStatus.IN_PROGRESS && (
                    <View style={styles.searchContainer}>
                      <CoastleSearch
                        onSelect={handleGuess}
                        disabled={isAnimating}
                        autoFocus={attemptIndex === 0 && currentAttemptPage === 0}
                      />
                    </View>
                  )}

                  {/* Grid display */}
                  <View style={styles.gridSection}>
                    {isPastAttempt && guess ? (
                      // Past attempt - show result
                      <View style={styles.resultContainer}>
                        <View
                          style={[
                            styles.resultCard,
                            {
                              backgroundColor: theme.colors.background.secondary,
                              borderRadius: theme.borderRadius.lg,
                              paddingHorizontal: 12,
                              paddingVertical: 8,
                              marginBottom: 16,
                              ...theme.shadows.sm,
                            },
                          ]}
                        >
                          <Text variant="callout" style={{ ...styles.guessName, fontWeight: '700' }}>
                            {guess.coaster.name}
                          </Text>
                          <Text variant="caption1" color="secondary">
                            {guess.coaster.park}
                          </Text>
                        </View>
                        <CoastleGrid feedback={guess.gridFeedback} revealed={true} />
                      </View>
                    ) : isCurrentAttempt && guess ? (
                      // Current attempt - just submitted
                      <View style={styles.resultContainer}>
                        <View
                          style={[
                            styles.resultCard,
                            {
                              backgroundColor: theme.colors.background.secondary,
                              borderRadius: theme.borderRadius.lg,
                              paddingHorizontal: 12,
                              paddingVertical: 8,
                              marginBottom: 16,
                              ...theme.shadows.sm,
                            },
                          ]}
                        >
                          <Text variant="callout" style={{ ...styles.guessName, fontWeight: '700' }}>
                            {guess.coaster.name}
                          </Text>
                          <Text variant="caption1" color="secondary">
                            {guess.coaster.park}
                          </Text>
                        </View>
                        <CoastleGrid feedback={guess.gridFeedback} revealed={true} />
                      </View>
                    ) : (
                      // Empty state - show placeholder grid
                      <View style={styles.emptyGridContainer}>
                        <CoastleGrid revealed={false} />
                        {isCurrentAttempt && (
                          <Text
                            variant="caption1"
                            color="tertiary"
                            style={styles.emptyGridHint}
                          >
                            {attemptIndex === 0
                              ? 'Type a coaster name to make your first guess'
                              : 'Search for a coaster above'}
                          </Text>
                        )}
                      </View>
                    )}
                  </View>

                  {/* Bottom padding - removed for consistent 16px spacing */}
                </ScrollView>
              </View>
            );
          })}
        </Animated.ScrollView>

        {/* Global Animated Next button (toast) */}
        {gameState.guesses.length > 0 &&
          gameState.status === GameStatus.IN_PROGRESS && (
            <Animated.View
              style={[
                styles.globalNextButtonContainer,
                nextButtonAnimatedStyle,
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  {
                    backgroundColor: theme.colors.primary.blue,
                    borderRadius: theme.borderRadius.md,
                    ...theme.shadows.md,
                  },
                ]}
                onPress={() => {
                  // Only allow press if on a completed page
                  if (gameState.guesses[currentAttemptPage] && currentAttemptPage < gameState.currentGuessIndex) {
                    handleNextAttempt();
                  }
                }}
                activeOpacity={0.8}
                disabled={!gameState.guesses[currentAttemptPage] || currentAttemptPage >= gameState.currentGuessIndex}
              >
                <Text
                  variant="headline"
                  style={{ ...styles.nextButtonText, color: '#FFFFFF' }}
                >
                  Next Attempt →
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}

        {/* Animated Page indicators */}
        <View
          style={[
            styles.pageIndicators,
            { paddingHorizontal: theme.spacing.sm },
          ]}
        >
          {Array.from({ length: gameState.currentGuessIndex + 1 }).map((_, index) => {
            return (
              <AnimatedPageIndicator
                key={index}
                index={index}
                screenWidth={screenWidth}
                scrollX={scrollX}
                theme={theme}
              />
            );
          })}
        </View>

        {/* Game Over Modal */}
        <CoastleGameOver
          visible={showGameOver}
          gameStatus={gameState.status}
          gameMode={gameState.mode}
          mysteryCoaster={gameState.mysteryCoaster}
          guesses={gameState.guesses}
          dailyNumber={gameState.dailyNumber}
          onPlayAgain={handlePlayAgain}
          onPlayPractice={handlePlayPractice}
          onReturnToHub={handleReturnToHub}
          onClose={() => setShowGameOver(false)}
        />

        {/* Exit confirmation modal */}
        <Modal
          visible={showExitModal}
          transparent
          animationType="fade"
          onRequestClose={handleCancelExit}
        >
          <View style={styles.modalOverlay}>
            <Animated.View entering={SlideInDown.springify().damping(17).stiffness(135)}>
              <Card
                variant="elevated"
                style={[
                  styles.exitModalCard,
                  {
                    backgroundColor: theme.colors.background.primary,
                    borderRadius: theme.borderRadius.xl,
                    ...theme.shadows.xl,
                  },
                ]}
              >
                {/* Warning emoji */}
                <Text
                  style={{
                    fontSize: 48,
                    lineHeight: 60,
                    textAlign: 'center',
                    marginBottom: 16,
                  }}
                >
                  ⚠️
                </Text>

                {/* Title */}
                <Text
                  variant="title2"
                  style={[
                    styles.modalTitle,
                    {
                      color: theme.colors.text.primary,
                    },
                  ]}
                >
                  Exit Game?
                </Text>

                {/* Message */}
                <Text
                  variant="body"
                  color="secondary"
                  style={styles.modalMessage}
                >
                  Your progress will be lost. Are you sure you want to exit?
                </Text>

                {/* Buttons */}
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[
                      styles.modalButton,
                      styles.cancelButton,
                      {
                        backgroundColor: theme.colors.background.secondary,
                        borderRadius: theme.borderRadius.md,
                      },
                    ]}
                    onPress={handleCancelExit}
                    activeOpacity={0.8}
                  >
                    <Text
                      variant="headline"
                      style={{
                        color: theme.colors.text.primary,
                        fontWeight: '600',
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.modalButton,
                      styles.exitButtonConfirm,
                      {
                        backgroundColor: theme.colors.semantic.error,
                        borderRadius: theme.borderRadius.md,
                        ...theme.shadows.md,
                      },
                    ]}
                    onPress={handleConfirmExit}
                    activeOpacity={0.8}
                  >
                    <Text
                      variant="headline"
                      style={{
                        color: '#FFFFFF',
                        fontWeight: '600',
                      }}
                    >
                      Exit Game
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </Animated.View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  practiceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  practiceBadgeText: {
    fontWeight: '700',
    letterSpacing: 1,
  },
  exitButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  exitIcon: {
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  exitModalCard: {
    width: Math.min(Dimensions.get('window').width - 32, 400),
    padding: 24,
  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 12,
  },
  modalMessage: {
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  cancelButton: {
    // Styles applied inline
  },
  exitButtonConfirm: {
    // Styles applied inline
  },
  horizontalScroll: {
    flex: 1,
  },
  attemptPage: {
    flex: 1,
  },
  attemptScrollView: {
    flex: 1,
  },
  attemptContent: {
    paddingTop: 16,
    paddingBottom: 0,
  },
  attemptTitle: {
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 16,
    zIndex: 1000, // Ensure search dropdown appears above grid
  },
  gridSection: {
    marginTop: 0,
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultCard: {
    width: '100%',
    gap: 8,
  },
  guessName: {
    marginBottom: 4,
  },
  emptyGridContainer: {
    alignItems: 'center',
    gap: 16,
    marginTop: 32,
  },
  emptyGridHint: {
    textAlign: 'center',
    marginTop: 8,
  },
  globalNextButtonContainer: {
    position: 'absolute',
    bottom: 72, // Above page indicators (16px padding + 8px indicator + 16px padding + 32px spacing)
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  nextButton: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontWeight: '600',
  },
  pageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
});

export default CoastleScreen;
