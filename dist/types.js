// Core type definitions for the companion system.
// Reimplemented cleanly; design inspired by the leaked-source analysis in this repo.
export const RARITIES = [
    'common',
    'uncommon',
    'rare',
    'epic',
    'legendary',
];
// Drop weights — lower is rarer. legendary is a 1-in-100 pull.
export const RARITY_WEIGHTS = {
    common: 60,
    uncommon: 25,
    rare: 10,
    epic: 4,
    legendary: 1,
};
export const RARITY_STARS = {
    common: '★',
    uncommon: '★★',
    rare: '★★★',
    epic: '★★★★',
    legendary: '★★★★★',
};
// ANSI color per rarity (for terminals that render it).
export const RARITY_ANSI = {
    common: '\x1b[90m', // gray
    uncommon: '\x1b[32m', // green
    rare: '\x1b[34m', // blue
    epic: '\x1b[35m', // magenta
    legendary: '\x1b[33m', // yellow/gold
};
export const ANSI_RESET = '\x1b[0m';
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
];
export const EYES = ['·', '✦', '×', '◉', '@', '°'];
export const HATS = [
    'none',
    'crown',
    'tophat',
    'propeller',
    'halo',
    'wizard',
    'beanie',
    'tinyduck',
];
export const STAT_NAMES = [
    'DEBUGGING',
    'PATIENCE',
    'CHAOS',
    'WISDOM',
    'SNARK',
];
