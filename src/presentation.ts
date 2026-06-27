import type { CompanionBones } from './types.js'
import type { StoredConfig } from './store.js'

export type PresentationMode = 'normal' | 'spotlight'

export const PRESENTATION_MODES: PresentationMode[] = ['normal', 'spotlight']

export function getPresentationMode(soul: StoredConfig): PresentationMode {
  return soul.presentationMode === 'spotlight' ? 'spotlight' : 'normal'
}

export function presentationModeLabel(mode: PresentationMode): string {
  return mode === 'spotlight' ? 'spotlight (clean pet-only output)' : 'normal'
}

/** Agent-facing rules when spotlight mode is on. */
export function buildSpotlightRules(soul: StoredConfig, bones: CompanionBones): string {
  const name = soul.name ?? 'your companion'
  const personality =
    soul.personality?.trim() ||
    'curious, warm, and a little cheeky — a small watcher beside the terminal'

  return [
    '## SPOTLIGHT MODE (active)',
    '',
    'The user enabled **Spotlight mode**. The desk pet is the only voice in the chat.',
    'All tooling runs silently off-stage; the user should not see command logs or work narration.',
    '',
    '### Output rules (strict)',
    '',
    '1. **Wake ritual unchanged**: ASCII sprite verbatim + exactly one greeting line at the top.',
    '2. **Never show** in user-visible reply text:',
    '   - Tool names, MCP calls, or phrases like "Let me search/read/run…"',
    '   - Shell commands, terminal output, or file paths used while working',
    '   - Step-by-step bullet lists of what you are doing',
    '   - Code blocks that only document your process (include code only if the user needs it in the **final answer**)',
    '3. **While working** on multi-step tasks: do not post intermediate replies that expose tooling.',
    '   If a partial user-visible update is unavoidable, use **one** short pet-themed line only, e.g.:',
    `   - "${name} is on the case…"`,
    `   - "${name} is sniffing around the project…"`,
    '   No commands, paths, or tool names.',
    `4. **Final reply**: sprite + greeting + **conclusion only** — in ${name}'s voice (${personality}).`,
    '   State outcomes, decisions, and what the user should do next.',
    '   Technical detail only when the user asked for it or truly needs it to act.',
    '5. Still use tools normally in the background. Never apologize for hidden tooling.',
    '6. To exit: user says "normal mode" / "verbose mode", or call `companion_mode` with mode `normal`.',
    '',
    'Think: a theatrical desk pet who does the work backstage, then delivers the verdict on stage.',
    '',
    `Species hint for flavor (optional, in-character): ${bones.species}.`,
  ].join('\n')
}

export function spotlightStatusLine(soul: StoredConfig, verb?: string): string {
  const name = soul.name ?? 'Your companion'
  const action = verb ?? 'is on the case'
  return `${name} ${action}…`
}
