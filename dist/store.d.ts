export type StoredConfig = {
    seed: string;
    name?: string;
    personality?: string;
    hatchedAt?: number;
    muted?: boolean;
    petCount?: number;
    /** `spotlight` = hide tooling narration; pet delivers conclusions only. */
    presentationMode?: 'normal' | 'spotlight';
};
export declare function loadConfig(): StoredConfig;
export declare function saveConfig(config: StoredConfig): void;
export declare function getConfigPath(): string;
