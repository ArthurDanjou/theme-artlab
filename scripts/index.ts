import fs from 'fs-extra'
import { getGhosttyTheme } from './ghostty'
import { getHomeAssistantThemeFamily } from './homeassistant'
import { getRaycastTheme } from './raycast'
import getTheme from './theme'
import { getZedThemeFamily } from './zed'

async function main() {
  console.log('Loading themes...')

  await fs.mkdir('./vscode', { recursive: true })
  await Promise.all([
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
  ])

  await fs.mkdir('./ghostty', { recursive: true })
  await Promise.all([
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
  ])

  await fs.mkdir('./zed', { recursive: true })
  await fs.writeJSON(
    './zed/artlab.json',
    getZedThemeFamily(),
    { spaces: 2 },
  )

  await fs.mkdir('./raycast', { recursive: true })
  await Promise.all([
    fs.writeJSON(
      './raycast/artlab-dark.json',
      getRaycastTheme({
        color: 'dark',
        name: 'ArtLab Dark',
      }),
      { spaces: 2 },
    ),
    fs.writeJSON(
      './raycast/artlab-light.json',
      getRaycastTheme({
        color: 'light',
        name: 'ArtLab Light',
      }),
      { spaces: 2 },
    ),
  ])

  await fs.mkdir('./homeassistant', { recursive: true })
  await fs.writeFile(
    './homeassistant/artlab.yaml',
    getHomeAssistantThemeFamily(),
  )

  console.log('Finished')
}

main().catch(console.error)
