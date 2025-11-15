/**
 * DailyChallenges Component - TrackR
 * Shows which daily challenges have been completed
 * Coastle and Trivia count toward daily streak
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/base';
import { useTheme } from '@/hooks';
import { DailyChallenges as DailyChallengesType } from '@/types/games';

interface DailyChallengesProps {
  challenges: DailyChallengesType;
}

interface ChallengeRowProps {
  icon: string;
  text: string;
  completed: boolean;
  color: string;
}

const ChallengeRow: React.FC<ChallengeRowProps> = ({ icon, text, completed, color }) => {
  return (
    <View style={styles.challengeRow}>
      <Text
        style={[
          styles.challengeIcon,
          { color: color, opacity: completed ? 1.0 : 0.4 },
        ] as any}
      >
        {icon}
      </Text>
      <Text
        variant="callout"
        color={completed ? 'primary' : 'tertiary'}
        style={styles.challengeText}
      >
        {text}
      </Text>
    </View>
  );
};

export const DailyChallenges: React.FC<DailyChallengesProps> = ({ challenges }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.lg,
          ...theme.shadows.md,
        },
      ]}
    >
      {/* Header */}
      <Text variant="title3" color="primary" style={styles.header}>
        Daily Challenges
      </Text>

      {/* Coastle */}
      <ChallengeRow
        icon={challenges.coastleComplete ? '✓' : '○'}
        text={challenges.coastleComplete ? 'Coastle complete' : 'Coastle not started'}
        completed={challenges.coastleComplete}
        color={theme.colors.game.correct}
      />

      {/* Trivia */}
      <ChallengeRow
        icon={challenges.triviaComplete ? '✓' : '○'}
        text={challenges.triviaComplete ? 'Trivia complete' : 'Trivia not started'}
        completed={challenges.triviaComplete}
        color={theme.colors.game.correct}
      />

      {/* Info message */}
      <Text variant="footnote" color="tertiary" style={styles.infoText}>
        Complete at least one daily challenge to keep your streak!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 24,
  },
  header: {
    marginBottom: 12,
    fontWeight: '600',
  },
  challengeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  challengeIcon: {
    fontSize: 20,
    lineHeight: 26, // CRITICAL: Prevent emoji clipping
    marginRight: 12,
    width: 26,
    textAlign: 'center',
    fontWeight: '700',
  },
  challengeText: {
    flex: 1,
  },
  infoText: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8E7E5',
  },
});

export default DailyChallenges;
