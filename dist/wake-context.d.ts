export type WakeFormat = 'cursor' | 'plain' | 'claude-json' | 'codex-json';
export type WakeEvent = 'SessionStart' | 'UserPromptSubmit';
/** Build the desk-pet wake text injected by hooks. Returns null when muted. */
export declare function buildWakeContext(): string | null;
export declare function formatWakeOutput(context: string | null, format: WakeFormat, event?: WakeEvent): string;
export declare function parseWakeArgs(argv: string[]): {
    format: WakeFormat;
    event: WakeEvent;
};
