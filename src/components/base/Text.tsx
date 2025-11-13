/**
 * Text Component
 * Typography component with design system integration
 * Provides consistent text styling throughout the app
 */

import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export type TextVariant =
  | 'display'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'headline'
  | 'body'
  | 'callout'
  | 'subheadline'
  | 'footnote'
  | 'caption1'
  | 'caption2';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'success'
  | 'warning'
  | 'error'
  | 'white';

export interface TextProps extends RNTextProps {
  /** Typography variant from design system */
  variant?: TextVariant;

  /** Text color from design system */
  color?: TextColor;

  /** Children text content */
  children: React.ReactNode;

  /** Custom style override */
  style?: TextStyle;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  children,
  style,
  ...props
}) => {
  const theme = useTheme();

  const textStyle: TextStyle[] = [
    theme.typography[variant],
    { color: getColor(color, theme) },
    style,
  ];

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};

// Helper function to get color from theme
const getColor = (color: TextColor, theme: ReturnType<typeof useTheme>): string => {
  switch (color) {
    case 'primary':
      return theme.colors.text.primary;
    case 'secondary':
      return theme.colors.text.secondary;
    case 'tertiary':
      return theme.colors.text.tertiary;
    case 'quaternary':
      return theme.colors.text.quaternary;
    case 'success':
      return theme.colors.semantic.success;
    case 'warning':
      return theme.colors.semantic.warning;
    case 'error':
      return theme.colors.semantic.error;
    case 'white':
      return '#FFFFFF';
    default:
      return theme.colors.text.primary;
  }
};

export default Text;
