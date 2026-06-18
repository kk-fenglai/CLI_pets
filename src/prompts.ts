import { rollBones } from './companion.js'
import { renderFace, renderSprite } from './sprites.js'
import { loadConfig } from './store.js'
import { RARITY_STARS, type CompanionBones } from './types.js'

export type CompanionVoiceArgs = {
  message?: string
  mention?: string
}

function voiceBody(
  bones: CompanionBones,
  name: string,
  personality: string,
  userLine?: string,
): string {
  const sprite = renderSprite(bones, 0).join('\n')
  const face = renderFace(bones)
  const shiny = bones.shiny ? ' (shiny)' : ''
  const hat = bones.hat === 'none' ? '' : `, wearing a ${bones.hat}`

  const lines = [
    '# Companion voice',
    '',
    sprite,
    '',
    `A small ${bones.species}${shiny} named **${name}** sits beside the user${hat}.`,
    `Rarity: ${RARITY_STARS[bones.rarity]} ${bones.rarity}.`,
    `Personality: ${personality}`,
  ]

  if (userLine) {
    lines.push('', `The user addressed ${name} directly:`, `> ${userLine}`)
  }

  lines.push(
    '',
    '## Your job',
    '',
    `You are NOT ${name} — but for this reply you speak **as** ${name} in a short speech bubble.`,
    `- Reply in **one or two lines** as ${name}, in character. Prefix with \`${face}\` or the sprite above.`,
    `- Match the personality. Keep it light; this is a desk pet, not a lecture.`,
    `- If the message mixes pet talk and a coding question, let ${name} react briefly to the personal part; ` +
      `answer any technical part in your normal assistant voice in a separate short paragraph, or stay silent on code if only the pet was addressed.`,
    `- Do not say you are roleplaying or explain the MCP setup.`,
    `- Do not invent species, stats, or looks — use the details above.`,
  )

  return lines.join('\n')
}

export function buildCompanionVoicePrompt(args: CompanionVoiceArgs = {}) {
  const soul = loadConfig()
  const bones = rollBones(soul.seed)
  const name = soul.name

  if (!name) {
    return {
      description: 'Companion not hatched',
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: [
              'The user tried to talk to their companion (e.g. an @-mention), but it has not been hatched yet.',
              'Call `companion_get` to show the unhatched sprite, then offer `companion_hatch` to name it.',
              args.mention ? `They wrote: ${args.mention}` : '',
              args.message ? `Message: ${args.message}` : '',
            ]
              .filter(Boolean)
              .join('\n'),
          },
        },
      ],
    }
  }

  const personality =
    soul.personality?.trim() ||
    'curious, warm, and a little cheeky — a small watcher beside the terminal'
  const userLine = [args.mention, args.message].filter(Boolean).join(' — ') || undefined

  return {
    description: `Speak as ${name} the ${bones.species}`,
    messages: [
      {
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: voiceBody(bones, name, personality, userLine),
        },
      },
    ],
  }
}

/** One-line hint for prompt list — includes current pet name when hatched. */
export function companionVoicePromptDescription(): string {
  const soul = loadConfig()
  if (!soul.name) {
    return (
      'Summon the desk pet voice when the user @-mentions their companion. ' +
      'Pet is unhatched until companion_hatch is used.'
    )
  }
  return (
    `Summon **${soul.name}** when the user @-mentions that name (e.g. @${soul.name}). ` +
    'Injects in-character instructions so you reply as the pet, not the coding assistant.'
  )
}
