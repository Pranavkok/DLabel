import prisma from "../lib/prisma.js";
import { getMultiplier } from "./reputation.js";

export async function calculateEarnings(userId: string, postId: string) {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!post || !user) return 0;

    // Count verified labels by this user for this post
    const verifiedLabels = await prisma.data.count({
        where: {
            postId: postId,
            labeledBy: userId,
            status: "VERIFIED",
        },
    });

    // Count verifications done by this user for this post
    const verifications = await prisma.verification.count({
        where: {
            verifierId: userId,
            data: { postId: postId },
        },
    });

    const multiplier = getMultiplier(user.reputation);
    const basePerLabel = Number(post.labelingPool) / post.totalImages;
    const basePerVerification =
        Number(post.verificationPool) / (post.totalImages * 3); // 3 verifiers per image

    const labelEarnings = verifiedLabels * basePerLabel * multiplier;
    const verificationEarnings =
        verifications * basePerVerification * (multiplier * 0.5);

    return labelEarnings + verificationEarnings;
}

export async function calculateTotalEarnings(userId: string): Promise<number> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return 0;

    // Get all posts where user has labeled or verified
    const posts = await prisma.post.findMany({
        where: {
            OR: [
                { data: { some: { labeledBy: userId } } },
                { data: { some: { verifications: { some: { verifierId: userId } } } } },
            ],
        },
    });

    let total = 0;
    for (const post of posts) {
        total += await calculateEarnings(userId, post.id);
    }

    return total;
}
