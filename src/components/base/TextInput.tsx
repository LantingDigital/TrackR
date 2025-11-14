/**
 * TextInput Component - TrackR
 * Themed text input with label, error states, and icons
 * Phase 4: Logger System
 */

import React, { useState } from 'react';
import { StyleSheet, View, TextInput as RNTextInput, TextInputProps as RNTextInputProps, Pressable } from 'react-native';
import { Text } from './Text';
import { useTheme } from '@/hooks';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  error?: string;
  icon?: string; // Emoji icon for now
  rightIcon?: string;
  onRightIconPress?: () => void;
  containerStyle?: any;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  icon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  ...textInputProps
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? theme.colors.error
    : isFocused
    ? theme.colors.primary.blue
    : theme.colors.border.secondary;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text variant="caption1" color="secondary" style={styles.label}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.colors.background.secondary,
            borderColor: borderColor,
            borderRadius: theme.borderRadius.md,
          },
        ]}
      >
        {icon && (
          <Text style={styles.icon}>{icon}</Text>
        )}

        <RNTextInput
          style={[
            styles.input,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.body.fontSize,
              fontWeight: '400',
            },
          ]}
          placeholderTextColor={theme.colors.text.tertiary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...textInputProps}
        />

        {rightIcon && (
          <Pressable onPress={onRightIconPress} hitSlop={8}>
            <Text style={styles.icon}>{rightIcon}</Text>
          </Pressable>
        )}
      </View>

      {error && (
        <Text variant="caption2" style={[styles.error, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    paddingHorizontal: 16,
    minHeight: 48,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  icon: {
    fontSize: 20,
    lineHeight: 26,
    marginRight: 8,
  },
  error: {
    marginTop: 4,
  },
});

export default TextInput;
