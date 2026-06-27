import type { CompanionBones } from './types.js';
import type { StoredConfig } from './store.js';
export type PresentationMode = 'normal' | 'spotlight';
export declare const PRESENTATION_MODES: PresentationMode[];
export declare function getPresentationMode(soul: StoredConfig): PresentationMode;
export declare function presentationModeLabel(mode: PresentationMode): string;
/** Agent-facing rules when spotlight mode is on. */
export declare function buildSpotlightRules(soul: StoredConfig, bones: CompanionBones): string;
export declare function spotlightStatusLine(soul: StoredConfig, verb?: string): string;
