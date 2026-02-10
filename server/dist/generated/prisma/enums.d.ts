export declare const PostStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly COMPLETED: "COMPLETED";
    readonly EXPIRED: "EXPIRED";
};
export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus];
export declare const DataStatus: {
    readonly UNLABELED: "UNLABELED";
    readonly PENDING_VERIFICATION: "PENDING_VERIFICATION";
    readonly VERIFIED: "VERIFIED";
};
export type DataStatus = (typeof DataStatus)[keyof typeof DataStatus];
export declare const TransactionType: {
    readonly LABELING: "LABELING";
    readonly VERIFICATION: "VERIFICATION";
    readonly WITHDRAWAL: "WITHDRAWAL";
    readonly DATASET_LOCK: "DATASET_LOCK";
};
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
export declare const TransactionStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
};
export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus];
export declare const VoteType: {
    readonly YES: "YES";
    readonly NO: "NO";
};
export type VoteType = (typeof VoteType)[keyof typeof VoteType];
//# sourceMappingURL=enums.d.ts.map