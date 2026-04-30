export const colors = {
  black: '#111',
  white: '#fff',
  gray: ['#fafbfc', '#f6f8fa', '#e1e4e8', '#d1d5da', '#959da5', '#6a737d', '#586069', '#444d56', '#2f363d', '#24292e'],
  blue: ['#f1f8ff', '#dbedff', '#c8e1ff', '#79b8ff', '#2188ff', '#0366d6', '#005cc5', '#044289', '#032f62', '#05264c'],
  green: ['#f0fff4', '#dcffe4', '#bef5cb', '#85e89d', '#34d058', '#28a745', '#22863a', '#176f2c', '#165c26', '#144620'],
  yellow: ['#fffdef', '#fffbdd', '#fff5b1', '#ffea7f', '#ffdf5d', '#ffd33d', '#f9c513', '#dbab09', '#b08800', '#735c0f'],
  orange: ['#fff8f2', '#ffebda', '#ffd1ac', '#ffab70', '#fb8532', '#f66a0a', '#e36209', '#d15704', '#c24e00', '#a04100'],
  red: ['#ffeef0', '#ffdce0', '#fdaeb7', '#f97583', '#ea4a5a', '#d73a49', '#cb2431', '#b31d28', '#9e1c23', '#86181d'],
  purple: ['#f5f0ff', '#e6dcfd', '#d1bcf9', '#b392f0', '#8a63d2', '#6f42c1', '#5a32a3', '#4c2889', '#3a1d6e', '#29134e'],
  pink: ['#ffeef8', '#fedbf0', '#f9b3dd', '#f692ce', '#ec6cb9', '#ea4aaa', '#d03592', '#b93a86', '#99306f', '#6d224f'],
}

// [dark, light]
export const ArtlabTheme = {
  primary: ['#74c7ec', '#f2a272'],

  foreground: ['#dbd7caee', '#393a34'],
  activeForeground: ['#bfbaaa', '#4e4f47'],
  secondaryForeground: ['#dedcd590', '#393a3490'],

  ignored: ['#dedcd550', '#393a3450'],
  faded: ['#dedcd510', '#393a3410'],
  border: ['#191919', '#f0f0f0'],

  background: ['#121212', '#ffffff'],
  activeBackground: ['#181818', '#f7f7f7'],
  selectionBackground: ['#eeeeee18', '#22222218'],
  selectionBackgroundActive: ['#eeeeee18', '#22222218'],
  selectionBackgroundInActive: ['#eeeeee10', '#22222210'],

  // soft overrides
  softBackground: ['#222', '#F1F0E9'],
  softActiveBackground: ['#292929', '#e1e4e8'],
  softBorder: ['#252525', '#E7E5DB'],

  // black overrides
  blackForeground: '#dbd7cacc',
  blackBackground: '#000',
  blackActiveBackground: '#121212',
  blackPunctuation: '#444444',

  // Catppuccin Mocha (dark) / Latte (light) syntax colors
  comment: ['#9399b2', '#7c7f93'], // Overlay2
  string: ['#a6e3a1', '#40a02b'], // Green
  variable: ['#eba0ac', '#e64553'], // Maroon
  keyword: ['#cba6f7', '#8839ef'], // Mauve
  number: ['#fab387', '#fe640b'], // Peach
  boolean: ['#fab387', '#fe640b'], // Peach
  operator: ['#94e2d5', '#179299'], // Teal
  function: ['#89b4fa', '#1e66f5'], // Blue
  constant: ['#fab387', '#fe640b'], // Peach
  class: ['#f9e2af', '#df8e1d'], // Yellow
  interface: ['#f9e2af', '#df8e1d'], // Yellow
  type: ['#f9e2af', '#df8e1d'], // Yellow
  builtin: ['#f38ba8', '#d20f39'], // Red
  property: ['#b4befe', '#7287fd'], // Lavender
  namespace: ['#f9e2af', '#df8e1d'], // Yellow
  punctuation: ['#9399b2', '#7c7f93'], // Overlay2
  decorator: ['#fab387', '#fe640b'], // Peach
  regex: ['#f5c2e7', '#ea76cb'], // Pink

  // Catppuccin accent colors
  green: ['#a6e3a1', '#40a02b'], // Green
  cyan: ['#94e2d5', '#179299'], // Teal
  blue: ['#89b4fa', '#1e66f5'], // Blue
  red: ['#f38ba8', '#d20f39'], // Red
  orange: ['#fab387', '#fe640b'], // Peach
  yellow: ['#f9e2af', '#df8e1d'], // Yellow
  magenta: ['#f5c2e7', '#ea76cb'], // Pink
} satisfies Record<string, [string, string] | string>
