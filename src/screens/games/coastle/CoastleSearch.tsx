/**
 * CoastleSearch Component
 * Autocomplete search bar for selecting roller coasters
 * Shows filtered results as user types
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Keyboard,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '@/components/base';
import { useTheme, useHaptic, HapticType } from '@/hooks';
import { MysteryCoaster } from './types';
import { searchCoasters } from './coastleData';

interface CoastleSearchProps {
  /** Callback when a coaster is selected */
  onSelect: (coaster: MysteryCoaster) => void;

  /** Whether the search is disabled (during animation) */
  disabled?: boolean;

  /** Placeholder text */
  placeholder?: string;

  /** Auto-focus on mount */
  autoFocus?: boolean;
}

export const CoastleSearch: React.FC<CoastleSearchProps> = ({
  onSelect,
  disabled = false,
  placeholder = 'Type coaster name...',
  autoFocus = false,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();
  const inputRef = useRef<TextInput>(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MysteryCoaster[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Search coasters as user types
  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchCoasters(query);
      setResults(searchResults);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  // Handle coaster selection
  const handleSelect = (coaster: MysteryCoaster) => {
    // Dismiss keyboard first to prevent blur interference
    Keyboard.dismiss();

    trigger(HapticType.SELECTION);
    // Call onSelect immediately
    onSelect(coaster);
    // Then update UI state
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  // Prevent blur when dropdown is visible - keep input focused
  const handleBlur = () => {
    // If dropdown is showing, keep input focused to prevent keyboard dismissal
    // The keyboard will be dismissed manually in handleSelect instead
    if (showResults && results.length > 0 && inputRef.current) {
      // Refocus immediately to prevent keyboard dismissal on dropdown taps
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  // Handle focus
  const handleFocus = () => {
    if (query.length >= 2) {
      setShowResults(true);
    }
  };

  // Handle tap outside - dismiss keyboard and dropdown
  const handleOutsideTap = () => {
    if (showResults) {
      setShowResults(false);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      {/* Backdrop to catch outside taps */}
      {showResults && (
        <View
          style={styles.backdrop}
          onTouchEnd={handleOutsideTap}
        />
      )}
      {/* Search Input */}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.colors.background.secondary,
            borderColor: showResults
              ? theme.colors.primary.blue
              : theme.colors.border.light,
            borderRadius: theme.borderRadius.md,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.body.fontSize,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.quaternary}
          value={query}
          onChangeText={setQuery}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoFocus={autoFocus}
          autoCapitalize="words"
          autoCorrect={false}
          editable={!disabled}
          returnKeyType="search"
          accessibilityLabel="Search for roller coaster"
          accessibilityHint="Type at least 2 characters to see results"
        />
      </View>

      {/* Autocomplete Results */}
      {showResults && results.length > 0 && (
        <View
          style={[
            styles.resultsContainer,
            {
              backgroundColor: theme.colors.background.secondary,
              borderColor: theme.colors.border.light,
              borderRadius: theme.borderRadius.md,
              ...theme.shadows.lg,
            },
          ]}
        >
          <ScrollView
            style={styles.resultsList}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={true}
          >
            {results.map((coaster) => (
              <TouchableOpacity
                key={coaster.id}
                style={[
                  styles.resultItem,
                  {
                    borderBottomColor: theme.colors.border.light,
                  },
                ]}
                onPress={() => handleSelect(coaster)}
                activeOpacity={0.7}
                accessibilityLabel={`${coaster.name}, ${coaster.park}, ${coaster.country}`}
                accessibilityRole="button"
              >
                <View style={styles.resultContent}>
                  <Text variant="headline" numberOfLines={1}>
                    {coaster.name}
                  </Text>
                  <Text
                    variant="subheadline"
                    color="secondary"
                    numberOfLines={1}
                  >
                    {coaster.park}
                  </Text>
                  <Text
                    variant="caption1"
                    color="tertiary"
                    numberOfLines={1}
                  >
                    {coaster.country}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* No Results Message */}
      {showResults && query.length >= 2 && results.length === 0 && (
        <View
          style={[
            styles.noResults,
            {
              backgroundColor: theme.colors.background.secondary,
              borderColor: theme.colors.border.light,
              borderRadius: theme.borderRadius.md,
              ...theme.shadows.md,
            },
          ]}
        >
          <Text variant="subheadline" color="tertiary" style={styles.noResultsText}>
            No coasters found for "{query}"
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 1000, // Ensure dropdown appears above other content
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: -1000, // Extend far left
    right: -1000, // Extend far right
    bottom: -5000, // Extend far down to catch all taps outside
    zIndex: 1500, // Between container and results
  },
  inputContainer: {
    height: 48,
    borderWidth: 2,
    paddingHorizontal: 16,
    justifyContent: 'center',
    zIndex: 2000, // Above backdrop
  },
  input: {
    height: '100%',
    padding: 0,
  },
  resultsContainer: {
    position: 'absolute',
    top: 56, // Just below input (48px height + 8px gap)
    left: 0,
    right: 0,
    maxHeight: 300,
    borderWidth: 1,
    overflow: 'hidden',
    zIndex: 2500, // Highest - above backdrop and input
  },
  resultsList: {
    flex: 1,
  },
  resultItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  resultContent: {
    gap: 4,
  },
  noResults: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    alignItems: 'center',
    zIndex: 2000, // Higher than container to appear above grid
  },
  noResultsText: {
    textAlign: 'center',
  },
});

export default CoastleSearch;
