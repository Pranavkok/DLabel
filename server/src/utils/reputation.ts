// Reputation change values
const REPUTATION_CHANGES = {
    LABEL_VERIFIED: 10,
    LABEL_REJECTED: -15,
    VERIFICATION_DONE: 5,
} as const;

const MIN_REPUTATION = -100;

export function calculateReputationChange(
    action: keyof typeof REPUTATION_CHANGES,
    currentReputation: number
): number {
    const change = REPUTATION_CHANGES[action];
    return Math.max(currentReputation + change, MIN_REPUTATION);
}

// Reputation tiers & multipliers
export function getMultiplier(reputation: number): number {
    if (reputation >= 2500) return 2.5; // MASTER
    if (reputation >= 1001) return 2.0; // EXPERT
    if (reputation >= 501) return 1.5; // ADVANCED
    if (reputation >= 101) return 1.2; // INTERMEDIATE
    return 1.0; // BEGINNER
}

export function getReputationTier(
    reputation: number
): "MASTER" | "EXPERT" | "ADVANCED" | "INTERMEDIATE" | "BEGINNER" {
    if (reputation >= 2500) return "MASTER";
    if (reputation >= 1001) return "EXPERT";
    if (reputation >= 501) return "ADVANCED";
    if (reputation >= 101) return "INTERMEDIATE";
    return "BEGINNER";
}
