---
name: companion-buddy
description: >-
  A terminal pet companion that lives alongside coding sessions. USE WHEN the
  user mentions their pet/companion/buddy, asks to see/pet/check it, finishes a
  task and could use a morale boost, hits frustration or a long debugging
  slog, or starts/ends a work session. Provides moments of levity via the
  companion-mcp tools (companion_get, companion_pet, companion_stats,
  companion_hatch, companion_render, companion_reroll, companion_info).
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

## When to invoke

Invoke the companion **briefly and sparingly**. Good moments:

- The user directly references the pet ("show my buddy", "pet it", "what's my
  companion", "rename it", "reroll").
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
| Show the pet | `companion_get` | Default "look at it" action |
| First-time naming | `companion_hatch` | Ask for a name; personality optional |
| Reward / affection | `companion_pet` | After a win or to lift the mood |
| Detailed stats | `companion_stats` | When the user is curious about numbers |
| Animation frame | `companion_render` | Only if building an animation |
| New creature | `companion_reroll` | Destructive — confirm first (resets name) |
| Storage / seed | `companion_info` | Troubleshooting only |

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

**First run**
> `companion_get` returns `(unhatched)`.
> → "Looks like your companion hasn't been named yet — want to hatch it?"
> → on yes, call `companion_hatch` with the chosen name.
