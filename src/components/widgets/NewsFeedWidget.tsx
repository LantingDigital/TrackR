/**
 * News Feed Widget - TrackR
 * Displays latest coaster news from Screamscape
 * Phase 3 placeholder with mock data - actual API integration in later phase
 */

import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Text } from '@/components/base';
import { useTheme, useHaptic, HapticType } from '@/hooks';

export interface NewsArticle {
  id: string;
  title: string;
  source: string; // e.g., "Screamscape"
  date: string;
  excerpt?: string;
}

export interface NewsFeedWidgetProps {
  articles: NewsArticle[];
  onArticlePress?: (articleId: string) => void;
}

export const NewsFeedWidget: React.FC<NewsFeedWidgetProps> = ({
  articles,
  onArticlePress,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();

  const handleArticlePress = (articleId: string) => {
    trigger(HapticType.LIGHT);
    onArticlePress?.(articleId);
  };

  if (articles.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.colors.background.secondary }]}>
        <Text variant="body" color="tertiary" style={styles.emptyText}>
          No news available
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="title3" color="primary">
          News Feed
        </Text>
        <Text variant="caption1" style={{ color: theme.colors.primary.orange }}>
          🔥 Screamscape
        </Text>
      </View>

      <View style={styles.articlesList}>
        {articles.map((article, index) => (
          <Pressable
            key={article.id}
            style={[
              styles.articleCard,
              {
                backgroundColor: theme.colors.background.secondary,
                borderRadius: theme.borderRadius.md,
                borderBottomWidth: index < articles.length - 1 ? 1 : 0,
                borderBottomColor: theme.colors.border.light,
              },
            ]}
            onPress={() => handleArticlePress(article.id)}
            accessibilityLabel={`${article.title} from ${article.source}`}
            accessibilityHint="Tap to read full article"
            accessibilityRole="button"
          >
            <View style={styles.articleHeader}>
              <View style={styles.articleMeta}>
                <Text variant="caption2" color="tertiary">
                  {article.source}
                </Text>
                <Text variant="caption2" color="quaternary">
                  {' • '}
                </Text>
                <Text variant="caption2" color="quaternary">
                  {article.date}
                </Text>
              </View>
            </View>

            <Text
              variant="callout"
              color="primary"
              numberOfLines={2}
              style={styles.articleTitle}
            >
              {article.title}
            </Text>

            {article.excerpt && (
              <Text
                variant="caption1"
                color="secondary"
                numberOfLines={2}
                style={styles.articleExcerpt}
              >
                {article.excerpt}
              </Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  articlesList: {
    gap: 12,
  },
  articleCard: {
    padding: 16,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  articleExcerpt: {
    marginTop: 4,
  },
  emptyContainer: {
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
});

export default NewsFeedWidget;
