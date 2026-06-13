// Core type definitions for the companion system.
// Reimplemented cleanly; design inspired by the leaked-source analysis in this repo.

export const RARITIES = [
  'common',
  'uncommon',
  'rare',
  'epic',
  'legendary',
] as const
export type Rarity = (typeof RARITIES)[number]

// Drop weights — lower is rarer. legendary is a 1-in-100 pull.
export const RARITY_WEIGHTS: Record<Rarity, number> = {
  common: 60,
  uncommon: 25,
  rare: 10,
  epic: 4,
  legendary: 1,
}

export const RARITY_STARS: Record<Rarity, string> = {
  common: '★',
  uncommon: '★★',
  rare: '★★★',
  epic: '★★★★',
  legendary: '★★★★★',
}

// ANSI color per rarity (for terminals that render it).
export const RARITY_ANSI: Record<Rarity, string> = {
  common: '\x1b[90m', // gray
  uncommon: '\x1b[32m', // green
  rare: '\x1b[34m', // blue
  epic: '\x1b[35m', // magenta
  legendary: '\x1b[33m', // yellow/gold
}

export const ANSI_RESET = '\x1b[0m'

export const SPECIES = [
  'duck',
  'goose',
  'blob',
  'cat',
  'dragon',
  'octopus',
  'owl',
  'penguin',
  'turtle',
  'snail',
  'ghost',
  'axolotl',
  'capybara',
  'cactus',
  'robot',
  'rabbit',
  'mushroom',
  'chonk',
] as const
export type Species = (typeof SPECIES)[number]

export const EYES = ['·', '✦', '×', '◉', '@', '°'] as const
export type Eye = (typeof EYES)[number]

export const HATS = [
  'none',
  'crown',
  'tophat',
  'propeller',
  'halo',
  'wizard',
  'beanie',
  'tinyduck',
] as const
export type Hat = (typeof HATS)[number]

export const STAT_NAMES = [
  'DEBUGGING',
  'PATIENCE',
  'CHAOS',
  'WISDOM',
  'SNARK',
] as const
export type StatName = (typeof STAT_NAMES)[number]

// Deterministic parts — derived purely from hash(seed). Never persisted.
export type CompanionBones = {
  rarity: Rarity
  species: Species
  eye: Eye
  hat: Hat
  shiny: boolean
  stats: Record<StatName, number>
}

// User-given identity — persisted to disk after first hatch.
export type CompanionSoul = {
  name: string
  personality: string
  hatchedAt: number
}

export type Companion = CompanionBones & CompanionSoul
