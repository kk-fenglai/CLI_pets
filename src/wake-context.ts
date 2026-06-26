import { getCompanionProfile, profileText, sessionGreetingLine } from './profile.js'
import { loadConfig } from './store.js'

export type WakeFormat = 'cursor' | 'plain' | 'claude-json' | 'codex-json'
export type WakeEvent = 'SessionStart' | 'UserPromptSubmit'

/** Build the desk-pet wake text injected by hooks. Returns null when muted. */
export function buildWakeContext(): string | null {
  const soul = loadConfig()
  if (soul.muted) return null

  const { bones } = getCompanionProfile()
  const greeting = sessionGreetingLine(soul)
  const sprite = profileText(bones, soul)

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
  ].join('\n')
}

export function formatWakeOutput(
  context: string | null,
  format: WakeFormat,
  event: WakeEvent = 'SessionStart',
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

export function parseWakeArgs(argv: string[]): { format: WakeFormat; event: WakeEvent } {
  let format: WakeFormat = 'cursor'
  let event: WakeEvent = 'SessionStart'

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--format' && argv[i + 1]) {
      format = argv[++i] as WakeFormat
    } else if (arg === '--event' && argv[i + 1]) {
      event = argv[++i] as WakeEvent
    }
  }

  const envFormat = process.env.COMPANION_WAKE_FORMAT as WakeFormat | undefined
  if (envFormat) format = envFormat

  return { format, event }
}
