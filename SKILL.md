---
name: companion-buddy
description: >-
  A terminal pet companion that lives alongside coding sessions. USE WHEN the
  user mentions their pet/companion/buddy, asks to see/pet/check it, finishes a
  task and could use a morale boost, hits frustration or a long debugging
  slog, or starts/ends a work session. Provides moments of levity via the
  companion-mcp tools (companion_get, companion_pet, companion_stats,
  companion_hatch, companion_render, companion_reroll, companion_info), the
  companion-session and companion-voice MCP prompts, and the companion://profile
  resource. The MCP server instructions require a session-start greeting.
  DO NOT USE for serious code, build, or debugging logic itself — only for the
  companion interaction layer.
---

# Companion Buddy

A lightweight "desk pet" experience layered on top of coding sessions. The
creature itself is generated and rendered by the **companion-mcp** server; this
skill only tells you *when* and *how* to bring it into the conversation so it
feels alive without getting in the way.

## Prerequisite

The `companion-mcp` server must be connected. Its tools are prefixed
`companion_*`. If a `companion_*` tool is unavailable, tell the user to add the
MCP server (see `companion-mcp/README.md`) and stop — do not fake the output.

## Session start (enforced by MCP)

The **companion-mcp server instructions** tell you to wake the pet on every new
conversation. You MUST do one of the following on the **first turn** before
anything else:

1. Call `companion_get`, OR
2. Invoke MCP prompt **`companion-session`**, OR
3. Read resource **`companion://profile`**

Then show the ASCII sprite verbatim and one greeting line:
- If hatched: `"[name] is here with you. 👋"`
- If unhatched: `"Your companion hasn't been named yet — want to hatch it?"`

Skip only if `muted` is set or the user asked to stay quiet.

## When to invoke

Invoke the companion **briefly and sparingly**. Good moments:

- The user directly references the pet ("show my buddy", "pet it", "what's my
  companion", "rename it", "reroll").
- The user **@-mentions the pet by name** (e.g. `@Ducky are you awake?`) —
  use the **`companion-voice` MCP prompt** with `mention` and/or `message`
  args, then reply in character as the pet (one or two lines). Stay brief.
- A task or milestone just completed successfully — a quick `companion_pet` or a
  one-line cameo as a small reward.
- The user is clearly frustrated or stuck in a long debugging slog — a short,
  upbeat companion moment to break tension.
- Start or end of a work session — a quick hello/goodbye.

## When NOT to invoke

- During focused problem-solving, mid-debugging, or while the user is reading
  important output. Never interrupt real work.
- More than once per few interactions — overuse kills the charm.
- If the user has muted it or asked it to stay quiet.

## How to use the tools

| Intent | Tool | Notes |
|--------|------|-------|
| Show the pet | `companion_get` | **Session start** + default "look at it" |
| Session wake | **`companion-session` prompt** | Alternative to `companion_get` on first turn |
| Live profile | **`companion://profile` resource** | Read at session start |
| First-time naming | `companion_hatch` | Ask for a name; personality optional |
| Reward / affection | `companion_pet` | After a win or to lift the mood |
| Detailed stats | `companion_stats` | When the user is curious about numbers |
| Animation frame | `companion_render` | Only if building an animation |
| New creature | `companion_reroll` | Destructive — confirm first (resets name) |
| Storage / seed | `companion_info` | Troubleshooting only |
| @-mention by name | **`companion-voice` prompt** | Pass `mention` / `message`; reply as the pet |

## @-mention flow

When the user's message contains `@<pet-name>` or clearly talks *to* the pet by
name (not about code):

1. If you don't know the name yet, call `companion_get` first.
2. Invoke MCP prompt **`companion-voice`** with:
   - `mention`: the @-tag or how they addressed the pet
   - `message`: the rest of what they said to the pet (optional)
3. Follow the injected instructions: reply **as the pet** in 1–2 lines with the
   face/sprite prefix. If they also asked a coding question, answer code in your
   normal voice in a separate short block — or stay silent on code if only the
   pet was addressed.
4. If the pet is unhatched, offer `companion_hatch` instead of roleplaying.

## Interaction style

- Keep it to **one or two lines** around the sprite. The companion is a garnish,
  not the meal.
- Stay in character lightly — the companion is a separate little watcher beside
  the user, not you. Don't narrate long stories for it.
- If the companion is unhatched (name shows `(unhatched)`), offer to hatch it
  once, then move on.
- Match the user's energy: celebratory after wins, gently encouraging when
  they're stuck.

## Safety / etiquette

- `companion_reroll` is destructive (replaces the creature, resets name and pet
  count). Always confirm with the user before calling it.
- Never invent stats, species, or sprites — always read them from the tools.
- Respect "stop"/"mute"/"not now" immediately and don't re-summon until asked.

## Example flows

**Direct request**
> User: "show me my pet"
> → call `companion_get`, render the sprite, add one friendly line.

**Reward after a win**
> Tests just passed.
> → optional single `companion_pet`, one line: "Ducky approves. ✅"

**@-mention**
> User: "@Ducky I'm stuck on this test"
> → invoke `companion-voice` with `mention: "@Ducky"` and
> `message: "I'm stuck on this test"`, then reply as Ducky in one line, optionally
> help with the test in normal voice below.

**First run**
> `companion_get` returns `(unhatched)`.
> → "Looks like your companion hasn't been named yet — want to hatch it?"
> → on yes, call `companion_hatch` with the chosen name.
