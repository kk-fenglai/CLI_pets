import { type StoredConfig } from './store.js';
import { type CompanionBones } from './types.js';
export declare function getCompanionProfile(): {
    bones: CompanionBones;
    soul: StoredConfig;
};
export declare function formatStatBar(value: number): string;
export declare function profileText(bones: CompanionBones, soul: StoredConfig): string;
export declare function sessionGreetingLine(soul: StoredConfig): string;
