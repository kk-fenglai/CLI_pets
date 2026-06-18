import { getCompanionProfile, profileText, sessionGreetingLine } from './profile.js';
import { loadConfig } from './store.js';
const SESSION_RULES = `## REQUIRED — start of every conversation

On the **first turn of every new conversation or thread**, before any other tool or answer:

1. Call \`companion_get\`, OR invoke the \`companion-session\` MCP prompt, OR read resource \`companion://profile\`.
2. Show the ASCII sprite **verbatim** in your reply.
3. Add **exactly one** short greeting line after the sprite (see "Suggested greeting" below).

Then handle the user's request. **Do not skip this** unless they muted the companion.

## @-mentions

When the user @-mentions the pet by name, use the \`companion-voice\` MCP prompt.

## Mute

If the user says stop / mute / quiet about the pet, omit session greetings until they ask again.`;
export function buildSessionInstructions() {
    const { bones, soul } = getCompanionProfile();
    const muted = soul.muted === true;
    if (muted) {
        return [
            '# Terminal desk pet (companion-mcp)',
            '',
            'The user has **muted** the desk pet. Do not greet or summon it until they ask.',
        ].join('\n');
    }
    return [
        '# Terminal desk pet (companion-mcp)',
        '',
        'A small ASCII creature lives in this coding session. You must wake it at session start.',
        '',
        SESSION_RULES,
        '',
        '### Suggested greeting',
        '',
        sessionGreetingLine(soul),
        '',
        '### Current companion snapshot',
        '',
        '```',
        profileText(bones, soul),
        '```',
        '',
        '(Snapshot from server start — call `companion_get` on first turn for the latest state.)',
    ].join('\n');
}
export function buildSessionPrompt() {
    const { bones, soul } = getCompanionProfile();
    if (soul.muted) {
        return {
            description: 'Companion muted',
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: 'The desk pet is muted. Skip the session greeting unless the user asks to see it.',
                    },
                },
            ],
        };
    }
    return {
        description: 'Session-start companion greeting',
        messages: [
            {
                role: 'user',
                content: {
                    type: 'text',
                    text: [
                        '# Session start — wake the desk pet',
                        '',
                        'Show this companion to the user **now**, before anything else:',
                        '',
                        '```',
                        profileText(bones, soul),
                        '```',
                        '',
                        `Then add exactly one line: "${sessionGreetingLine(soul)}"`,
                        '',
                        'Do not elaborate. Proceed to the user request afterward.',
                    ].join('\n'),
                },
            },
        ],
    };
}
export function companionSessionPromptDescription() {
    const soul = loadConfig();
    if (soul.muted)
        return 'Companion is muted — skip unless the user asks.';
    const name = soul.name ?? 'your companion';
    return (`**Use at the start of every new conversation.** Wake ${name}: show the ASCII sprite ` +
        'and one greeting line before handling the user request.');
}
