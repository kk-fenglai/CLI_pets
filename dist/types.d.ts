export declare const RARITIES: readonly ["common", "uncommon", "rare", "epic", "legendary"];
export type Rarity = (typeof RARITIES)[number];
export declare const RARITY_WEIGHTS: Record<Rarity, number>;
export declare const RARITY_STARS: Record<Rarity, string>;
export declare const RARITY_ANSI: Record<Rarity, string>;
export declare const ANSI_RESET = "\u001B[0m";
export declare const SPECIES: readonly ["duck", "goose", "blob", "cat", "dragon", "octopus", "owl", "penguin", "turtle", "snail", "ghost", "axolotl", "capybara", "cactus", "robot", "rabbit", "mushroom", "chonk"];
export type Species = (typeof SPECIES)[number];
export declare const EYES: readonly ["·", "✦", "×", "◉", "@", "°"];
export type Eye = (typeof EYES)[number];
export declare const HATS: readonly ["none", "crown", "tophat", "propeller", "halo", "wizard", "beanie", "tinyduck"];
export type Hat = (typeof HATS)[number];
export declare const STAT_NAMES: readonly ["DEBUGGING", "PATIENCE", "CHAOS", "WISDOM", "SNARK"];
export type StatName = (typeof STAT_NAMES)[number];
export type CompanionBones = {
    rarity: Rarity;
    species: Species;
    eye: Eye;
    hat: Hat;
    shiny: boolean;
    stats: Record<StatName, number>;
};
export type CompanionSoul = {
    name: string;
    personality: string;
    hatchedAt: number;
};
export type Companion = CompanionBones & CompanionSoul;
