import fs from 'fs-extra'
import { getGhosttyTheme } from './ghostty'
import { getZedThemeFamily } from './zed'
import getTheme from './theme'

console.log('starting')

fs.mkdir('./vscode', { recursive: true })
  .then(() => Promise.all([
    fs.writeJSON(
      './vscode/artlab-light.json',
      getTheme({
        color: 'light',
        name: 'ArtLab Light',
      }),
      { spaces: 2 },
    ),
    fs.writeJSON(
      './vscode/artlab-dark.json',
      getTheme({
        color: 'dark',
        name: 'ArtLab Dark',
      }),
      { spaces: 2 },
    ),
  ]))

fs.mkdir('./ghostty', { recursive: true })
  .then(() => Promise.all([
    fs.writeFile(
      './ghostty/artlab-dark',
      getGhosttyTheme({
        color: 'dark',
        name: 'ArtLab Dark',
      }),
    ),
    fs.writeFile(
      './ghostty/artlab-light',
      getGhosttyTheme({
        color: 'light',
        name: 'ArtLab Light',
      }),
    ),
  ]))

fs.mkdir('./zed/themes', { recursive: true })
  .then(() => Promise.all([
    fs.writeJSON(
      './zed/themes/artlab.json',
      getZedThemeFamily(),
      { spaces: 2 },
    ),
  ]))

console.log('finished')
