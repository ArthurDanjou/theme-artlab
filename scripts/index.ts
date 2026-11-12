import fs from 'fs-extra'
import { getGhosttyTheme } from './ghostty'
import { getHomeAssistantThemeFamily } from './homeassistant'
import { getMealieThemeFamily } from './mealie'
import { getObsidianManifest, getObsidianTheme } from './obsidian'
import { getT3CodeTheme } from './t3code'
import getTheme from './theme'
import { getZedThemeFamily } from './zed'

async function main() {
  console.log('Loading themes...')

  await fs.mkdir('./exports/vscode', { recursive: true })
  await Promise.all([
    fs.writeJSON(
      './exports/vscode/artlab-light.json',
      getTheme({
        color: 'light',
        name: 'ArtLab Light',
      }),
      { spaces: 2 },
    ),
    fs.writeJSON(
      './exports/vscode/artlab-dark.json',
      getTheme({
        color: 'dark',
        name: 'ArtLab Dark',
      }),
      { spaces: 2 },
    ),
  ])

  await fs.mkdir('./exports/ghostty', { recursive: true })
  await Promise.all([
    fs.writeFile(
      './exports/ghostty/artlab-dark',
      getGhosttyTheme({
        color: 'dark',
        name: 'ArtLab Dark',
      }),
    ),
    fs.writeFile(
      './exports/ghostty/artlab-light',
      getGhosttyTheme({
        color: 'light',
        name: 'ArtLab Light',
      }),
    ),
  ])

  await fs.mkdir('./exports/zed', { recursive: true })
  await fs.writeJSON(
    './exports/zed/artlab.json',
    getZedThemeFamily(),
    { spaces: 2 },
  )

  await fs.mkdir('./exports/t3code', { recursive: true })
  await fs.writeJSON(
    './exports/t3code/artlab.json',
    getT3CodeTheme(),
    { spaces: 2 },
  )

  await fs.mkdir('./exports/homeassistant', { recursive: true })
  await fs.writeFile(
    './exports/homeassistant/artlab.yaml',
    getHomeAssistantThemeFamily(),
  )

  await fs.mkdir('./exports/mealie', { recursive: true })
  await fs.writeFile(
    './exports/mealie/artlab.env',
    getMealieThemeFamily(),
  )

  const { version: obsidianVersion } = await fs.readJSON('./package.json')
  await fs.mkdir('./exports/obsidian', { recursive: true })
  await Promise.all([
    fs.writeFile('./exports/obsidian/theme.css', getObsidianTheme()),
    fs.writeJSON(
      './exports/obsidian/manifest.json',
      getObsidianManifest({
        color: 'dark',
        name: 'ArtLab',
        version: obsidianVersion,
      }),
      { spaces: 2 },
    ),
  ])

  console.log('Finished')
}

main().catch(console.error)
