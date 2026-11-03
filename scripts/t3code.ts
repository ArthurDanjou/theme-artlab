import type { GetThemeOptions } from './helper'
import Color from 'color'
import { createThemeHelpers } from './helper'

export type T3CodeAppearance = 'light' | 'dark'

export interface T3CodeThemeColors {
  canvas: string
  chrome: string
  toolbar: string
  toolbarForeground: string
  toolbarBorder: string
  toolbarControl: string
  toolbarControlForeground: string
  toolbarControlHover: string
  surface: string
  surfaceRaised: string
  surfaceOverlay: string
  text: string
  textMuted: string
  border: string
  input: string
  focus: string
  accent: string
  accentForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  placeholder: string
  secondaryLabel: string
  iconMuted: string
  error: string
  errorForeground: string
  errorSurface: string
  warning: string
  warningForeground: string
  warningSurface: string
  update: string
  updateForeground: string
  updateSurface: string
  accentSurface: string
  accentSurfaceForeground: string
  messageSurface: string
  messageForeground: string
  messageAction: string
  messageActionForeground: string
  messageActionHover: string
  codeBackground: string
  codeForeground: string
  searchMatchBackground: string
  searchMatchForeground: string
  searchMatchActiveBackground: string
  searchMatchActiveForeground: string
  sidebar: string
  sidebarForeground: string
  sidebarMutedForeground: string
  sidebarControlSurface: string
  sidebarRowHover: string
  sidebarRowActive: string
  sidebarRowSelected: string
  sidebarBorder: string
  terminalBackground: string
  terminalForeground: string
  terminalCursor: string
  terminalSelection: string
  terminalScrollbar: string
  terminalScrollbarHover: string
}

export interface T3CodeThemeFile {
  version: 1
  id: string
  name: string
  appearance: T3CodeAppearance
  colors: T3CodeThemeColors
  variants?: Partial<Record<T3CodeAppearance, T3CodeThemeColors>>
}

/** Normalize a palette color to a six-digit lowercase hex without alpha. */
function normalize(hex: string): string {
  return Color(hex).hex().toLowerCase()
}

function mix(base: string, overlay: string, weight: number): string {
  return Color(base).mix(Color(overlay), weight).hex().toLowerCase()
}

function shift(hex: string, amount: number): string {
  const color = amount >= 0
    ? Color(hex).lighten(amount)
    : Color(hex).darken(-amount)
  return color.hex().toLowerCase()
}

export function getT3CodeTheme(): T3CodeThemeFile {
  return {
    version: 1,
    id: 'artlab',
    name: 'ArtLab',
    appearance: 'dark',
    colors: getT3CodeColors({ color: 'dark', name: 'ArtLab Dark' }),
    variants: {
      light: getT3CodeColors({ color: 'light', name: 'ArtLab Light' }),
    },
  }
}

function getT3CodeColors(options: GetThemeOptions): T3CodeThemeColors {
  const { pick, v } = createThemeHelpers(options)

  const background = normalize(v('background')!)
  const foreground = normalize(v('foreground')!)
  const primary = normalize(v('primary')!)
  const border = normalize(v('border')!)
  const activeBackground = normalize(v('activeBackground')!)
  const softBackground = normalize(v('softBackground')!)
  const softBorder = normalize(v('softBorder')!)
  const comment = normalize(v('comment')!)
  const red = normalize(v('red')!)
  const orange = normalize(v('orange')!)
  const yellow = normalize(v('yellow')!)
  const muted = pick({ light: shift(comment, -0.08), dark: comment })!

  return {
    canvas: background,
    chrome: background,
    toolbar: background,
    toolbarForeground: foreground,
    toolbarBorder: border,
    toolbarControl: activeBackground,
    toolbarControlForeground: foreground,
    toolbarControlHover: softBackground,
    surface: activeBackground,
    surfaceRaised: activeBackground,
    surfaceOverlay: softBackground,
    text: foreground,
    textMuted: muted,
    border,
    input: softBorder,
    focus: primary,
    accent: primary,
    accentForeground: pick({ light: foreground, dark: background })!,
    secondary: activeBackground,
    secondaryForeground: foreground,
    muted: activeBackground,
    mutedForeground: muted,
    placeholder: muted,
    secondaryLabel: muted,
    iconMuted: muted,
    error: red,
    errorForeground: pick({ light: shift(red, -0.08), dark: red })!,
    errorSurface: mix(background, red, 0.14),
    warning: orange,
    warningForeground: pick({ light: shift(orange, -0.3), dark: orange })!,
    warningSurface: mix(background, orange, 0.14),
    update: primary,
    updateForeground: pick({ light: foreground, dark: primary })!,
    updateSurface: mix(background, primary, 0.14),
    accentSurface: mix(background, primary, 0.1),
    accentSurfaceForeground: foreground,
    messageSurface: activeBackground,
    messageForeground: foreground,
    messageAction: primary,
    messageActionForeground: pick({ light: foreground, dark: background })!,
    messageActionHover: pick({ light: shift(primary, -0.08), dark: shift(primary, 0.08) })!,
    codeBackground: activeBackground,
    codeForeground: foreground,
    searchMatchBackground: mix(background, yellow, 0.3),
    searchMatchForeground: foreground,
    searchMatchActiveBackground: yellow,
    searchMatchActiveForeground: '#21180a',
    sidebar: background,
    sidebarForeground: foreground,
    sidebarMutedForeground: muted,
    sidebarControlSurface: activeBackground,
    sidebarRowHover: mix(background, foreground, 0.04),
    sidebarRowActive: mix(background, foreground, 0.07),
    sidebarRowSelected: mix(background, foreground, 0.1),
    sidebarBorder: border,
    terminalBackground: background,
    terminalForeground: foreground,
    terminalCursor: primary,
    terminalSelection: mix(background, foreground, 0.14),
    terminalScrollbar: mix(background, foreground, 0.18),
    terminalScrollbarHover: mix(background, foreground, 0.28),
  }
}
