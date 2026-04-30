import type { GetThemeOptions } from './helper'
import { createThemeHelpers } from './helper'

/** Strip alpha channel from hex colors (e.g. #dbd7caee → #dbd7ca) */
function stripAlpha(hex: string): string {
  if (hex.startsWith('#') && hex.length === 9)
    return hex.slice(0, 7)
  return hex
}

export function getGhosttyTheme(options: GetThemeOptions): string {
  const { pick, v } = createThemeHelpers(options)

  const background = stripAlpha(v('background')!)
  const foreground = stripAlpha(v('foreground')!)
  const cursor = foreground
  const selectionBg = pick({ light: '#d0d0d0', dark: '#3d3d3d' })
  const selectionFg = foreground

  const palette: Record<number, string> = {
    // Normal colors (0-7)
    0: stripAlpha(v('background')!), // black
    1: stripAlpha(v('red')!), // red
    2: stripAlpha(v('green')!), // green
    3: stripAlpha(v('yellow')!), // yellow
    4: stripAlpha(v('blue')!), // blue
    5: stripAlpha(v('magenta')!), // magenta
    6: stripAlpha(v('cyan')!), // cyan
    7: stripAlpha(v('foreground')!), // white
    // Bright colors (8-15)
    8: pick({ light: '#aaaaaa', dark: '#777777' })!, // bright black
    9: stripAlpha(v('red')!), // bright red
    10: stripAlpha(v('green')!), // bright green
    11: stripAlpha(v('yellow')!), // bright yellow
    12: stripAlpha(v('blue')!), // bright blue
    13: stripAlpha(v('magenta')!), // bright magenta
    14: stripAlpha(v('cyan')!), // bright cyan
    15: pick({ light: '#dddddd', dark: '#ffffff' })!, // bright white
  }

  const lines: string[] = [
    `background = ${background}`,
    `foreground = ${foreground}`,
    `cursor-color = ${cursor}`,
    `cursor-text = ${background}`,
    `selection-background = ${selectionBg}`,
    `selection-foreground = ${selectionFg}`,
    '',
    ...Object.entries(palette).map(([i, color]) => `palette = ${i}=${color}`),
  ]

  return lines.join('\n')
}
