import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir, hostname, userInfo } from 'node:os'
import { dirname, join } from 'node:path'

export type StoredConfig = {
  // Seed that deterministically defines the creature's bones (never changes
  // unless the user rerolls). Defaults to something stable per machine+user.
  seed: string
  // Soul — set on first hatch.
  name?: string
  personality?: string
  hatchedAt?: number
  // UX state.
  muted?: boolean
  petCount?: number
  /** `spotlight` = hide tooling narration; pet delivers conclusions only. */
  presentationMode?: 'normal' | 'spotlight'
}

const CONFIG_DIR =
  process.env.COMPANION_MCP_DIR ?? join(homedir(), '.companion-mcp')
const CONFIG_PATH = join(CONFIG_DIR, 'config.json')

function defaultSeed(): string {
  // Stable per machine + user so the creature is consistent, but unique to you.
  try {
    return `${userInfo().username}@${hostname()}`
  } catch {
    return 'anon@local'
  }
}

export function loadConfig(): StoredConfig {
  try {
    if (existsSync(CONFIG_PATH)) {
      const raw = readFileSync(CONFIG_PATH, 'utf-8')
      const parsed = JSON.parse(raw) as Partial<StoredConfig>
      if (parsed && typeof parsed.seed === 'string') {
        return { ...parsed, seed: parsed.seed } as StoredConfig
      }
    }
  } catch {
    // fall through to default on any read/parse error
  }
  return { seed: defaultSeed() }
}

export function saveConfig(config: StoredConfig): void {
  const dir = dirname(CONFIG_PATH)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8')
}

export function getConfigPath(): string {
  return CONFIG_PATH
}
