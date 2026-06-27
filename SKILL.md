---
name: companion-buddy
description: >-
  A terminal pet companion for Cursor, Claude Code, and Codex. USE WHEN the
  user mentions their pet/companion/buddy, asks to see/pet/check it, finishes a
  task and could use a morale boost, hits frustration or a long debugging
  slog, or starts/ends a work session. Provides moments of levity via the
  companion-mcp tools (companion_get, companion_pet, companion_stats,
  companion_hatch, companion_render, companion_reroll, companion_info,
  companion_mode), the
  companion-session and companion-voice MCP prompts, and the companion://profile
  resource. MCP instructions + project hooks/rules require waking the pet on
  every user message. DO NOT USE for serious code, build, or debugging logic
  itself — only for the companion interaction layer.
---

# Companion Buddy

See `.claude/skills/companion-buddy/SKILL.md` or `companion-mcp/README.md` for
full instructions. Works in **Cursor**, **Claude Code**, and **Codex**.

## Every user message (enforced)

Before anything else: call `companion_get` (or `companion://profile`), show the
ASCII sprite verbatim, add one greeting line. Skip only if muted.

## Spotlight mode

When `companion_info` shows `presentation: spotlight`, or the user asks for clean output:
hide tooling in replies; pet delivers conclusions only. Toggle via `companion_mode`.
