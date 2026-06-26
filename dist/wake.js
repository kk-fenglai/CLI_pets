#!/usr/bin/env node
/**
 * Cross-platform hook helper for companion wake injection.
 *
 * Formats:
 *   cursor       → { "additional_context": "..." }  (Cursor sessionStart)
 *   plain        → raw text (Claude Code / Codex hooks)
 *   claude-json  → hookSpecificOutput JSON (Claude Code)
 *   codex-json   → hookSpecificOutput JSON (Codex)
 *
 * Usage:
 *   node dist/wake.js --format cursor
 *   node dist/wake.js --format plain
 *   node dist/wake.js --format claude-json --event UserPromptSubmit
 */
import { buildWakeContext, formatWakeOutput, parseWakeArgs } from './wake-context.js';
async function main() {
    const { format, event } = parseWakeArgs(process.argv.slice(2));
    const context = buildWakeContext();
    process.stdout.write(formatWakeOutput(context, format, event));
}
main().catch(err => {
    process.stderr.write(`companion-wake fatal: ${String(err)}\n`);
    process.stdout.write('{}');
    process.exit(1);
});
