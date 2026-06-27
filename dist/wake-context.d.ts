import type { HookEvent, HookFormat } from './hook-output.js';
import { formatHookOutput, parseHookArgs } from './hook-output.js';
export type WakeFormat = HookFormat;
export type WakeEvent = HookEvent;
export { formatHookOutput as formatWakeOutput, parseHookArgs as parseWakeArgs };
/** Build the desk-pet wake text injected by hooks. Returns null when muted. */
export declare function buildWakeContext(): string | null;
