/**
 * Centralized breakpoints and shared constants used across components.
 * This ensures consistent responsive design values throughout the portfolio.
 */

/**
 * Responsive design breakpoints (in pixels).
 * Used by LaptopModel.tsx and PortfolioAnimations.astro to detect mobile viewports.
 * Any change to these values propagates automatically to all components.
 */
export const BREAKPOINTS = {
  mobile: 768,
} as const;

/**
 * Type-safe breakpoint values derived from BREAKPOINTS object.
 * Use this for type assertions on media query breakpoint values.
 */
export type BreakpointValue = (typeof BREAKPOINTS)[keyof typeof BREAKPOINTS];
