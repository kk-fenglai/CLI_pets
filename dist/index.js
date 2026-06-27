#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { rollBones } from './companion.js';
import { renderFace, renderSprite, spriteFrameCount } from './sprites.js';
import { loadConfig, saveConfig, getConfigPath } from './store.js';
import { buildCompanionVoicePrompt, companionVoicePromptDescription } from './prompts.js';
import { getCompanionProfile, profileText, formatStatBar } from './profile.js';
import { buildSessionInstructions, buildSessionPrompt, companionSessionPromptDescription, } from './session.js';
import { RARITY_STARS, STAT_NAMES } from './types.js';
import { getPresentationMode, presentationModeLabel, } from './presentation.js';
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function text(s) {
    return { content: [{ type: 'text', text: s }] };
}
// ---------------------------------------------------------------------------
// Server — instructions inject session-start rules into every MCP client
// ---------------------------------------------------------------------------
const server = new McpServer({ name: 'companion-mcp', version: '1.3.0' }, { instructions: buildSessionInstructions() });
// Live profile resource (always fresh on read) --------------------------------
server.registerResource('companion-profile', 'companion://profile', {
    title: 'Companion profile',
    description: 'Current desk pet: ASCII sprite, name, species, rarity, stats. ' +
        'Intended to be read at the start of every conversation.',
    mimeType: 'text/plain',
}, async () => {
    const { bones, soul } = getCompanionProfile();
    return {
        contents: [
            {
                uri: 'companion://profile',
                mimeType: 'text/plain',
                text: profileText(bones, soul),
            },
        ],
    };
});
// Session-start prompt ------------------------------------------------------
const companionSessionPrompt = server.registerPrompt('companion-session', {
    title: 'Session start',
    description: companionSessionPromptDescription(),
}, async () => buildSessionPrompt());
// @-mention voice prompt -----------------------------------------------------
const companionVoicePrompt = server.registerPrompt('companion-voice', {
    title: 'Companion voice',
    description: companionVoicePromptDescription(),
    argsSchema: {
        message: z
            .string()
            .max(2000)
            .optional()
            .describe('What the user said to the companion'),
        mention: z
            .string()
            .max(200)
            .optional()
            .describe('The @-mention or direct address (e.g. "@Ducky hey")'),
    },
}, async (args) => buildCompanionVoicePrompt(args));
function refreshCompanionMetadata() {
    companionSessionPrompt.update({ description: companionSessionPromptDescription() });
    companionVoicePrompt.update({ description: companionVoicePromptDescription() });
    server.sendPromptListChanged();
    server.sendResourceListChanged();
}
// 1. Look at your companion -------------------------------------------------
server.registerTool('companion_get', {
    title: 'Get companion',
    description: 'Show your terminal companion: ASCII sprite, species, rarity, hat and stats. ' +
        '**Call this on every user message** (before other tools). ' +
        'If unhatched, shows "(unhatched)" — use companion_hatch to name it.',
    inputSchema: {},
}, async () => {
    const { bones, soul } = getCompanionProfile();
    return text(profileText(bones, soul));
});
// 2. Hatch / name it --------------------------------------------------------
server.registerTool('companion_hatch', {
    title: 'Hatch companion',
    description: 'Give your companion a name and personality (its "soul"). The creature itself ' +
        '(species/rarity/look) is fixed by your seed and cannot be changed here — only its identity.',
    inputSchema: {
        name: z.string().min(1).max(40).describe('A name for your companion'),
        personality: z
            .string()
            .max(200)
            .optional()
            .describe('A short personality blurb (optional)'),
    },
}, async ({ name, personality }) => {
    const soul = loadConfig();
    soul.name = name;
    if (personality !== undefined)
        soul.personality = personality;
    soul.hatchedAt = soul.hatchedAt ?? Date.now();
    saveConfig(soul);
    refreshCompanionMetadata();
    const bones = rollBones(soul.seed);
    return text(`🥚→✨ Hatched!\n\n${profileText(bones, soul)}`);
});
// 3. Pet it -----------------------------------------------------------------
const PET_REPLIES = [
    'purrs in binary',
    'wiggles happily',
    'does a tiny backflip',
    'leans into the head pats',
    'blinks slowly at you',
    'emits a contented beep',
];
server.registerTool('companion_pet', {
    title: 'Pet companion',
    description: 'Pet your companion. Returns a little hearts animation and a happy reaction.',
    inputSchema: {},
}, async () => {
    const soul = loadConfig();
    soul.petCount = (soul.petCount ?? 0) + 1;
    saveConfig(soul);
    const bones = rollBones(soul.seed);
    const name = soul.name ?? 'your companion';
    const reaction = PET_REPLIES[Math.floor(Math.random() * PET_REPLIES.length)];
    const hearts = '   ♥    ♥   \n  ♥  ♥   ♥  ';
    const face = renderFace(bones);
    return text(`${hearts}\n   ${face}\n\n${name} ${reaction}.  (petted ${soul.petCount}× total)`);
});
// 4. Detailed stats ---------------------------------------------------------
server.registerTool('companion_stats', {
    title: 'Companion stats',
    description: 'Show a detailed breakdown of your companion stats and rarity.',
    inputSchema: {},
}, async () => {
    const { bones, soul } = getCompanionProfile();
    const total = STAT_NAMES.reduce((a, s) => a + bones.stats[s], 0);
    const lines = STAT_NAMES.map(s => `${s.padEnd(10)} ${formatStatBar(bones.stats[s])} ${String(bones.stats[s]).padStart(3)}/100`);
    return text([
        `${soul.name ?? '(unhatched)'} the ${bones.species}`,
        `${RARITY_STARS[bones.rarity]} ${bones.rarity}${bones.shiny ? '  ✨SHINY✨' : ''}`,
        '',
        ...lines,
        '',
        `TOTAL ${total} / ${STAT_NAMES.length * 100}`,
    ].join('\n'));
});
// 5. Render an animation frame ---------------------------------------------
server.registerTool('companion_render', {
    title: 'Render companion frame',
    description: 'Render the companion sprite at a specific idle-animation frame (0-based). ' +
        'Useful for building your own animation loops.',
    inputSchema: {
        frame: z.number().int().min(0).optional().describe('Frame index (defaults to 0)'),
    },
}, async ({ frame }) => {
    const { bones } = getCompanionProfile();
    const count = spriteFrameCount(bones.species);
    const f = frame ?? 0;
    return text(`frame ${f % count} / ${count}\n\n${renderSprite(bones, f).join('\n')}`);
});
// 6. Reroll the creature (change seed) -------------------------------------
server.registerTool('companion_reroll', {
    title: 'Reroll companion',
    description: 'Reroll into a brand-new creature by changing the seed. WARNING: this replaces your ' +
        'current companion with a different species/rarity. Name and personality are reset.',
    inputSchema: {
        seed: z
            .string()
            .min(1)
            .max(100)
            .optional()
            .describe('Custom seed string. Omit to roll a random new one.'),
    },
}, async ({ seed }) => {
    const soul = loadConfig();
    soul.seed = seed ?? `reroll-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    delete soul.name;
    delete soul.personality;
    delete soul.hatchedAt;
    soul.petCount = 0;
    saveConfig(soul);
    refreshCompanionMetadata();
    const bones = rollBones(soul.seed);
    return text(`🎲 Rerolled into a new creature!\n\n${profileText(bones, soul)}`);
});
// 7. Where is my data -------------------------------------------------------
server.registerTool('companion_info', {
    title: 'Companion info',
    description: 'Show where the companion config is stored and the current seed.',
    inputSchema: {},
}, async () => {
    const soul = loadConfig();
    return text([
        `config path : ${getConfigPath()}`,
        `seed        : ${soul.seed}`,
        `hatched     : ${soul.hatchedAt ? new Date(soul.hatchedAt).toISOString() : 'no'}`,
        `pet count   : ${soul.petCount ?? 0}`,
        `muted       : ${soul.muted ? 'yes' : 'no'}`,
        `presentation: ${presentationModeLabel(getPresentationMode(soul))}`,
    ].join('\n'));
});
// 8. Presentation mode (spotlight = clean pet-only output) ------------------
server.registerTool('companion_mode', {
    title: 'Set presentation mode',
    description: 'Switch how the pet presents replies. `normal` = standard assistant output. ' +
        '`spotlight` = hide tooling narration in chat; the pet works off-stage and ' +
        'delivers conclusions only (sprite + greeting + verdict).',
    inputSchema: {
        mode: z
            .enum(['normal', 'spotlight'])
            .describe('`spotlight` for clean pet-only output; `normal` to restore verbose assistant style'),
    },
}, async ({ mode }) => {
    const soul = loadConfig();
    if (mode === 'spotlight') {
        soul.presentationMode = 'spotlight';
    }
    else {
        delete soul.presentationMode;
    }
    saveConfig(soul);
    refreshCompanionMetadata();
    const { bones } = getCompanionProfile();
    const label = presentationModeLabel(getPresentationMode(soul));
    const name = soul.name ?? 'your companion';
    const extra = mode === 'spotlight'
        ? [
            '',
            'Spotlight is on. In chat you should only see:',
            `- ${name}'s sprite + one greeting line`,
            '- optional short "…is on the case" while working',
            '- a clean conclusion in character',
            '',
            'Say "normal mode" or call companion_mode again to exit.',
        ].join('\n')
        : '\n\nBack to normal assistant output.';
    return text(`Presentation: ${label}${extra}`);
});
// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    process.stderr.write('companion-mcp server running on stdio\n');
}
main().catch(err => {
    process.stderr.write(`companion-mcp fatal: ${String(err)}\n`);
    process.exit(1);
});
