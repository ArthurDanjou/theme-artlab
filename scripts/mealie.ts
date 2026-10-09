import { createThemeHelpers } from './helper'

export function getMealieThemeFamily(): string {
  const light = createThemeHelpers({ color: 'light', name: 'ArtLab Light' })
  const dark = createThemeHelpers({ color: 'dark', name: 'ArtLab Dark' })

  const themes = {
    light: {
      THEME_LIGHT_PRIMARY: light.v('primary'),
      THEME_LIGHT_ACCENT: light.v('cyan'),
      THEME_LIGHT_SECONDARY: light.v('keyword'),
      THEME_LIGHT_SUCCESS: light.v('green'),
      THEME_LIGHT_INFO: light.v('blue'),
      THEME_LIGHT_WARNING: light.v('orange'),
      THEME_LIGHT_ERROR: light.v('red'),
    },
    dark: {
      THEME_DARK_PRIMARY: dark.v('primary'),
      THEME_DARK_ACCENT: dark.v('cyan'),
      THEME_DARK_SECONDARY: dark.v('keyword'),
      THEME_DARK_SUCCESS: dark.v('green'),
      THEME_DARK_INFO: dark.v('blue'),
      THEME_DARK_WARNING: dark.v('orange'),
      THEME_DARK_ERROR: dark.v('red'),
    },
  } as const

  const lines = [
    '# ArtLab theme for Mealie',
    '# Colors: ArtLab palette (Vitesse + Catppuccin)',
    '# Usage: reference this file with env_file in docker-compose.yml,',
    '# or copy the variables into the environment: section.',
    '# See https://mealie.io/documentation/getting-started/installation/backend-config/#theming',
    '',
  ]

  for (const [mode, vars] of Object.entries(themes)) {
    lines.push(`# ${mode === 'light' ? 'Light' : 'Dark'} mode colors`)
    for (const [key, value] of Object.entries(vars))
      lines.push(`${key}='${value}'`)
    lines.push('')
  }

  return `${lines.join('\n').trimEnd()}\n`
}
