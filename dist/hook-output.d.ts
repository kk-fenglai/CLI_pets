export type HookFormat = 'cursor' | 'plain' | 'claude-json' | 'codex-json';
export type HookEvent = 'SessionStart' | 'UserPromptSubmit' | 'PostToolUse';
export declare function formatHookOutput(context: string | null, format: HookFormat, event: HookEvent): string;
export declare function parseHookArgs(argv: string[], defaults?: {
    format?: HookFormat;
    event?: HookEvent;
}): {
    format: HookFormat;
    event: HookEvent;
};
