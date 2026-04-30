import type { GetThemeOptions } from './helper'
import { createThemeHelpers } from './helper'

interface ZedHighlightStyle {
  color?: string | null
  background_color?: string | null
  font_style?: 'normal' | 'italic' | 'oblique' | null
  font_weight?: number | null
}

interface ZedTheme {
  name: string
  author: string
  themes: Array<{
    name: string
    appearance: 'light' | 'dark'
    style: Record<string, any>
  }>
}

function syntax(scope: string, color: string, opts: Omit<ZedHighlightStyle, 'color'> = {}): [string, ZedHighlightStyle] {
  return [scope, { color, ...opts }]
}

export function getZedThemeFamily(): ZedTheme {
  return {
    name: 'ArtLab',
    author: 'Arthur Danjou',
    themes: [
      getZedTheme({ color: 'dark', name: 'ArtLab Dark' }),
      getZedTheme({ color: 'light', name: 'ArtLab Light' }),
    ],
  }
}

function getZedTheme(options: GetThemeOptions) {
  const { pick, v } = createThemeHelpers(options)

  const foreground = v('foreground')!
  const secondaryForeground = v('secondaryForeground')!
  const activeForeground = v('activeForeground')!
  const primary = v('primary')!
  const background = v('background')!
  const activeBackground = v('activeBackground')!
  const border = v('border')!
  const punctuation = v('punctuation')!

  const style: Record<string, any> = {
    background,
    'surface.background': background,
    'editor.background': background,
    'editor.foreground': foreground,
    'editor.line_number': v('ignored'),
    'editor.active_line_number': activeForeground,
    'editor.active_line.background': activeBackground,
    'editor.gutter.background': background,
    'editor.indent_guide': pick({ light: '#00000015', dark: '#ffffff15' }),
    'editor.indent_guide_active': pick({ light: '#00000030', dark: '#ffffff30' }),
    'editor.invisible': pick({ light: '#00000015', dark: '#ffffff15' }),
    'editor.wrap_guide': border,
    'editor.active_wrap_guide': pick({ light: '#d1d5da', dark: '#2f363d' }),
    'editor.document_highlight.bracket_background': pick({ light: '#1c6b4820', dark: '#4d937520' }),
    'editor.document_highlight.read_background': '#1c6b4805',
    'editor.document_highlight.write_background': '#1c6b4810',
    'editor.highlighted_line.background': activeBackground,
    'editor.subheader.background': activeBackground,

    'terminal.background': background,
    'terminal.foreground': foreground,
    'terminal.bright_foreground': pick({ light: '#dddddd', dark: '#ffffff' }),
    'terminal.dim_foreground': pick({ light: '#aaaaaa', dark: '#777777' }),

    'terminal.ansi.background': background,
    'terminal.ansi.black': pick({ light: v('background')!, dark: v('foreground')! }),
    'terminal.ansi.bright_black': pick({ light: '#aaaaaa', dark: '#777777' }),
    'terminal.ansi.red': v('red'),
    'terminal.ansi.bright_red': v('red'),
    'terminal.ansi.green': v('green'),
    'terminal.ansi.bright_green': v('green'),
    'terminal.ansi.yellow': v('yellow'),
    'terminal.ansi.bright_yellow': v('yellow'),
    'terminal.ansi.blue': v('blue'),
    'terminal.ansi.bright_blue': v('blue'),
    'terminal.ansi.magenta': v('magenta'),
    'terminal.ansi.bright_magenta': v('magenta'),
    'terminal.ansi.cyan': v('cyan'),
    'terminal.ansi.bright_cyan': v('cyan'),
    'terminal.ansi.white': '#dbd7ca',
    'terminal.ansi.bright_white': pick({ light: '#dddddd', dark: '#ffffff' }),
    'terminal.ansi.dim_black': pick({ light: v('background')!, dark: v('foreground')! }),
    'terminal.ansi.dim_red': v('red'),
    'terminal.ansi.dim_green': v('green'),
    'terminal.ansi.dim_yellow': v('yellow'),
    'terminal.ansi.dim_blue': v('blue'),
    'terminal.ansi.dim_magenta': v('magenta'),
    'terminal.ansi.dim_cyan': v('cyan'),
    'terminal.ansi.dim_white': '#dbd7ca',

    'text': foreground,
    'text.muted': activeForeground,
    'text.accent': primary,
    'text.disabled': v('ignored'),
    'text.placeholder': secondaryForeground,

    'icon': foreground,
    'icon.muted': activeForeground,
    'icon.disabled': v('ignored'),
    'icon.placeholder': secondaryForeground,
    'icon.accent': primary,

    border,
    'border.variant': pick({ light: '#d1d5da', dark: '#2f363d' }),
    'border.focused': primary,
    'border.selected': primary,
    'border.disabled': border,
    'border.transparent': '#00000000',

    'element.background': activeBackground,
    'element.hover': activeBackground,
    'element.active': activeBackground,
    'element.selected': activeBackground,
    'element.disabled': background,

    'ghost_element.background': background,
    'ghost_element.hover': activeBackground,
    'ghost_element.active': activeBackground,
    'ghost_element.selected': activeBackground,
    'ghost_element.disabled': background,

    'elevated_surface.background': activeBackground,

    'panel.background': background,
    'panel.focused_border': primary,
    'panel.indent_guide': pick({ light: '#00000015', dark: '#ffffff15' }),
    'panel.indent_guide_active': pick({ light: '#00000030', dark: '#ffffff30' }),
    'panel.indent_guide_hover': pick({ light: '#00000030', dark: '#ffffff30' }),

    'status_bar.background': background,
    'title_bar.background': background,
    'title_bar.inactive_background': background,
    'toolbar.background': background,
    'tab_bar.background': background,
    'tab.active_background': background,
    'tab.inactive_background': background,

    'pane.focused_border': primary,
    'pane_group.border': border,

    'scrollbar.thumb.background': v('faded'),
    'scrollbar.thumb.hover_background': v('ignored'),
    'scrollbar.thumb.border': v('ignored'),
    'scrollbar.track.background': background,
    'scrollbar.track.border': border,

    'drop_target.background': `${primary}30`,
    'link_text.hover': primary,

    'accent': primary,

    'success': v('green'),
    'success.background': `${v('green')!}20`,
    'success.border': v('green'),

    'error': v('red'),
    'error.background': `${v('red')!}20`,
    'error.border': v('red'),

    'warning': v('orange'),
    'warning.background': `${v('orange')!}20`,
    'warning.border': v('orange'),

    'info': v('blue'),
    'info.background': `${v('blue')!}20`,
    'info.border': v('blue'),

    'hint': v('green'),
    'hint.background': `${v('green')!}20`,
    'hint.border': v('green'),

    'predictive': v('cyan'),
    'predictive.background': `${v('cyan')!}20`,
    'predictive.border': v('cyan'),

    'modified': v('blue'),
    'modified.background': `${v('blue')!}20`,
    'modified.border': v('blue'),

    'created': v('green'),
    'created.background': `${v('green')!}20`,
    'created.border': v('green'),

    'deleted': v('red'),
    'deleted.background': `${v('red')!}20`,
    'deleted.border': v('red'),

    'conflict': v('orange'),
    'conflict.background': `${v('orange')!}20`,
    'conflict.border': v('orange'),

    'renamed': v('cyan'),
    'renamed.background': `${v('cyan')!}20`,
    'renamed.border': v('cyan'),

    'ignored': v('ignored'),
    'ignored.background': v('faded'),
    'ignored.border': v('ignored'),

    'hidden': v('ignored'),
    'hidden.background': v('faded'),
    'hidden.border': v('ignored'),

    'unreachable': v('red'),
    'unreachable.background': `${v('red')!}20`,
    'unreachable.border': v('red'),

    'search.match_background': pick({ light: '#e6cc7766', dark: '#e6cc7744' }),

    players: [
      { cursor: primary, background: `${primary}30`, selection: `${primary}30` },
      { cursor: v('green'), background: `${v('green')!}30`, selection: `${v('green')!}30` },
      { cursor: v('red'), background: `${v('red')!}30`, selection: `${v('red')!}30` },
      { cursor: v('yellow'), background: `${v('yellow')!}30`, selection: `${v('yellow')!}30` },
      { cursor: v('blue'), background: `${v('blue')!}30`, selection: `${v('blue')!}30` },
      { cursor: v('magenta'), background: `${v('magenta')!}30`, selection: `${v('magenta')!}30` },
      { cursor: v('cyan'), background: `${v('cyan')!}30`, selection: `${v('cyan')!}30` },
      { cursor: v('orange'), background: `${v('orange')!}30`, selection: `${v('orange')!}30` },
    ],

    accents: [
      primary,
      v('green'),
      v('red'),
      v('yellow'),
      v('blue'),
      v('magenta'),
      v('cyan'),
      v('orange'),
    ].filter(Boolean),

    syntax: Object.fromEntries([
      syntax('comment', v('comment')!, { font_style: 'italic' }),
      syntax('comment.doc', v('comment')!, { font_style: 'italic' }),
      syntax('constant', v('constant')!),
      syntax('constant.builtin', v('constant')!),
      syntax('constructor', v('function')!),
      syntax('embedded', v('string')!),
      syntax('emphasis', '', { font_style: 'italic' }),
      syntax('emphasis.strong', '', { font_weight: 700 }),
      syntax('function', v('function')!),
      syntax('function.method', v('function')!),
      syntax('function.macro', v('keyword')!),
      syntax('keyword', v('keyword')!),
      syntax('keyword.control', v('keyword')!),
      syntax('keyword.control.conditional', v('keyword')!),
      syntax('keyword.control.import', v('keyword')!),
      syntax('keyword.control.repeat', v('keyword')!),
      syntax('keyword.control.return', v('keyword')!),
      syntax('keyword.operator', v('operator')!),
      syntax('label', primary),
      syntax('link_text', v('string')!, { font_style: 'italic' }),
      syntax('link_uri', primary),
      syntax('number', v('number')!),
      syntax('operator', v('operator')!),
      syntax('preproc', v('keyword')!),
      syntax('property', v('property')!),
      syntax('punctuation', punctuation!),
      syntax('punctuation.bracket', punctuation!),
      syntax('punctuation.delimiter', punctuation!),
      syntax('punctuation.list_marker', v('orange')!),
      syntax('punctuation.special', punctuation!),
      syntax('string', v('string')!),
      syntax('string.escape', v('yellow')!),
      syntax('string.regex', v('regex')!),
      syntax('string.special', v('regex')!),
      syntax('string.special.symbol', v('regex')!),
      syntax('tag', v('keyword')!),
      syntax('text', foreground),
      syntax('title', primary, { font_weight: 700 }),
      syntax('type', v('type')!),
      syntax('type.builtin', v('type')!),
      syntax('variable', v('variable')!),
      syntax('variable.parameter', v('variable')!),
      syntax('variable.special', v('variable')!),
      syntax('attribute', v('variable')!),
    ]),
  }

  return {
    name: options.name,
    appearance: options.color,
    style,
  }
}
