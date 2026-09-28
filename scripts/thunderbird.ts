import type { GetThemeOptions } from './helper'
import { createThemeHelpers } from './helper'

export interface ThunderbirdManifestOptions extends GetThemeOptions {
  version: string
}

/** Strip alpha channel from hex colors (e.g. #dbd7caee → #dbd7ca) */
function stripAlpha(hex: string): string {
  if (hex.startsWith('#') && hex.length === 9)
    return hex.slice(0, 7)
  return hex
}

export function getThunderbirdManifest(options: ThunderbirdManifestOptions) {
  const { v } = createThemeHelpers(options)

  const background = stripAlpha(v('background')!)
  const activeBackground = stripAlpha(v('activeBackground')!)
  const softActiveBackground = stripAlpha(v('softActiveBackground')!)
  const foreground = stripAlpha(v('foreground')!)
  const secondaryForeground = stripAlpha(v('secondaryForeground')!)
  const border = stripAlpha(v('border')!)
  const primary = stripAlpha(v('primary')!)

  return {
    manifest_version: 2,
    name: options.name,
    description: `${options.name} - the clarity of Vitesse with the cozy Catppuccin palette.`,
    version: options.version,
    author: 'Arthur Danjou',
    browser_specific_settings: {
      gecko: {
        id: `arthurdanjou.${options.name.toLowerCase().replace(/\s+/g, '-')}@addons.thunderbird.net`,
        strict_min_version: '78.0',
      },
    },
    theme: {
      colors: {
        frame: background,
        frame_inactive: background,
        tab_background_text: secondaryForeground,
        tab_text: foreground,
        tab_line: primary,
        tab_loading: primary,
        tab_selected: activeBackground,
        toolbar: activeBackground,
        bookmark_text: foreground,
        toolbar_text: foreground,
        toolbar_field: background,
        toolbar_field_text: foreground,
        toolbar_field_highlight: primary,
        toolbar_field_highlight_text: background,
        toolbar_field_border: border,
        toolbar_field_focus: background,
        toolbar_field_text_focus: foreground,
        toolbar_field_border_focus: primary,
        toolbar_top_separator: border,
        toolbar_bottom_separator: border,
        toolbar_vertical_separator: border,
        sidebar: background,
        sidebar_text: foreground,
        sidebar_highlight: activeBackground,
        sidebar_highlight_text: foreground,
        sidebar_highlight_border: border,
        sidebar_border: border,
        popup: background,
        popup_text: foreground,
        popup_border: border,
        popup_highlight: activeBackground,
        popup_highlight_text: foreground,
        button_background_hover: activeBackground,
        button_background_active: softActiveBackground,
        icons: foreground,
        icons_attention: primary,
      },
      properties: {
        color_scheme: options.color,
      },
    },
  }
}
