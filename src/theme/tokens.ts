/**
 * Design Tokens for Randhawa & Tomar Digital
 * Single source of truth for spacing, typography, and layout constants
 */

export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '5rem',   // 80px
  '5xl': '6rem',   // 96px
} as const;

export const typography = {
  h1: {
    fontSize: '2.25rem',      // 36px
    lineHeight: '1.2',
    letterSpacing: '-0.01em',
    fontWeight: '700',
  },
  h2: {
    fontSize: '1.875rem',    // 30px
    lineHeight: '1.3',
    letterSpacing: '-0.01em',
    fontWeight: '600',
  },
  h3: {
    fontSize: '1.5rem',      // 24px
    lineHeight: '1.4',
    letterSpacing: '0',
    fontWeight: '600',
  },
  body: {
    fontSize: '1rem',        // 16px
    lineHeight: '1.6',
    fontWeight: '400',
  },
  bodySm: {
    fontSize: '0.875rem',    // 14px
    lineHeight: '1.5',
    fontWeight: '400',
  },
} as const;

export const layout = {
  containerMaxWidth: '1280px',
  gutters: {
    mobile: '16px',
    tablet: '24px',
    desktop: '32px',
  },
  sectionPadding: {
    mobile: '48px',
    desktop: '80px',
  },
} as const;

export const borderRadius = {
  sm: '0.375rem',   // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const;

