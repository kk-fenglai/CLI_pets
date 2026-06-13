import type { CompanionBones, Species } from './types.js';
/** Render the full multi-line sprite for a given idle frame. */
export declare function renderSprite(bones: CompanionBones, frame?: number): string[];
export declare function spriteFrameCount(species: Species): number;
/** Compact one-line face, handy for inline status. */
export declare function renderFace(bones: CompanionBones): string;
