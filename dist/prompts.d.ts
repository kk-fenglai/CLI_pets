export type CompanionVoiceArgs = {
    message?: string;
    mention?: string;
};
export declare function buildCompanionVoicePrompt(args?: CompanionVoiceArgs): {
    description: string;
    messages: {
        role: "user";
        content: {
            type: "text";
            text: string;
        };
    }[];
};
/** One-line hint for prompt list — includes current pet name when hatched. */
export declare function companionVoicePromptDescription(): string;
