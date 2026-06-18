import { rollBones } from './companion.js'
import { renderSprite } from './sprites.js'
import { loadConfig, type StoredConfig } from './store.js'
import { RARITY_STARS, STAT_NAMES, type CompanionBones } from './types.js'

export function getCompanionProfile(): {
  bones: CompanionBones
  soul: StoredConfig
} {
  const soul = loadConfig()
  const bones = rollBones(soul.seed)
  return { bones, soul }
}

function statBar(value: number): string {
  const filled = Math.round((value / 100) * 10)
  return '█'.repeat(filled) + '░'.repeat(10 - filled)
}

export function formatStatBar(value: number): string {
  return statBar(value)
}

export function profileText(bones: CompanionBones, soul: StoredConfig): string {
  const name = soul.name ?? '(unhatched)'
  const sprite = renderSprite(bones, 0).join('\n')
  const shiny = bones.shiny ? ' ✨SHINY✨' : ''
  const hat = bones.hat === 'none' ? '' : `  hat: ${bones.hat}`
  const stats = STAT_NAMES.map(
    s => `  ${s.padEnd(10)} ${statBar(bones.stats[s])} ${String(bones.stats[s]).padStart(3)}`,
  ).join('\n')

  return [
    sprite,
    '',
    `${name}  —  ${bones.species}${shiny}`,
    `${RARITY_STARS[bones.rarity]} ${bones.rarity}${hat}`,
    soul.personality ? `personality: ${soul.personality}` : '',
    '',
    'STATS',
    stats,
  ]
    .filter(Boolean)
    .join('\n')
}

export function sessionGreetingLine(soul: StoredConfig): string {
  if (soul.name) return `${soul.name} is here with you. 👋`
  return 'Your companion has not been named yet — want to hatch it?'
}
