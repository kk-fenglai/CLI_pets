export type StoredConfig = {
    seed: string;
    name?: string;
    personality?: string;
    hatchedAt?: number;
    muted?: boolean;
    petCount?: number;
};
export declare function loadConfig(): StoredConfig;
export declare function saveConfig(config: StoredConfig): void;
export declare function getConfigPath(): string;
