import { getCompanionProfile, profileText, sessionGreetingLine } from './profile.js';
import { loadConfig } from './store.js';
/** Build the desk-pet wake text injected by hooks. Returns null when muted. */
export function buildWakeContext() {
    const soul = loadConfig();
    if (soul.muted)
        return null;
    const { bones } = getCompanionProfile();
    const greeting = sessionGreetingLine(soul);
    const sprite = profileText(bones, soul);
    return [
        '# REQUIRED — wake the desk pet now',
        '',
        'At the **start of your reply** (before anything else), show this companion:',
        '',
        sprite,
        '',
        `Then add exactly one line: "${greeting}"`,
        '',
        'Do not skip. Do not summarize the sprite — paste it verbatim.',
        'Then handle the user request normally.',
    ].join('\n');
}
export function formatWakeOutput(context, format, event = 'SessionStart') {
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
export function parseWakeArgs(argv) {
    let format = 'cursor';
    let event = 'SessionStart';
    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--format' && argv[i + 1]) {
            format = argv[++i];
        }
        else if (arg === '--event' && argv[i + 1]) {
            event = argv[++i];
        }
    }
    const envFormat = process.env.COMPANION_WAKE_FORMAT;
    if (envFormat)
        format = envFormat;
    return { format, event };
}
