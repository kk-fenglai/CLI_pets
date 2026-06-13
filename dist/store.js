import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir, hostname, userInfo } from 'node:os';
import { dirname, join } from 'node:path';
const CONFIG_DIR = process.env.COMPANION_MCP_DIR ?? join(homedir(), '.companion-mcp');
const CONFIG_PATH = join(CONFIG_DIR, 'config.json');
function defaultSeed() {
    // Stable per machine + user so the creature is consistent, but unique to you.
    try {
        return `${userInfo().username}@${hostname()}`;
    }
    catch {
        return 'anon@local';
    }
}
export function loadConfig() {
    try {
        if (existsSync(CONFIG_PATH)) {
            const raw = readFileSync(CONFIG_PATH, 'utf-8');
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed.seed === 'string') {
                return { ...parsed, seed: parsed.seed };
            }
        }
    }
    catch {
        // fall through to default on any read/parse error
    }
    return { seed: defaultSeed() };
}
export function saveConfig(config) {
    const dir = dirname(CONFIG_PATH);
    if (!existsSync(dir))
        mkdirSync(dir, { recursive: true });
    writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8');
}
export function getConfigPath() {
    return CONFIG_PATH;
}
