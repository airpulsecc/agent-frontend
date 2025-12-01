import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// OKLCH color values [lightness, chroma, hue] - keep in sync with index.css
const CHANCE_COLORS = {
  destructive: [0.6368, 0.2078, 25.33],
  warning: [0.8, 0.18, 85],
  success: [0.7573, 0.2628, 146.61],
} as const;

/**
 * Interpolates color from red (0%) through yellow (50%) to green (90%+)
 * Uses OKLCH color space for perceptually uniform transitions
 * 0-50%: red → yellow
 * 50-70%: yellow → yellow-green
 * 70-90%: yellow-green → green
 * 90%+: full green
 */
export function getChanceColor(percentage: number): string {
  const p = Math.min(Math.max(percentage, 0), 100);
  const { destructive: red, warning: yellow, success: green } = CHANCE_COLORS;

  let from: readonly number[], to: readonly number[], t: number;

  if (p <= 50) {
    // Red to Yellow (0-50%)
    from = red;
    to = yellow;
    t = p / 50;
  } else if (p <= 70) {
    // Yellow to mid-point (50-70%)
    from = yellow;
    to = green;
    t = (p - 50) / 40; // reaches 0.5 at 70%
  } else if (p < 90) {
    // Mid-point to green (70-90%)
    from = yellow;
    to = green;
    t = 0.5 + (p - 70) / 40; // 0.5 to 1.0
  } else {
    // Full green (90%+)
    return `oklch(${green[0]} ${green[1]} ${green[2]})`;
  }

  const l = from[0] + (to[0] - from[0]) * t;
  const c = from[1] + (to[1] - from[1]) * t;
  const h = from[2] + (to[2] - from[2]) * t;

  return `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})`;
}
