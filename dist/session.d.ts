export declare function buildSessionInstructions(): string;
export declare function buildSessionPrompt(): {
    description: string;
    messages: {
        role: "user";
        content: {
            type: "text";
            text: string;
        };
    }[];
};
export declare function companionSessionPromptDescription(): string;
