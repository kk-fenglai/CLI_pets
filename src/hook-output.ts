export type HookFormat = 'cursor' | 'plain' | 'claude-json' | 'codex-json'
export type HookEvent = 'SessionStart' | 'UserPromptSubmit' | 'PostToolUse'

export function formatHookOutput(
  context: string | null,
  format: HookFormat,
  event: HookEvent,
): string {
  if (!context) {
    return format === 'cursor' ? '{}' : ''
  }

  if (format === 'cursor') {
    return JSON.stringify({ additional_context: context })
  }

  if (format === 'claude-json' || format === 'codex-json') {
    return JSON.stringify({
      hookSpecificOutput: {
        hookEventName: event,
        additionalContext: context,
      },
    })
  }

  return context
}

export function parseHookArgs(
  argv: string[],
  defaults: { format?: HookFormat; event?: HookEvent } = {},
): { format: HookFormat; event: HookEvent } {
  let format: HookFormat = defaults.format ?? 'cursor'
  let event: HookEvent = defaults.event ?? 'SessionStart'

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--format' && argv[i + 1]) {
      format = argv[++i] as HookFormat
    } else if (arg === '--event' && argv[i + 1]) {
      event = argv[++i] as HookEvent
    }
  }

  const envFormat =
    (process.env.COMPANION_HOOK_FORMAT as HookFormat | undefined) ??
    (process.env.COMPANION_WAKE_FORMAT as HookFormat | undefined)
  if (envFormat) format = envFormat

  return { format, event }
}
