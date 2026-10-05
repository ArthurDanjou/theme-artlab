import type { GetThemeOptions } from './helper'
import { createThemeHelpers } from './helper'

export interface HomeAssistantThemeOptions {
  /**
   * Primary (accent) color, applied to both modes.
   * Must be a 6-digit hex color. Defaults to the ArtLab palette accent of each mode.
   */
  primaryColor?: string
  /**
   * Secondary color, applied to both modes.
   * Exposed as the `secondary-color` theme variable and used for secondary
   * interaction elements (hover, medium accent). Defaults to the primary color.
   */
  secondaryColor?: string
  /**
   * Include the card-mod CSS transition rules (smooth dark/light switching).
   * Defaults to true. The layout rules (mobile header hiding, dialog radius)
   * are always kept.
   */
  transitions?: boolean
}

function formatValue(value: any): string {
  return `"${String(value)}"`
}

// Section headers emitted in the generated YAML, keyed by the first variable
// of each section in the source order.
const SECTION_HEADERS: Record<string, string> = {
  'primary-font-family': 'Fonts',
  'text-color': 'Text',
  'mdc-text-field-fill-color': 'Text Fields and Dropdown',
  'app-header-background-color': 'Main Colors',
  'background-color': 'Background',
  'gray400': 'Grays',
  'pastel-blue': 'Pastel accents',
  'blue': 'Palette',
  'blue300': 'Color variants',
  'card-background-color': 'Card - geometry from Bubble v1.2',
  'paper-item-icon-color': 'Icons',
  'room-livingroom': 'Rooms',
  'sidebar-background-color': 'Sidebar',
  'paper-slider-knob-color': 'Sliders',
  'paper-toggle-button-checked-bar-color': 'Toggle',
  'switch-unchecked-color': 'Switch',
  'paper-radio-button-checked-color': 'Radio Button',
  'more-info-header-background': 'Popups',
  'table-row-background-color': 'Tables',
  'label-badge-background-color': 'Badges',
  'mini-media-player-base-color': 'Mini Mediaplayer',
}

// Numbered aliases consumed by the dashboard, all resolving to their artlab hue.
const NUMBERED_ALIASES: Record<string, string> = {
  blue300: 'var(--artlab-blue)',
  blue400: 'var(--artlab-blue)',
  blue500: 'var(--artlab-blue)',
  green300: 'var(--artlab-green)',
  green400: 'var(--artlab-green)',
  green500: 'var(--artlab-green)',
  green600: 'var(--artlab-green)',
  orange400: 'var(--artlab-orange)',
  orange500: 'var(--artlab-orange)',
  red400: 'var(--artlab-red)',
  red500: 'var(--artlab-red)',
  red600: 'var(--artlab-red)',
  yellow500: 'var(--artlab-yellow)',
  purple300: 'var(--artlab-purple)',
  purple500: 'var(--artlab-purple)',
  pink500: 'var(--artlab-pink)',
}

// Fixed palette shared by both modes, defined at the theme common level
// so the Home Assistant engine merges it with the dark/light modes.
const ART_LAB_ACCENTS: Record<string, string> = {
  'artlab-green': '#c9ddc3',
  'artlab-purple': '#ded1eb',
  'artlab-yellow': '#f2e5b2',
  'artlab-red': '#efc3ba',
  'artlab-blue': '#c8dce9',
  'artlab-orange': '#efd1b8',
  'artlab-pink': '#e5c6d7',
  'artlab-lime': '#dce6ba',
}

const ART_LAB_ROOMS: Record<string, string> = {
  'artlab-room-livingroom': '#8faf82',
  'artlab-room-bedroom': '#b88faf',
  'artlab-room-kitchen': '#d3b07a',
  'artlab-room-bathroom': '#7eafc1',
  'artlab-room-entry': '#a594bd',
  'artlab-room-hallway': '#87b7a5',
  'artlab-room-security': '#d19a85',
  'artlab-room-garage': '#8fa7b8',
  'artlab-room-garden': '#9bb77b',
}

// Maps every emitted variable to its section title, following the source order.
function buildSections(keys: string[]): Record<string, string> {
  const sections: Record<string, string> = {}
  let current = ''
  for (const key of keys) {
    if (SECTION_HEADERS[key])
      current = SECTION_HEADERS[key]
    sections[key] = current
  }
  return sections
}

function modeToYaml(mode: Record<string, any>, indent: string, sections: Record<string, string>): string {
  const lines: string[] = []
  let currentSection: string | undefined
  for (const [key, value] of Object.entries(mode)) {
    const section = sections[key]
    if (section && section !== currentSection) {
      lines.push(`${indent}# ${section}`)
      currentSection = section
    }
    lines.push(`${indent}${key}: ${formatValue(value)}`)
  }
  return lines.join('\n')
}

// Card-Mod layout from Bubble v1.2. Only the transition rules are optional;
// the layout rules are always kept.
function cardModYaml(transitions: boolean): string {
  const rootFade = transitions
    ? `      app-header {
        transition: background-color 0.5s ease;
      }
      ha-sidebar {
        transition: background-color 0.5s ease;
      }
`
    : ''

  const moreInfoFade = transitions
    ? `        transition: background-color 0.5s ease;
`
    : ''

  const cardFade = transitions
    ? `      transition: background-color 0.5s ease;
`
    : ''

  const widgetsFade = transitions
    ? `    .state-icon, ha-icon, ha-state-icon {
      transition: color 0.5s ease;
    }
    mwc-button, paper-button, ha-icon-button {
      transition: background-color 0.5s ease, color 0.5s ease;
    }
    ha-slider, paper-slider {
      transition: opacity 0.5s ease;
    }
`
    : ''

  return `  card-mod-theme: ArtLab
  card-mod-root-yaml: |
    .: |
${rootFade}      @media only screen and (max-width: 768px) {
          .header {
            display: none;
            opacity: 0;
          }
          #view {
            padding-top: 0 !important;
            margin-top: 0 !important;
            height: calc(100vh - env(safe-area-inset-top)) !important;
          }
      }
  card-mod-more-info-yaml: |
    $: |
     .mdc-dialog .mdc-dialog__scrim {
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        background: rgba(0,0,0,.6);
     }
     .mdc-dialog .mdc-dialog__container .mdc-dialog__surface {
        box-shadow: none !important;
        border-radius: var(--ha-card-border-radius);
${moreInfoFade}     }
    .: |
     :host {
        --ha-card-box-shadow: none;
     }
  card-mod-card: |
    ha-card {
${cardFade}      border-style: none !important;
    }
${widgetsFade}`
}

function commonPaletteYaml(): string {
  const lines = ['  # ArtLab palette']
  for (const [key, value] of Object.entries(ART_LAB_ACCENTS))
    lines.push(`  ${key}: "${value}"`)
  lines.push('  # ArtLab rooms')
  for (const [key, value] of Object.entries(ART_LAB_ROOMS))
    lines.push(`  ${key}: "${value}"`)
  return lines.join('\n')
}

export function getHomeAssistantThemeFamily(options: HomeAssistantThemeOptions = {}): string {
  const transitions = options.transitions ?? true
  const dark = getMode({ color: 'dark', name: 'ArtLab Dark', ...options })
  const light = getMode({ color: 'light', name: 'ArtLab Light', ...options })

  // Variables identical in both modes are hoisted to the theme common level;
  // the Home Assistant engine merges them with the active mode.
  const common: Record<string, any> = {}
  const darkOnly: Record<string, any> = {}
  const lightOnly: Record<string, any> = {}
  for (const [key, value] of Object.entries(dark)) {
    if (value === light[key]) {
      common[key] = value
    }
    else {
      darkOnly[key] = value
      lightOnly[key] = light[key]
    }
  }
  const sections = buildSections(Object.keys(dark))

  return `# ArtLab theme
# Colors: ArtLab palette, primary/secondary overridable through the generator options
# Geometry (round, padding, margin, gaps, borders): based on Bubble Light & Dark v1.2
# Bubble is a modified Noctis (aFFekopp) maintained by Clooos.
ArtLab:
  modes:
    dark:
${modeToYaml(darkOnly, '      ', sections)}
    light:
${modeToYaml(lightOnly, '      ', sections)}
${modeToYaml(common, '  ', sections)}
${commonPaletteYaml()}
${cardModYaml(transitions)}`
}

function getMode(options: GetThemeOptions & HomeAssistantThemeOptions): Record<string, any> {
  const { pick, v, colors } = createThemeHelpers(options)

  const background = v('background')!
  const foreground = v('foreground')!
  const primary = options.primaryColor ?? v('primary')!
  const secondary = options.secondaryColor ?? primary
  const activeBackground = v('activeBackground')!
  const softActiveBackground = v('softActiveBackground')!

  // Secondary text keeps the main text hue at ~56% opacity (0x8f).
  const secondaryText = `${foreground.slice(0, 7)}8f`

  return {
    // Fonts
    'primary-font-family': 'Inter, Roboto, sans-serif',
    'paper-font-common-base_-_font-family': 'var(--primary-font-family)',
    'paper-font-common-code_-_font-family': 'var(--primary-font-family)',
    'paper-font-body1_-_font-family': 'var(--primary-font-family)',
    'paper-font-subhead_-_font-family': 'var(--primary-font-family)',
    'paper-font-headline_-_font-family': 'var(--primary-font-family)',
    'paper-font-caption_-_font-family': 'var(--primary-font-family)',
    'paper-font-title_-_font-family': 'var(--primary-font-family)',
    'ha-card-header-font-family': 'var(--primary-font-family)',

    // Text
    'text-color': foreground,
    'primary-text-color': 'var(--text-color)',
    'text-primary-color': 'var(--text-color)',
    'sidebar-text-color': 'var(--text-color)',
    'secondary-text-color': secondaryText,
    'text-medium-light-color': pick({ light: '#6c6f85', dark: '#A0A2A8' }),
    'text-medium-color': pick({ light: '#6c6f85', dark: '#80828A' }),
    'disabled-text-color': pick({ light: '#6c6f85', dark: '#626569' }),
    'primary-color': 'var(--accent-color)',

    // Text Fields & Dropdown
    'mdc-text-field-fill-color': 'var(--background-color)',
    'mdc-text-field-ink-color': 'var(--text-color)',
    'mdc-select-fill-color': 'var(--background-color)',
    'mdc-text-field-label-ink-color': 'var(--secondary-text-color)',
    'input-fill-color': 'var(--background-color)',
    'input-ink-color': 'var(--text-color)',
    'input-label-ink-color': 'var(--text-color)',
    'input-disabled-fill-color': 'var(--background-color)',
    'input-disabled-ink-color': 'var(--disabled-text-color)',
    'input-disabled-label-ink-color': 'var(--disabled-text-color)',
    'input-idle-line-color': 'var(--background-color)',
    'input-dropdown-icon-color': 'var(--secondary-text-color)',
    'input-hover-line-color': 'var(--secondary-color)',
    'code-editor-background-color': 'var(--secondary-background-color)',
    'codemirror-property': 'var(--text-color)',

    // Main Colors
    'app-header-background-color': 'var(--background-color)',
    'accent-color': primary,
    'secondary-color': secondary,
    'accent-medium-color': 'var(--secondary-color)',

    // Background
    'background-color': background,
    'primary-background-color': 'var(--background-color)',
    'background-color-2': softActiveBackground,
    'secondary-background-color': 'var(--background-color-2)',
    'markdown-code-background-color': 'var(--background-color)',

    // Grays
    'gray400': colors.gray[4],

    // Pastel accents
    'pastel-blue': 'var(--artlab-blue)',
    'pastel-green': 'var(--artlab-green)',
    'pastel-purple': 'var(--artlab-purple)',

    // Palette
    'blue': 'var(--artlab-blue)',
    'cyan': 'var(--artlab-blue)',
    'green': 'var(--artlab-green)',
    'orange': 'var(--artlab-orange)',
    'red': 'var(--artlab-red)',
    'yellow': 'var(--artlab-yellow)',
    'purple': 'var(--artlab-purple)',
    'pink': 'var(--artlab-pink)',
    'amber': 'var(--artlab-yellow)',

    // Color variants
    ...NUMBERED_ALIASES,

    // Card - geometry from Bubble v1.2 (round, padding, margin, gaps, borders)
    'card-background-color': 'var(--ha-card-background)',
    'ha-card-background': activeBackground,
    'ha-card-box-shadow': 'none',
    'ha-card-border-radius': '28px',
    'ha-card-border-style': 'solid',
    'ha-card-border-width': '0px',
    'ha-card-border-color': 'transparent',
    'border-color': 'transparent',
    'grid-card-gap': '18px',
    'horizontal-stack-card-margin': '0 10px',
    'border-style': 'none',
    'ha-card-background-active': 'var(--ha-card-background)',
    'control-button-border-radius': '50px',
    'control-button-background-color': 'var(--ha-card-background)',

    // Icons
    'paper-item-icon-color': 'var(--text-color)',
    'paper-item-icon-active-color': 'var(--accent-color)',

    // Rooms
    'room-livingroom': 'var(--artlab-room-livingroom)',
    'room-bedroom': 'var(--artlab-room-bedroom)',
    'room-kitchen': 'var(--artlab-room-kitchen)',
    'room-bathroom': 'var(--artlab-room-bathroom)',
    'room-entry': 'var(--artlab-room-entry)',
    'room-hallway': 'var(--artlab-room-hallway)',
    'room-security': 'var(--artlab-room-security)',
    'room-garage': 'var(--artlab-room-garage)',
    'room-garden': 'var(--artlab-room-garden)',

    // Sidebar
    'sidebar-background-color': 'var(--background-color)',
    'sidebar-icon-color': pick({ light: '#ccd0da', dark: '#98a7b9' }),
    'sidebar-selected-icon-color': 'var(--accent-color)',
    'sidebar-selected-text-color': 'var(--text-color)',
    'sidebar-selected-background-color': `${primary}25`,
    'paper-listbox-background-color': 'var(--sidebar-background-color)',
    'divider-color': 'var(--secondary-background-color)',
    'light-primary-color': 'var(--ha-card-background)',

    // Sliders
    'paper-slider-knob-color': 'var(--accent-color)',
    'paper-slider-pin-color': 'var(--background-color-2)',
    'paper-slider-active-color': 'var(--accent-color)',
    'paper-slider-container-color': 'var(--background-color-2)',

    // Toggle
    'paper-toggle-button-checked-bar-color': 'var(--accent-color)',
    'mdc-theme-primary': 'var(--accent-color)',

    // Switch
    'switch-unchecked-color': pick({ light: '#9ca0b0', dark: '#70889e' }),
    'switch-checked-button-color': 'var(--accent-color)',
    'switch-unchecked-track-color': 'var(--background-color-2)',
    'switch-checked-track-color': 'var(--background-color-2)',

    // Radio Button
    'paper-radio-button-checked-color': 'var(--accent-color)',

    // Popups
    'more-info-header-background': 'var(--secondary-background-color)',
    'paper-dialog-background-color': 'var(--background-color)',

    // Tables
    'table-row-background-color': 'var(--background-color)',
    'table-row-alternative-background-color': 'var(--ha-card-background)',

    // Badges
    'label-badge-background-color': 'var(--background-color)',
    'label-badge-text-color': 'var(--text-primary-color)',
    'label-badge-red': 'rgba(73,85,108,1)',
    'label-badge-blue': 'rgba(26,137,245,1)',
    'label-badge-green': 'rgba(0,202,139,1)',
    'label-badge-yellow': 'rgba(222,176,107,1)',

    'paper-input-container-focus-color': 'var(--accent-color)',

    // Mini Mediaplayer
    'mini-media-player-base-color': 'var(--text-color)',
    'mini-media-player-accent-color': 'var(--accent-color)',
  }
}
