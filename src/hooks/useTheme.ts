/**
 * useTheme Hook
 * Provides easy access to theme tokens throughout the app
 *
 * @example
 * const { colors, spacing, typography } = useTheme();
 */

import { theme } from '@/theme';

export const useTheme = () => {
  return theme;
};

export default useTheme;
