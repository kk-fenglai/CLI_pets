# companion-mcp 🦆

A terminal **desk-pet system** for **Cursor**, **Claude Code**, **Codex**, and any MCP-capable client.

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

## Connect MCP (all platforms)

Build once:

```powershell
cd companion-mcp
npm install
npm run build
```

### Cursor

Project files (already in this repo):

| File | Purpose |
|------|---------|
| `.cursor/mcp.json` | MCP server |
| `.cursor/hooks.json` | `sessionStart` → `wake.js --format cursor` |
| `.cursor/rules/companion-wake.mdc` | Always-on wake rule |
| `.cursor/skills/companion-buddy/` | Optional skill |

Restart Cursor after changes. MCP: Settings → MCP → `companion` should be green.

### Claude Code

| File | Purpose |
|------|---------|
| `.mcp.json` | MCP server (project root) |
| `.claude/settings.json` | `SessionStart` + `UserPromptSubmit` + `PostToolUse` (spotlight) hooks |
| `CLAUDE.md` | Wake instructions (re-read each session) |
| `.claude/skills/companion-buddy/` | Optional skill |

```powershell
# Or add globally / per project via CLI:
claude mcp add companion -- node "C:/path/to/companion-mcp/dist/index.js"
```

### Codex

| File | Purpose |
|------|---------|
| `.codex/config.toml` | `[mcp_servers.companion]` |
| `.codex/hooks.json` | `SessionStart` + `UserPromptSubmit` + `PostToolUse` (spotlight) hooks |
| `AGENTS.md` | Wake instructions (re-read every turn) |

**Trust the project** in `~/.codex/config.toml` or Codex will ignore project MCP/hooks.

```powershell
# Or add via CLI:
codex mcp add companion -- node companion-mcp/dist/index.js
```

### npx (no local build)

```powershell
claude mcp add companion -- npx -y companion-mcp
codex mcp add companion -- npx -y companion-mcp
```

## Wake hook (`companion-wake`)

`dist/wake.js` injects the live ASCII sprite into agent context via platform hooks:

| Format | Platform | Output |
|--------|----------|--------|
| `cursor` | Cursor `sessionStart` | `{ "additional_context": "..." }` |
| `plain` | Claude Code / Codex hooks | Raw text (stdout) |

```powershell
node companion-mcp/dist/wake.js --format cursor
node companion-mcp/dist/wake.js --format plain
```

Mute: `"muted": true` in `~/.companion-mcp/config.json`.

## Spotlight mode (clean output)

Hide tooling narration in chat — only the pet's sprite, optional "working" line, and final conclusion.

**Enable** (chat or MCP):

- "开启聚光灯模式" / "spotlight mode" / `companion_mode` with `mode: spotlight`

**Disable**:

- "normal mode" / `companion_mode` with `mode: normal`

Or edit `~/.companion-mcp/config.json`:

```json
{ "presentationMode": "spotlight" }
```

**What changes**

| Normal | Spotlight |
|--------|-----------|
| Shows tool calls, commands, file paths | Hides all of that in reply text |
| Standard assistant narration | Pet works off-stage; delivers verdict in character |
| Wake sprite + greeting | Same wake ritual |

**Cursor hook**: `.cursor/hooks.json` runs `spotlight-nudge.js` on `postToolUse` to reinforce clean output after each tool.

**Claude Code hook**: `.claude/settings.json` → `PostToolUse` → `spotlight-nudge.js --format claude-json`.

**Codex hook**: `.codex/hooks.json` → `PostToolUse` → `spotlight-nudge.js --format codex-json`.

**Limitation**: Cursor may still show tool-call cards in the UI. Spotlight mode controls **assistant reply text** only. For maximum cleanliness, collapse tool sections in the chat UI if your client supports it.

## Connect in Claude Code (details)

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
| `companion_mode` | Switch `normal` / `spotlight` presentation |

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
pet on **every user message** via `companion_get`, `companion-session`,
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
    ├── wake-context.ts # shared wake text for cross-platform hooks
    ├── hook-output.ts  # shared hook JSON formatting (Cursor / Claude / Codex)
    ├── presentation.ts # spotlight (clean output) mode rules
    ├── spotlight-nudge.ts # Cursor postToolUse hook for spotlight
    ├── wake.ts        # hook CLI (Cursor / Claude / Codex)
    └── index.ts       # MCP server entry (stdio)
```

## License

MIT. ASCII art and gameplay design are informed by publicly available source-analysis material; code is an independent implementation for learning and personal use.
