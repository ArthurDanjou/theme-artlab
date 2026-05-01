import type { GetThemeOptions } from './helper'
import { createThemeHelpers } from './helper'

function formatValue(value: any): string {
  if (typeof value === 'string') {
    if (value.includes('\n'))
      return `\n${value.split('\n').map(l => `      ${l}`).join('\n')}`
    return `"${value}"`
  }
  return `"${String(value)}"`
}

function modeToYaml(mode: Record<string, any>): string {
  const lines: string[] = []
  for (const [key, value] of Object.entries(mode)) {
    const formatted = formatValue(value)
    if (formatted.includes('\n')) {
      lines.push(`      ${key}: |${formatted}`)
    }
    else {
      lines.push(`      ${key}: ${formatted}`)
    }
  }
  return lines.join('\n')
}

export function getHomeAssistantThemeFamily(): string {
  const dark = getMode({ color: 'dark', name: 'ArtLab Dark' })
  const light = getMode({ color: 'light', name: 'ArtLab Light' })

  return `ArtLab:
  modes:
    dark:
${modeToYaml(dark)}
    light:
${modeToYaml(light)}
  card-mod-theme: ArtLab
  card-mod-root-yaml: |
    .: |
      app-header {
        transition: background-color 0.5s ease;
      }
      ha-sidebar {
        transition: background-color 0.5s ease;
      }
      @media only screen and (max-width: 768px) {
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
        transition: background-color 0.5s ease;
     }
    .: |
     :host {
        --ha-card-box-shadow: none;
     }
  card-mod-view-yaml: |
    hui-sidebar-view:
      $: |
        .container {
            overflow: hidden;
            transition: background-color 0.5s ease;
        }
        @media only screen and (min-width: 768px) {
            .container {
              max-width: 520px;
              margin: auto !important;
              width: -webkit-fill-available;
            }
        }
        #wrapper: |
          $: |
            #progressContainer {
                border-radius: 14px !important;
        }
      .: |
        "#view>hui-view>hui-sidebar-view$#main>hui-card-options:nth-child(7)>vertical-stack-in-card$ha-card>div>hui-horizontal-stack-card$#root>hui-grid-card$#root>hui-entities-card$#states>div:nth-child(4)>slider-entity-row$div>ha-slider$#sliderBar$#progressContainer" {
            border-radius: 14px !important;
        }
  card-mod-card: |
    ha-card {
      transition: background-color 0.5s ease;
      border-style: none !important;
    }
    .state-icon, ha-icon, ha-state-icon {
      transition: color 0.5s ease;
    }
    mwc-button, paper-button, ha-icon-button {
      transition: background-color 0.5s ease, color 0.5s ease;
    }
    ha-slider, paper-slider {
      transition: opacity 0.5s ease;
    }`
}

function getMode(options: GetThemeOptions): Record<string, any> {
  const { pick, v } = createThemeHelpers(options)

  const background = v('background')!
  const foreground = v('foreground')!
  const primary = v('primary')!
  const activeBackground = v('activeBackground')!
  const softActiveBackground = v('softActiveBackground')!
  const secondaryForeground = v('secondaryForeground')!

  const isDark = options.color === 'dark'

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
    'secondary-text-color': secondaryForeground,
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
    'input-hover-line-color': 'var(--primary-color)',
    'code-editor-background-color': pick({ light: '#ccd0da', dark: '#222c40' }),
    'codemirror-property': 'var(--accent-color)',

    // Main Colors
    'app-header-background-color': 'var(--background-color)',
    'accent-color': primary,
    'accent-medium-color': 'var(--accent-color)',

    // Background
    'background-color': background,
    'primary-background-color': 'var(--background-color)',
    'background-color-2': softActiveBackground,
    'secondary-background-color': 'var(--background-color-2)',
    'markdown-code-background-color': 'var(--background-color)',

    // Card
    'card-background-color': 'var(--ha-card-background)',
    'ha-card-background': activeBackground,
    'ha-card-box-shadow': 'none',
    'ha-card-border-radius': '28px',
    'ha-card-border-style': isDark ? 'solid' : 'solid !important',
    'ha-card-border-width': isDark ? '0px' : '1px !important',
    'ha-card-border-color': isDark ? 'none' : 'none !important',
    'border-color': 'none',
    'grid-card-gap': '18px',
    'horizontal-stack-card-margin': '0 10px',
    'border-style': isDark ? 'none' : 'none !important',
    'ha-card-background-active': isDark
      ? `${primary}66 radial-gradient(at bottom, ${primary}80 0%, ${primary}00 70%)`
      : `${activeBackground}66 radial-gradient(at bottom, ${activeBackground}80 0%, ${activeBackground}00 70%)`,
    'control-button-border-radius': '50px',
    'control-button-background-color': 'var(--ha-card-background)',

    // Icons
    'paper-item-icon-color': 'var(--text-color)',
    'paper-item-icon-active-color': 'var(--accent-color)',

    // Sidebar
    'sidebar-background-color': 'var(--background-color)',
    'sidebar-icon-color': pick({ light: '#ccd0da', dark: '#98a7b9' }),
    'sidebar-selected-icon-color': 'var(--accent-color)',
    'sidebar-selected-text-color': 'var(--text-color)',
    'sidebar-selected-background-color': `${primary}25`,
    'paper-listbox-background-color': 'var(--sidebar-background-color)',
    'divider-color': activeBackground,
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
    'switch-checked-button-color': isDark ? 'var(--accent-color)' : 'var(--on)',
    ...(!isDark ? { on: '#6c6f85' } : {}),
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

    // Custom Header
    'ch-background': 'var(--background-color)',
    'ch-active-tab-color': 'var(--accent-color)',
    'ch-notification-dot-color': 'var(--accent-color)',
    'ch-all-tabs-color': 'var(--sidebar-icon-color)',
    'ch-tab-indicator-color': 'var(--accent-color)',

    // Mini Mediaplayer
    'mini-media-player-base-color': 'var(--text-color)',
    'mini-media-player-accent-color': 'var(--accent-color)',
  }
}
