/**
 * Tailwind config — driven by design tokens.
 *
 * Strategy:
 *  - `darkMode: 'class'` toggles between dark/light via the `.dark` class on <html>.
 *  - Colors that change between themes are referenced via CSS variables defined
 *    in src/styles/tokens.css. This lets us write `bg-bg-default` and have it
 *    automatically resolve to the right value per theme.
 *  - Theme-stable tokens (fontSize, spacing, radius, motion, container widths)
 *    are mirrored from _workspace/design/tokens.json directly.
 */

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--color-bg-default)',
          default: 'var(--color-bg-default)',
          elevated: 'var(--color-bg-elevated)',
          muted: 'var(--color-bg-muted)',
          overlay: 'var(--color-bg-overlay)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          disabled: 'var(--color-text-disabled)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          muted: 'var(--color-accent-muted)',
          ring: 'var(--color-accent-ring)',
        },
        border: {
          DEFAULT: 'var(--color-border-default)',
          subtle: 'var(--color-border-subtle)',
          strong: 'var(--color-border-strong)',
        },
        semantic: {
          success: 'var(--color-semantic-success)',
          warning: 'var(--color-semantic-warning)',
          error: 'var(--color-semantic-error)',
          info: 'var(--color-semantic-info)',
        },
      },
      backgroundImage: {
        'accent-gradient': 'var(--accent-gradient)',
        'accent-gradient-subtle': 'var(--accent-gradient-subtle)',
        'accent-gradient-border': 'var(--accent-gradient-border)',
      },
      textColor: {
        // Aliases for ergonomic class names like `text-primary` / `text-secondary`.
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        muted: 'var(--color-text-muted)',
        disabled: 'var(--color-text-disabled)',
      },
      borderColor: {
        DEFAULT: 'var(--color-border-default)',
        subtle: 'var(--color-border-subtle)',
        strong: 'var(--color-border-strong)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'Pretendard',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        serif: ['Source Serif 4', 'Noto Serif KR', 'Georgia', 'serif'],
        mono: [
          'JetBrains Mono',
          'D2Coding',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },
      fontSize: {
        display: 'clamp(2.75rem, 6vw, 4.25rem)',
        h1: 'clamp(1.875rem, 3vw, 2.375rem)',
        h2: 'clamp(1.25rem, 2vw, 1.5rem)',
        h3: '1.125rem',
        body: '1rem',
        small: '0.875rem',
        micro: '0.75rem',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.02em',
        normal: '0',
        wide: '0.04em',
        wider: '0.08em',
      },
      lineHeight: {
        tight: '1.12',
        snug: '1.3',
        normal: '1.55',
        relaxed: '1.7',
      },
      spacing: {
        // Standard scale (extends Tailwind defaults; keys present in tokens.json).
        card: '1.5rem',
        section: '6rem',
        'section-lg': '8rem',
        tight: '0.5rem',
      },
      maxWidth: {
        content: '64rem',
        prose: '42rem',
        wide: '72rem',
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        elevated: 'var(--shadow-elevated)',
        focus: 'var(--shadow-focus)',
        glow: 'var(--shadow-glow)',
      },
      transitionDuration: {
        instant: '100ms',
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
        slower: '450ms',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
        accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
        emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
      },
      zIndex: {
        base: '0',
        raised: '10',
        sticky: '40',
        overlay: '60',
        modal: '80',
        toast: '100',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      animation: {
        'fade-in': 'fade-in 300ms cubic-bezier(0, 0, 0.2, 1) both',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
