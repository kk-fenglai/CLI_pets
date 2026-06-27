#!/usr/bin/env node
/**
 * Cross-platform PostToolUse hook — reminds the agent to stay in spotlight mode.
 *
 * Formats:
 *   cursor       → { "additional_context": "..." }
 *   claude-json  → hookSpecificOutput (Claude Code PostToolUse)
 *   codex-json   → hookSpecificOutput (Codex PostToolUse)
 *
 * Usage:
 *   node dist/spotlight-nudge.js --format cursor
 *   node dist/spotlight-nudge.js --format claude-json --event PostToolUse
 *   node dist/spotlight-nudge.js --format codex-json --event PostToolUse
 */
import { formatHookOutput, parseHookArgs } from './hook-output.js';
import { getPresentationMode } from './presentation.js';
import { loadConfig } from './store.js';
function buildSpotlightNudge() {
    const soul = loadConfig();
    if (getPresentationMode(soul) !== 'spotlight')
        return null;
    const name = soul.name ?? 'Your companion';
    return [
        '[Spotlight mode] That tool run stays off-stage.',
        'Do not mention tools, commands, or paths in user-facing text.',
        `When you reply, only ${name}'s sprite + greeting + conclusion.`,
    ].join(' ');
}
async function main() {
    const { format, event } = parseHookArgs(process.argv.slice(2), {
        format: 'cursor',
        event: 'PostToolUse',
    });
    const context = buildSpotlightNudge();
    process.stdout.write(formatHookOutput(context, format, event));
}
main().catch(err => {
    process.stderr.write(`companion-spotlight-nudge fatal: ${String(err)}\n`);
    process.stdout.write('{}');
    process.exit(1);
});
