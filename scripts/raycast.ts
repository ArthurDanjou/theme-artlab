import type { GetThemeOptions } from './helper'
import { createThemeHelpers } from './helper'

interface RaycastTheme {
  author: string
  authorUsername: string
  version: string
  name: string
  appearance: 'light' | 'dark'
  colors: {
    background: string
    backgroundSecondary: string
    text: string
    selection: string
    loader: string
    red: string
    orange: string
    yellow: string
    green: string
    blue: string
    purple: string
    magenta: string
  }
}

export function getRaycastTheme(options: GetThemeOptions): RaycastTheme {
  const { v } = createThemeHelpers(options)

  return {
    author: 'Arthur Danjou',
    authorUsername: 'ArthurDanjou',
    version: '1',
    name: options.name,
    appearance: options.color,
    colors: {
      background: v('background')!,
      backgroundSecondary: v('activeBackground')!,
      text: v('foreground')!,
      selection: v('primary')!,
      loader: v('primary')!,
      red: v('red')!,
      orange: v('orange')!,
      yellow: v('yellow')!,
      green: v('green')!,
      blue: v('blue')!,
      purple: v('keyword')!,
      magenta: v('magenta')!,
    },
  }
}
