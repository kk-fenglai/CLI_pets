export function formatHookOutput(context, format, event) {
    if (!context) {
        return format === 'cursor' ? '{}' : '';
    }
    if (format === 'cursor') {
        return JSON.stringify({ additional_context: context });
    }
    if (format === 'claude-json' || format === 'codex-json') {
        return JSON.stringify({
            hookSpecificOutput: {
                hookEventName: event,
                additionalContext: context,
            },
        });
    }
    return context;
}
export function parseHookArgs(argv, defaults = {}) {
    let format = defaults.format ?? 'cursor';
    let event = defaults.event ?? 'SessionStart';
    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--format' && argv[i + 1]) {
            format = argv[++i];
        }
        else if (arg === '--event' && argv[i + 1]) {
            event = argv[++i];
        }
    }
    const envFormat = process.env.COMPANION_HOOK_FORMAT ??
        process.env.COMPANION_WAKE_FORMAT;
    if (envFormat)
        format = envFormat;
    return { format, event };
}
