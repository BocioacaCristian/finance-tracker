/**
 * Utility functions for handling theme-related styling
 */

type ThemeVariants<T> = {
  light: T;
  dark: T;
};

/**
 * Returns the appropriate class name based on the current theme
 * @param isDark Whether dark mode is active
 * @param variants Object containing class variants for light and dark modes
 * @returns The appropriate class name for the current theme
 */
export function getThemeClass<T>(isDark: boolean, variants: ThemeVariants<T>): T {
  return isDark ? variants.dark : variants.light;
}

/**
 * Common theme class combinations for reuse
 */
export const themeClasses = {
  // Backgrounds
  card: {
    light: 'bg-white',
    dark: 'bg-gray-800'
  },
  page: {
    light: 'bg-gray-50',
    dark: 'bg-gray-900'
  },
  input: {
    light: 'bg-gray-50',
    dark: 'bg-gray-700'
  },
  
  // Text colors
  heading: {
    light: 'text-gray-900',
    dark: 'text-gray-100'
  },
  subheading: {
    light: 'text-gray-700',
    dark: 'text-gray-300'
  },
  body: {
    light: 'text-gray-600',
    dark: 'text-gray-400'
  },
  hint: {
    light: 'text-gray-500',
    dark: 'text-gray-500'
  },
  
  // Borders
  border: {
    light: 'border-gray-200',
    dark: 'border-gray-700'
  },
  inputBorder: {
    light: 'border-gray-300',
    dark: 'border-gray-600'
  },
  
  // Button variants
  primaryButton: {
    light: 'bg-indigo-600 text-white hover:bg-indigo-700',
    dark: 'bg-indigo-600 text-white hover:bg-indigo-700'
  },
  secondaryButton: {
    light: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
    dark: 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
  },
}; 