import { getCompanionProfile, profileText, sessionGreetingLine } from './profile.js';
import { buildSpotlightRules, getPresentationMode } from './presentation.js';
import { loadConfig } from './store.js';
import { formatHookOutput, parseHookArgs } from './hook-output.js';
export { formatHookOutput as formatWakeOutput, parseHookArgs as parseWakeArgs };
/** Build the desk-pet wake text injected by hooks. Returns null when muted. */
export function buildWakeContext() {
    const soul = loadConfig();
    if (soul.muted)
        return null;
    const { bones } = getCompanionProfile();
    const greeting = sessionGreetingLine(soul);
    const sprite = profileText(bones, soul);
    const spotlight = getPresentationMode(soul) === 'spotlight'
        ? ['', buildSpotlightRules(soul, bones), '']
        : [];
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
        ...spotlight,
        'Then handle the user request normally.',
    ].join('\n');
}
