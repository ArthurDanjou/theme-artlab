import fs from 'fs-extra'
import { getGhosttyTheme } from './ghostty'
import { getHomeAssistantThemeFamily } from './homeassistant'
import getTheme from './theme'
import { getZedThemeFamily } from './zed'

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

fs.mkdir('./zed', { recursive: true })
  .then(() => Promise.all([
    fs.writeJSON(
      './zed/artlab.json',
      getZedThemeFamily(),
      { spaces: 2 },
    ),
  ]))

fs.mkdir('./homeassistant', { recursive: true })
  .then(() => Promise.all([
    fs.writeFile(
      './homeassistant/artlab.yaml',
      getHomeAssistantThemeFamily(),
    ),
  ]))

fs.mkdir('./themes', { recursive: true })
  .then(() => Promise.all([
    fs.writeFile(
      './themes/artlab.yaml',
      getHomeAssistantThemeFamily(),
    ),
  ]))

console.log('finished')
