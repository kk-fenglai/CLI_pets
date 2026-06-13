import { type CompanionBones } from './types.js';
/**
 * Deterministically generate a companion's "bones" from a seed string.
 * The same seed always yields the same creature — rarity, species, look and
 * stats are not editable by tampering with stored config.
 */
export declare function rollBones(seed: string): CompanionBones;
