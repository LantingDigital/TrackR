/**
 * Trivia Results Screen
 * Displays final score, rank, and question breakdown
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Text, Button, Card } from '@/components/base';
import { useTheme } from '@/hooks';
import { TriviaGame, TriviaAnswer } from './types';
import {
  formatScore,
  calculateRank,
  getPerformanceMessage,
} from './triviaLogic';

interface TriviaResultsProps {
  /** Completed game data */
  game: TriviaGame;
  /** Callback to play again */
  onPlayAgain: () => void;
  /** Callback to view leaderboard */
  onViewLeaderboard?: () => void;
  /** Callback to return to games hub */
  onExit: () => void;
}

export const TriviaResults: React.FC<TriviaResultsProps> = ({
  game,
  onPlayAgain,
  onViewLeaderboard,
  onExit,
}) => {
  const theme = useTheme();

  const rank = calculateRank(game.score);
  const performanceMessage = getPerformanceMessage(
    game.score,
    game.answers.length
  );

  // Calculate correct answers
  const correctAnswers = game.answers.filter((a) => a.isCorrect).length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Emoji */}
      <Animated.View entering={FadeInDown.delay(0).duration(400)}>
        <View style={styles.header}>
          <Text
            style={[
              styles.emoji,
              {
                fontSize: 64,
                lineHeight: 80, // Prevent clipping
              },
            ]}
          >
            {correctAnswers === 5
              ? '🎉'
              : correctAnswers >= 4
              ? '🎊'
              : correctAnswers >= 3
              ? '👏'
              : '💪'}
          </Text>
        </View>
      </Animated.View>

      {/* Performance message */}
      <Animated.View entering={FadeInDown.delay(100).duration(400)}>
        <Text
          variant="title1"
          style={[
            styles.performanceText,
            {
              color: theme.colors.text.primary,
              marginBottom: 24,
            },
          ]}
        >
          {performanceMessage}
        </Text>
      </Animated.View>

      {/* Score card */}
      <Animated.View entering={FadeInDown.delay(200).duration(400)}>
        <Card variant="elevated" style={styles.scoreCard}>
          <Text
            variant="body"
            color="tertiary"
            style={styles.scoreLabel}
          >
            Final Score
          </Text>
          <Text
            variant="display"
            style={[
              styles.finalScore,
              {
                fontSize: 56,
                lineHeight: 64,
                color: theme.colors.primary.blue,
              },
            ]}
          >
            {formatScore(game.score)}
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="body" color="tertiary">
                Correct
              </Text>
              <Text
                variant="title2"
                style={{
                  color: theme.colors.semantic.success,
                }}
              >
                {correctAnswers}/5
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text variant="body" color="tertiary">
                Rank
              </Text>
              <Text
                variant="title2"
                style={{
                  color: theme.colors.primary.blue,
                }}
              >
                Top {rank}%
              </Text>
            </View>
          </View>
        </Card>
      </Animated.View>

      {/* Question breakdown */}
      <Animated.View entering={FadeInDown.delay(300).duration(400)}>
        <Text
          variant="title3"
          style={[
            styles.breakdownTitle,
            {
              color: theme.colors.text.primary,
            },
          ]}
        >
          Question Breakdown
        </Text>

        <View style={styles.breakdownList}>
          {game.answers.map((answer, index) => {
            const question = game.questions[index];
            return (
              <AnswerBreakdownCard
                key={question.id}
                questionNumber={index + 1}
                answer={answer}
                questionText={question.question}
              />
            );
          })}
        </View>
      </Animated.View>

      {/* Play Again button */}
      <Animated.View
        entering={FadeInDown.delay(400).duration(400)}
      >
        <Button
          title="Play Again"
          variant="primary"
          size="large"
          onPress={onPlayAgain}
          style={styles.button}
        />
      </Animated.View>

      {/* Back to Games button */}
      <Animated.View entering={FadeInDown.delay(500).duration(400)}>
        <Button
          title="Back to Games"
          variant="secondary"
          size="large"
          onPress={onExit}
          style={styles.button}
        />
      </Animated.View>
    </ScrollView>
  );
};

interface AnswerBreakdownCardProps {
  questionNumber: number;
  answer: TriviaAnswer;
  questionText: string;
}

const AnswerBreakdownCard: React.FC<AnswerBreakdownCardProps> = ({
  questionNumber,
  answer,
  questionText,
}) => {
  const theme = useTheme();

  return (
    <Card
      variant="flat"
      style={[
        styles.breakdownCard,
        {
          backgroundColor: theme.colors.background.secondary,
          borderLeftWidth: 4,
          borderLeftColor: answer.isCorrect
            ? theme.colors.semantic.success
            : theme.colors.semantic.error,
        },
      ]}
    >
      <View style={styles.breakdownHeader}>
        <View style={styles.breakdownLeft}>
          <Text
            style={[
              styles.breakdownIcon,
              {
                fontSize: 20,
                lineHeight: 26, // Prevent clipping
                color: answer.isCorrect
                  ? theme.colors.semantic.success
                  : theme.colors.semantic.error,
              },
            ]}
          >
            {answer.isCorrect ? '✓' : '✗'}
          </Text>
          <Text
            variant="body"
            style={[
              styles.breakdownQuestion,
              {
                color: theme.colors.text.secondary,
              },
            ]}
          >
            Q{questionNumber}
          </Text>
        </View>
        <Text
          variant="body"
          style={[
            styles.breakdownPoints,
            {
              color: answer.isCorrect
                ? theme.colors.semantic.success
                : theme.colors.text.tertiary,
              fontWeight: '700',
            },
          ]}
        >
          {answer.isCorrect ? `+${formatScore(answer.pointsEarned)}` : '+0'} pts
        </Text>
      </View>
      <Text
        variant="caption"
        color="tertiary"
        style={styles.breakdownQuestionText}
        numberOfLines={2}
      >
        {questionText}
      </Text>
      <View style={styles.breakdownMeta}>
        <Text variant="caption" color="quaternary">
          {answer.difficulty.charAt(0).toUpperCase() +
            answer.difficulty.slice(1)}
        </Text>
        {answer.isCorrect && (
          <>
            <Text variant="caption" color="quaternary">
              •
            </Text>
            <Text variant="caption" color="quaternary">
              {answer.timeRemaining.toFixed(1)}s remaining
            </Text>
          </>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  emoji: {
    textAlign: 'center',
  },
  performanceText: {
    textAlign: 'center',
  },
  scoreCard: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    borderRadius: 16,
  },
  scoreLabel: {
    marginBottom: 8,
  },
  finalScore: {
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E8E7E5',
  },
  breakdownTitle: {
    marginBottom: 16,
  },
  breakdownList: {
    gap: 12,
    marginBottom: 24,
  },
  breakdownCard: {
    padding: 16,
    borderRadius: 12,
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  breakdownIcon: {
    fontWeight: '700',
  },
  breakdownQuestion: {
    fontWeight: '700',
  },
  breakdownPoints: {
    fontVariant: ['tabular-nums'],
  },
  breakdownQuestionText: {
    marginBottom: 8,
  },
  breakdownMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    width: '100%',
    marginBottom: 12,
  },
});
