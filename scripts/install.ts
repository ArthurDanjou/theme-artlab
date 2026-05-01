import os from 'node:os'
import path from 'node:path'
import process from 'node:process'

import fs from 'fs-extra'

const home = os.homedir()

function getGhosttyDir(): string {
  const xdg = path.join(home, '.config', 'ghostty', 'themes')
  const macos = path.join(home, 'Library', 'Application Support', 'com.mitchellh.ghostty', 'themes')

  // Prefer XDG config if the user already has a ghostty directory there
  if (fs.existsSync(path.join(home, '.config', 'ghostty')))
    return xdg
  return macos
}

async function installZed() {
  const targetDir = path.join(home, '.config', 'zed', 'themes')
  await fs.ensureDir(targetDir)
  await fs.copy('./zed/artlab.json', path.join(targetDir, 'artlab.json'))
  console.log(`Installed Zed theme to ${targetDir}`)
}

async function installGhostty() {
  const targetDir = getGhosttyDir()
  await fs.ensureDir(targetDir)
  await fs.copy('./ghostty/artlab-light', path.join(targetDir, 'artlab-light'))
  await fs.copy('./ghostty/artlab-dark', path.join(targetDir, 'artlab-dark'))
  console.log(`Installed Ghostty themes to ${targetDir}`)
}

async function main() {
  const args = process.argv.slice(2)
  const targets = new Set(args.length > 0 ? args : ['zed', 'ghostty'])

  if (targets.has('zed'))
    await installZed()
  if (targets.has('ghostty'))
    await installGhostty()

  console.log('Done!')
}

main().catch(console.error)
