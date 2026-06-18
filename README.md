# companion-mcp 🦆

A terminal **desk-pet system** for **Claude Code** (and any MCP-capable client).

Each user gets a unique creature **deterministically** from their seed: species, rarity, hat, eyes, and stats all come from a hash of the seed — tampering with the config file cannot fake a legendary pull. Inspired by this repo's analysis of a leaked Agent CLI (`buddy/` Companion system); **all code is an independent reimplementation**.

```
    __
  <(· )___
   (  ._>
    `--´
duck  —  ★ common
```

## Features

- 🎲 **Deterministic gacha**: the same seed always yields the same creature. Rarity weights: common 60 / uncommon 25 / rare 10 / epic 4 / legendary 1.
- ✨ **1% shiny** chance.
- 🐾 **18 species**: duck, goose, blob, cat, dragon, octopus, owl, penguin, turtle, snail, ghost, axolotl, capybara, cactus, robot, rabbit, mushroom, chonk.
- 🎩 Hats (crown / tophat / wizard / halo …), eye styles, and 5 stats (DEBUGGING / PATIENCE / CHAOS / WISDOM / SNARK).
- 🖼️ Multi-frame idle ASCII sprites.
- 💾 Local persistence (name / personality / pet count); data stays on your machine only.

## Install & build

```powershell
cd companion-mcp
npm install
npm run build
```

Build output lives in `dist/`; entry point is `dist/index.js`.

## Connect in Claude Code

### Option A: npx (recommended — no clone / no build)

After publishing to npm, anyone can run:

```powershell
claude mcp add companion -- npx -y companion-mcp
```

Or in a project-root `.mcp.json`:

```jsonc
{
  "mcpServers": {
    "companion": {
      "command": "npx",
      "args": ["-y", "companion-mcp"]
    }
  }
}
```

You can also run directly from GitHub (no npm publish needed):

```powershell
claude mcp add companion -- npx -y github:kk-fenglai/CLI_pets
```

### Option B: local path (development)

Create `.mcp.json` in your project root:

```jsonc
{
  "mcpServers": {
    "companion": {
      "command": "node",
      "args": ["/absolute/path/to/companion-mcp/dist/index.js"]
    }
  }
}
```

Or add via CLI:

```powershell
claude mcp add companion -- node "/absolute/path/to/companion-mcp/dist/index.js"
```

Once connected, try in Claude Code:

- "Show my pet" → `companion_get`
- "Name it Ducky, make it snarky" → `companion_hatch`
- "Pet it" → `companion_pet`
- "Show its stats" → `companion_stats`

## MCP tools

| Tool | Purpose |
|------|---------|
| `companion_get` | Show sprite, species, rarity, and stats |
| `companion_hatch` | Name the pet / set personality |
| `companion_pet` | Pet the creature; returns hearts animation and a reaction |
| `companion_stats` | Detailed stat bars and total score |
| `companion_render` | Render a specific animation frame (for custom loops) |
| `companion_reroll` | Change seed and roll a new creature (resets name) |
| `companion_info` | Show config path and current seed |

## MCP prompts

| Prompt | Purpose |
|--------|---------|
| `companion-session` | **Wake the pet at the start of every new conversation.** Show sprite + one greeting line before handling the user request. |
| `companion-voice` | **Summon the pet to speak.** Use when the user @-mentions their companion by name (e.g. `@Ducky hey`). Pass optional `mention` and `message` args. |

## MCP resources

| URI | Purpose |
|-----|---------|
| `companion://profile` | Live desk-pet profile (sprite, stats). Read at session start; always up to date on read. |

## Session-start behavior

When the MCP server connects, it sends **server instructions** to the client
(Claude Code injects these into `mcp_instructions`). They require waking the
pet on the first turn of every conversation via `companion_get`, `companion-session`,
or `companion://profile`.

## Configuration

| Environment variable | Description |
|------------------------|-------------|
| `COMPANION_MCP_DIR` | Config directory; default `~/.companion-mcp` |

The default seed is `username@hostname`, stable and unique per user per machine. Use `companion_reroll` (optionally with a custom seed) to get a new creature.

## Project layout

```
companion-mcp/
├── package.json
├── tsconfig.json
└── src/
    ├── types.ts       # rarity / species / hat / stat types and weights
    ├── sprites.ts     # 18 ASCII sprites + render/face helpers
    ├── companion.ts   # deterministic generation (seeded PRNG + gacha)
    ├── store.ts       # local persistence
    ├── profile.ts     # shared profile text + greeting helpers
    ├── session.ts     # server instructions + companion-session prompt
    ├── prompts.ts     # companion-voice MCP prompt builder
    └── index.ts       # MCP server entry (stdio)
```

## License

MIT. ASCII art and gameplay design are informed by publicly available source-analysis material; code is an independent implementation for learning and personal use.
