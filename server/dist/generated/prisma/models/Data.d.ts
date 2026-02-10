import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Data
 *
 */
export type DataModel = runtime.Types.Result.DefaultSelection<Prisma.$DataPayload>;
export type AggregateData = {
    _count: DataCountAggregateOutputType | null;
    _avg: DataAvgAggregateOutputType | null;
    _sum: DataSumAggregateOutputType | null;
    _min: DataMinAggregateOutputType | null;
    _max: DataMaxAggregateOutputType | null;
};
export type DataAvgAggregateOutputType = {
    value: number | null;
};
export type DataSumAggregateOutputType = {
    value: number | null;
};
export type DataMinAggregateOutputType = {
    id: string | null;
    postId: string | null;
    value: number | null;
    imageUrl: string | null;
    status: $Enums.DataStatus | null;
    assignedLabel: string | null;
    labeledBy: string | null;
    labeledAt: Date | null;
    createdAt: Date | null;
};
export type DataMaxAggregateOutputType = {
    id: string | null;
    postId: string | null;
    value: number | null;
    imageUrl: string | null;
    status: $Enums.DataStatus | null;
    assignedLabel: string | null;
    labeledBy: string | null;
    labeledAt: Date | null;
    createdAt: Date | null;
};
export type DataCountAggregateOutputType = {
    id: number;
    postId: number;
    value: number;
    imageUrl: number;
    status: number;
    assignedLabel: number;
    labeledBy: number;
    labeledAt: number;
    createdAt: number;
    _all: number;
};
export type DataAvgAggregateInputType = {
    value?: true;
};
export type DataSumAggregateInputType = {
    value?: true;
};
export type DataMinAggregateInputType = {
    id?: true;
    postId?: true;
    value?: true;
    imageUrl?: true;
    status?: true;
    assignedLabel?: true;
    labeledBy?: true;
    labeledAt?: true;
    createdAt?: true;
};
export type DataMaxAggregateInputType = {
    id?: true;
    postId?: true;
    value?: true;
    imageUrl?: true;
    status?: true;
    assignedLabel?: true;
    labeledBy?: true;
    labeledAt?: true;
    createdAt?: true;
};
export type DataCountAggregateInputType = {
    id?: true;
    postId?: true;
    value?: true;
    imageUrl?: true;
    status?: true;
    assignedLabel?: true;
    labeledBy?: true;
    labeledAt?: true;
    createdAt?: true;
    _all?: true;
};
export type DataAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Data to aggregate.
     */
    where?: Prisma.DataWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Data to fetch.
     */
    orderBy?: Prisma.DataOrderByWithRelationInput | Prisma.DataOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DataWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Data from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Data.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Data
    **/
    _count?: true | DataCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DataAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DataSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DataMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DataMaxAggregateInputType;
};
export type GetDataAggregateType<T extends DataAggregateArgs> = {
    [P in keyof T & keyof AggregateData]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateData[P]> : Prisma.GetScalarType<T[P], AggregateData[P]>;
};
export type DataGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DataWhereInput;
    orderBy?: Prisma.DataOrderByWithAggregationInput | Prisma.DataOrderByWithAggregationInput[];
    by: Prisma.DataScalarFieldEnum[] | Prisma.DataScalarFieldEnum;
    having?: Prisma.DataScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DataCountAggregateInputType | true;
    _avg?: DataAvgAggregateInputType;
    _sum?: DataSumAggregateInputType;
    _min?: DataMinAggregateInputType;
    _max?: DataMaxAggregateInputType;
};
export type DataGroupByOutputType = {
    id: string;
    postId: string;
    value: number;
    imageUrl: string;
    status: $Enums.DataStatus;
    assignedLabel: string | null;
    labeledBy: string | null;
    labeledAt: Date | null;
    createdAt: Date;
    _count: DataCountAggregateOutputType | null;
    _avg: DataAvgAggregateOutputType | null;
    _sum: DataSumAggregateOutputType | null;
    _min: DataMinAggregateOutputType | null;
    _max: DataMaxAggregateOutputType | null;
};
type GetDataGroupByPayload<T extends DataGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DataGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DataGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DataGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DataGroupByOutputType[P]>;
}>>;
export type DataWhereInput = {
    AND?: Prisma.DataWhereInput | Prisma.DataWhereInput[];
    OR?: Prisma.DataWhereInput[];
    NOT?: Prisma.DataWhereInput | Prisma.DataWhereInput[];
    id?: Prisma.StringFilter<"Data"> | string;
    postId?: Prisma.StringFilter<"Data"> | string;
    value?: Prisma.IntFilter<"Data"> | number;
    imageUrl?: Prisma.StringFilter<"Data"> | string;
    status?: Prisma.EnumDataStatusFilter<"Data"> | $Enums.DataStatus;
    assignedLabel?: Prisma.StringNullableFilter<"Data"> | string | null;
    labeledBy?: Prisma.StringNullableFilter<"Data"> | string | null;
    labeledAt?: Prisma.DateTimeNullableFilter<"Data"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Data"> | Date | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
    labeler?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    verifications?: Prisma.VerificationListRelationFilter;
};
export type DataOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    assignedLabel?: Prisma.SortOrderInput | Prisma.SortOrder;
    labeledBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    labeledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    post?: Prisma.PostOrderByWithRelationInput;
    labeler?: Prisma.UserOrderByWithRelationInput;
    verifications?: Prisma.VerificationOrderByRelationAggregateInput;
};
export type DataWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DataWhereInput | Prisma.DataWhereInput[];
    OR?: Prisma.DataWhereInput[];
    NOT?: Prisma.DataWhereInput | Prisma.DataWhereInput[];
    postId?: Prisma.StringFilter<"Data"> | string;
    value?: Prisma.IntFilter<"Data"> | number;
    imageUrl?: Prisma.StringFilter<"Data"> | string;
    status?: Prisma.EnumDataStatusFilter<"Data"> | $Enums.DataStatus;
    assignedLabel?: Prisma.StringNullableFilter<"Data"> | string | null;
    labeledBy?: Prisma.StringNullableFilter<"Data"> | string | null;
    labeledAt?: Prisma.DateTimeNullableFilter<"Data"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Data"> | Date | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
    labeler?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    verifications?: Prisma.VerificationListRelationFilter;
}, "id">;
export type DataOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    assignedLabel?: Prisma.SortOrderInput | Prisma.SortOrder;
    labeledBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    labeledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.DataCountOrderByAggregateInput;
    _avg?: Prisma.DataAvgOrderByAggregateInput;
    _max?: Prisma.DataMaxOrderByAggregateInput;
    _min?: Prisma.DataMinOrderByAggregateInput;
    _sum?: Prisma.DataSumOrderByAggregateInput;
};
export type DataScalarWhereWithAggregatesInput = {
    AND?: Prisma.DataScalarWhereWithAggregatesInput | Prisma.DataScalarWhereWithAggregatesInput[];
    OR?: Prisma.DataScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DataScalarWhereWithAggregatesInput | Prisma.DataScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Data"> | string;
    postId?: Prisma.StringWithAggregatesFilter<"Data"> | string;
    value?: Prisma.IntWithAggregatesFilter<"Data"> | number;
    imageUrl?: Prisma.StringWithAggregatesFilter<"Data"> | string;
    status?: Prisma.EnumDataStatusWithAggregatesFilter<"Data"> | $Enums.DataStatus;
    assignedLabel?: Prisma.StringNullableWithAggregatesFilter<"Data"> | string | null;
    labeledBy?: Prisma.StringNullableWithAggregatesFilter<"Data"> | string | null;
    labeledAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Data"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Data"> | Date | string;
};
export type DataCreateInput = {
    id?: string;
    value?: number;
    imageUrl: string;
    status?: $Enums.DataStatus;
    assignedLabel?: string | null;
    labeledAt?: Date | string | null;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutDataInput;
    labeler?: Prisma.UserCreateNestedOneWithoutLabeledImagesInput;
    verifications?: Prisma.VerificationCreateNestedManyWithoutDataInput;
};
export type DataUncheckedCreateInput = {
    id?: string;
    postId: string;
    value?: number;
    imageUrl: string;
    status?: $Enums.DataStatus;
    assignedLabel?: string | null;
    labeledBy?: string | null;
    labeledAt?: Date | string | null;
    createdAt?: Date | string;
    verifications?: Prisma.VerificationUncheckedCreateNestedManyWithoutDataInput;
};
export type DataUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDataStatusFieldUpdateOperationsInput | $Enums.DataStatus;
    assignedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutDataNestedInput;
    labeler?: Prisma.UserUpdateOneWithoutLabeledImagesNestedInput;
    verifications?: Prisma.VerificationUpdateManyWithoutDataNestedInput;
};
export type DataUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDataStatusFieldUpdateOperationsInput | $Enums.DataStatus;
    assignedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    verifications?: Prisma.VerificationUncheckedUpdateManyWithoutDataNestedInput;
};
export type DataCreateManyInput = {
    id?: string;
    postId: string;
    value?: number;
    imageUrl: string;
    status?: $Enums.DataStatus;
    assignedLabel?: string | null;
    labeledBy?: string | null;
    labeledAt?: Date | string | null;
    createdAt?: Date | string;
};
export type DataUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDataStatusFieldUpdateOperationsInput | $Enums.DataStatus;
    assignedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DataUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDataStatusFieldUpdateOperationsInput | $Enums.DataStatus;
    assignedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DataListRelationFilter = {
    every?: Prisma.DataWhereInput;
    some?: Prisma.DataWhereInput;
    none?: Prisma.DataWhereInput;
};
export type DataOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DataCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    assignedLabel?: Prisma.SortOrder;
    labeledBy?: Prisma.SortOrder;
    labeledAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DataAvgOrderByAggregateInput = {
    value?: Prisma.SortOrder;
};
export type DataMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    assignedLabel?: Prisma.SortOrder;
    labeledBy?: Prisma.SortOrder;
    labeledAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DataMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    assignedLabel?: Prisma.SortOrder;
    labeledBy?: Prisma.SortOrder;
    labeledAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DataSumOrderByAggregateInput = {
    value?: Prisma.SortOrder;
};
export type DataScalarRelationFilter = {
    is?: Prisma.DataWhereInput;
    isNot?: Prisma.DataWhereInput;
};
export type DataCreateNestedManyWithoutLabelerInput = {
    create?: Prisma.XOR<Prisma.DataCreateWithoutLabelerInput, Prisma.DataUncheckedCreateWithoutLabelerInput> | Prisma.DataCreateWithoutLabelerInput[] | Prisma.DataUncheckedCreateWithoutLabelerInput[];
    connectOrCreate?: Prisma.DataCreateOrConnectWithoutLabelerInput | Prisma.DataCreateOrConnectWithoutLabelerInput[];
    createMany?: Prisma.DataCreateManyLabelerInputEnvelope;
    connect?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
};
export type DataUncheckedCreateNestedManyWithoutLabelerInput = {
    create?: Prisma.XOR<Prisma.DataCreateWithoutLabelerInput, Prisma.DataUncheckedCreateWithoutLabelerInput> | Prisma.DataCreateWithoutLabelerInput[] | Prisma.DataUncheckedCreateWithoutLabelerInput[];
    connectOrCreate?: Prisma.DataCreateOrConnectWithoutLabelerInput | Prisma.DataCreateOrConnectWithoutLabelerInput[];
    createMany?: Prisma.DataCreateManyLabelerInputEnvelope;
    connect?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
};
export type DataUpdateManyWithoutLabelerNestedInput = {
    create?: Prisma.XOR<Prisma.DataCreateWithoutLabelerInput, Prisma.DataUncheckedCreateWithoutLabelerInput> | Prisma.DataCreateWithoutLabelerInput[] | Prisma.DataUncheckedCreateWithoutLabelerInput[];
    connectOrCreate?: Prisma.DataCreateOrConnectWithoutLabelerInput | Prisma.DataCreateOrConnectWithoutLabelerInput[];
    upsert?: Prisma.DataUpsertWithWhereUniqueWithoutLabelerInput | Prisma.DataUpsertWithWhereUniqueWithoutLabelerInput[];
    createMany?: Prisma.DataCreateManyLabelerInputEnvelope;
    set?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
    disconnect?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
    delete?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
    connect?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
    update?: Prisma.DataUpdateWithWhereUniqueWithoutLabelerInput | Prisma.DataUpdateWithWhereUniqueWithoutLabelerInput[];
    updateMany?: Prisma.DataUpdateManyWithWhereWithoutLabelerInput | Prisma.DataUpdateManyWithWhereWithoutLabelerInput[];
    deleteMany?: Prisma.DataScalarWhereInput | Prisma.DataScalarWhereInput[];
};
export type DataUncheckedUpdateManyWithoutLabelerNestedInput = {
    create?: Prisma.XOR<Prisma.DataCreateWithoutLabelerInput, Prisma.DataUncheckedCreateWithoutLabelerInput> | Prisma.DataCreateWithoutLabelerInput[] | Prisma.DataUncheckedCreateWithoutLabelerInput[];
    connectOrCreate?: Prisma.DataCreateOrConnectWithoutLabelerInput | Prisma.DataCreateOrConnectWithoutLabelerInput[];
    upsert?: Prisma.DataUpsertWithWhereUniqueWithoutLabelerInput | Prisma.DataUpsertWithWhereUniqueWithoutLabelerInput[];
    createMany?: Prisma.DataCreateManyLabelerInputEnvelope;
    set?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
    disconnect?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
    delete?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
    connect?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
    update?: Prisma.DataUpdateWithWhereUniqueWithoutLabelerInput | Prisma.DataUpdateWithWhereUniqueWithoutLabelerInput[];
    updateMany?: Prisma.DataUpdateManyWithWhereWithoutLabelerInput | Prisma.DataUpdateManyWithWhereWithoutLabelerInput[];
    deleteMany?: Prisma.DataScalarWhereInput | Prisma.DataScalarWhereInput[];
};
export type DataCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.DataCreateWithoutPostInput, Prisma.DataUncheckedCreateWithoutPostInput> | Prisma.DataCreateWithoutPostInput[] | Prisma.DataUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.DataCreateOrConnectWithoutPostInput | Prisma.DataCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.DataCreateManyPostInputEnvelope;
    connect?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
};
export type DataUncheckedCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.DataCreateWithoutPostInput, Prisma.DataUncheckedCreateWithoutPostInput> | Prisma.DataCreateWithoutPostInput[] | Prisma.DataUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.DataCreateOrConnectWithoutPostInput | Prisma.DataCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.DataCreateManyPostInputEnvelope;
    connect?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
};
export type DataUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.DataCreateWithoutPostInput, Prisma.DataUncheckedCreateWithoutPostInput> | Prisma.DataCreateWithoutPostInput[] | Prisma.DataUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.DataCreateOrConnectWithoutPostInput | Prisma.DataCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.DataUpsertWithWhereUniqueWithoutPostInput | Prisma.DataUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.DataCreateManyPostInputEnvelope;
    set?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
    disconnect?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
    delete?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
    connect?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
    update?: Prisma.DataUpdateWithWhereUniqueWithoutPostInput | Prisma.DataUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.DataUpdateManyWithWhereWithoutPostInput | Prisma.DataUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.DataScalarWhereInput | Prisma.DataScalarWhereInput[];
};
export type DataUncheckedUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.DataCreateWithoutPostInput, Prisma.DataUncheckedCreateWithoutPostInput> | Prisma.DataCreateWithoutPostInput[] | Prisma.DataUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.DataCreateOrConnectWithoutPostInput | Prisma.DataCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.DataUpsertWithWhereUniqueWithoutPostInput | Prisma.DataUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.DataCreateManyPostInputEnvelope;
    set?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
    disconnect?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
    delete?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
    connect?: Prisma.DataWhereUniqueInput | Prisma.DataWhereUniqueInput[];
    update?: Prisma.DataUpdateWithWhereUniqueWithoutPostInput | Prisma.DataUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.DataUpdateManyWithWhereWithoutPostInput | Prisma.DataUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.DataScalarWhereInput | Prisma.DataScalarWhereInput[];
};
export type EnumDataStatusFieldUpdateOperationsInput = {
    set?: $Enums.DataStatus;
};
export type DataCreateNestedOneWithoutVerificationsInput = {
    create?: Prisma.XOR<Prisma.DataCreateWithoutVerificationsInput, Prisma.DataUncheckedCreateWithoutVerificationsInput>;
    connectOrCreate?: Prisma.DataCreateOrConnectWithoutVerificationsInput;
    connect?: Prisma.DataWhereUniqueInput;
};
export type DataUpdateOneRequiredWithoutVerificationsNestedInput = {
    create?: Prisma.XOR<Prisma.DataCreateWithoutVerificationsInput, Prisma.DataUncheckedCreateWithoutVerificationsInput>;
    connectOrCreate?: Prisma.DataCreateOrConnectWithoutVerificationsInput;
    upsert?: Prisma.DataUpsertWithoutVerificationsInput;
    connect?: Prisma.DataWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DataUpdateToOneWithWhereWithoutVerificationsInput, Prisma.DataUpdateWithoutVerificationsInput>, Prisma.DataUncheckedUpdateWithoutVerificationsInput>;
};
export type DataCreateWithoutLabelerInput = {
    id?: string;
    value?: number;
    imageUrl: string;
    status?: $Enums.DataStatus;
    assignedLabel?: string | null;
    labeledAt?: Date | string | null;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutDataInput;
    verifications?: Prisma.VerificationCreateNestedManyWithoutDataInput;
};
export type DataUncheckedCreateWithoutLabelerInput = {
    id?: string;
    postId: string;
    value?: number;
    imageUrl: string;
    status?: $Enums.DataStatus;
    assignedLabel?: string | null;
    labeledAt?: Date | string | null;
    createdAt?: Date | string;
    verifications?: Prisma.VerificationUncheckedCreateNestedManyWithoutDataInput;
};
export type DataCreateOrConnectWithoutLabelerInput = {
    where: Prisma.DataWhereUniqueInput;
    create: Prisma.XOR<Prisma.DataCreateWithoutLabelerInput, Prisma.DataUncheckedCreateWithoutLabelerInput>;
};
export type DataCreateManyLabelerInputEnvelope = {
    data: Prisma.DataCreateManyLabelerInput | Prisma.DataCreateManyLabelerInput[];
    skipDuplicates?: boolean;
};
export type DataUpsertWithWhereUniqueWithoutLabelerInput = {
    where: Prisma.DataWhereUniqueInput;
    update: Prisma.XOR<Prisma.DataUpdateWithoutLabelerInput, Prisma.DataUncheckedUpdateWithoutLabelerInput>;
    create: Prisma.XOR<Prisma.DataCreateWithoutLabelerInput, Prisma.DataUncheckedCreateWithoutLabelerInput>;
};
export type DataUpdateWithWhereUniqueWithoutLabelerInput = {
    where: Prisma.DataWhereUniqueInput;
    data: Prisma.XOR<Prisma.DataUpdateWithoutLabelerInput, Prisma.DataUncheckedUpdateWithoutLabelerInput>;
};
export type DataUpdateManyWithWhereWithoutLabelerInput = {
    where: Prisma.DataScalarWhereInput;
    data: Prisma.XOR<Prisma.DataUpdateManyMutationInput, Prisma.DataUncheckedUpdateManyWithoutLabelerInput>;
};
export type DataScalarWhereInput = {
    AND?: Prisma.DataScalarWhereInput | Prisma.DataScalarWhereInput[];
    OR?: Prisma.DataScalarWhereInput[];
    NOT?: Prisma.DataScalarWhereInput | Prisma.DataScalarWhereInput[];
    id?: Prisma.StringFilter<"Data"> | string;
    postId?: Prisma.StringFilter<"Data"> | string;
    value?: Prisma.IntFilter<"Data"> | number;
    imageUrl?: Prisma.StringFilter<"Data"> | string;
    status?: Prisma.EnumDataStatusFilter<"Data"> | $Enums.DataStatus;
    assignedLabel?: Prisma.StringNullableFilter<"Data"> | string | null;
    labeledBy?: Prisma.StringNullableFilter<"Data"> | string | null;
    labeledAt?: Prisma.DateTimeNullableFilter<"Data"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Data"> | Date | string;
};
export type DataCreateWithoutPostInput = {
    id?: string;
    value?: number;
    imageUrl: string;
    status?: $Enums.DataStatus;
    assignedLabel?: string | null;
    labeledAt?: Date | string | null;
    createdAt?: Date | string;
    labeler?: Prisma.UserCreateNestedOneWithoutLabeledImagesInput;
    verifications?: Prisma.VerificationCreateNestedManyWithoutDataInput;
};
export type DataUncheckedCreateWithoutPostInput = {
    id?: string;
    value?: number;
    imageUrl: string;
    status?: $Enums.DataStatus;
    assignedLabel?: string | null;
    labeledBy?: string | null;
    labeledAt?: Date | string | null;
    createdAt?: Date | string;
    verifications?: Prisma.VerificationUncheckedCreateNestedManyWithoutDataInput;
};
export type DataCreateOrConnectWithoutPostInput = {
    where: Prisma.DataWhereUniqueInput;
    create: Prisma.XOR<Prisma.DataCreateWithoutPostInput, Prisma.DataUncheckedCreateWithoutPostInput>;
};
export type DataCreateManyPostInputEnvelope = {
    data: Prisma.DataCreateManyPostInput | Prisma.DataCreateManyPostInput[];
    skipDuplicates?: boolean;
};
export type DataUpsertWithWhereUniqueWithoutPostInput = {
    where: Prisma.DataWhereUniqueInput;
    update: Prisma.XOR<Prisma.DataUpdateWithoutPostInput, Prisma.DataUncheckedUpdateWithoutPostInput>;
    create: Prisma.XOR<Prisma.DataCreateWithoutPostInput, Prisma.DataUncheckedCreateWithoutPostInput>;
};
export type DataUpdateWithWhereUniqueWithoutPostInput = {
    where: Prisma.DataWhereUniqueInput;
    data: Prisma.XOR<Prisma.DataUpdateWithoutPostInput, Prisma.DataUncheckedUpdateWithoutPostInput>;
};
export type DataUpdateManyWithWhereWithoutPostInput = {
    where: Prisma.DataScalarWhereInput;
    data: Prisma.XOR<Prisma.DataUpdateManyMutationInput, Prisma.DataUncheckedUpdateManyWithoutPostInput>;
};
export type DataCreateWithoutVerificationsInput = {
    id?: string;
    value?: number;
    imageUrl: string;
    status?: $Enums.DataStatus;
    assignedLabel?: string | null;
    labeledAt?: Date | string | null;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutDataInput;
    labeler?: Prisma.UserCreateNestedOneWithoutLabeledImagesInput;
};
export type DataUncheckedCreateWithoutVerificationsInput = {
    id?: string;
    postId: string;
    value?: number;
    imageUrl: string;
    status?: $Enums.DataStatus;
    assignedLabel?: string | null;
    labeledBy?: string | null;
    labeledAt?: Date | string | null;
    createdAt?: Date | string;
};
export type DataCreateOrConnectWithoutVerificationsInput = {
    where: Prisma.DataWhereUniqueInput;
    create: Prisma.XOR<Prisma.DataCreateWithoutVerificationsInput, Prisma.DataUncheckedCreateWithoutVerificationsInput>;
};
export type DataUpsertWithoutVerificationsInput = {
    update: Prisma.XOR<Prisma.DataUpdateWithoutVerificationsInput, Prisma.DataUncheckedUpdateWithoutVerificationsInput>;
    create: Prisma.XOR<Prisma.DataCreateWithoutVerificationsInput, Prisma.DataUncheckedCreateWithoutVerificationsInput>;
    where?: Prisma.DataWhereInput;
};
export type DataUpdateToOneWithWhereWithoutVerificationsInput = {
    where?: Prisma.DataWhereInput;
    data: Prisma.XOR<Prisma.DataUpdateWithoutVerificationsInput, Prisma.DataUncheckedUpdateWithoutVerificationsInput>;
};
export type DataUpdateWithoutVerificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDataStatusFieldUpdateOperationsInput | $Enums.DataStatus;
    assignedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutDataNestedInput;
    labeler?: Prisma.UserUpdateOneWithoutLabeledImagesNestedInput;
};
export type DataUncheckedUpdateWithoutVerificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDataStatusFieldUpdateOperationsInput | $Enums.DataStatus;
    assignedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DataCreateManyLabelerInput = {
    id?: string;
    postId: string;
    value?: number;
    imageUrl: string;
    status?: $Enums.DataStatus;
    assignedLabel?: string | null;
    labeledAt?: Date | string | null;
    createdAt?: Date | string;
};
export type DataUpdateWithoutLabelerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDataStatusFieldUpdateOperationsInput | $Enums.DataStatus;
    assignedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutDataNestedInput;
    verifications?: Prisma.VerificationUpdateManyWithoutDataNestedInput;
};
export type DataUncheckedUpdateWithoutLabelerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDataStatusFieldUpdateOperationsInput | $Enums.DataStatus;
    assignedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    verifications?: Prisma.VerificationUncheckedUpdateManyWithoutDataNestedInput;
};
export type DataUncheckedUpdateManyWithoutLabelerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDataStatusFieldUpdateOperationsInput | $Enums.DataStatus;
    assignedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DataCreateManyPostInput = {
    id?: string;
    value?: number;
    imageUrl: string;
    status?: $Enums.DataStatus;
    assignedLabel?: string | null;
    labeledBy?: string | null;
    labeledAt?: Date | string | null;
    createdAt?: Date | string;
};
export type DataUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDataStatusFieldUpdateOperationsInput | $Enums.DataStatus;
    assignedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    labeler?: Prisma.UserUpdateOneWithoutLabeledImagesNestedInput;
    verifications?: Prisma.VerificationUpdateManyWithoutDataNestedInput;
};
export type DataUncheckedUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDataStatusFieldUpdateOperationsInput | $Enums.DataStatus;
    assignedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    verifications?: Prisma.VerificationUncheckedUpdateManyWithoutDataNestedInput;
};
export type DataUncheckedUpdateManyWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDataStatusFieldUpdateOperationsInput | $Enums.DataStatus;
    assignedLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    labeledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type DataCountOutputType
 */
export type DataCountOutputType = {
    verifications: number;
};
export type DataCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    verifications?: boolean | DataCountOutputTypeCountVerificationsArgs;
};
/**
 * DataCountOutputType without action
 */
export type DataCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataCountOutputType
     */
    select?: Prisma.DataCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * DataCountOutputType without action
 */
export type DataCountOutputTypeCountVerificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VerificationWhereInput;
};
export type DataSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    postId?: boolean;
    value?: boolean;
    imageUrl?: boolean;
    status?: boolean;
    assignedLabel?: boolean;
    labeledBy?: boolean;
    labeledAt?: boolean;
    createdAt?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    labeler?: boolean | Prisma.Data$labelerArgs<ExtArgs>;
    verifications?: boolean | Prisma.Data$verificationsArgs<ExtArgs>;
    _count?: boolean | Prisma.DataCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["data"]>;
export type DataSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    postId?: boolean;
    value?: boolean;
    imageUrl?: boolean;
    status?: boolean;
    assignedLabel?: boolean;
    labeledBy?: boolean;
    labeledAt?: boolean;
    createdAt?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    labeler?: boolean | Prisma.Data$labelerArgs<ExtArgs>;
}, ExtArgs["result"]["data"]>;
export type DataSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    postId?: boolean;
    value?: boolean;
    imageUrl?: boolean;
    status?: boolean;
    assignedLabel?: boolean;
    labeledBy?: boolean;
    labeledAt?: boolean;
    createdAt?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    labeler?: boolean | Prisma.Data$labelerArgs<ExtArgs>;
}, ExtArgs["result"]["data"]>;
export type DataSelectScalar = {
    id?: boolean;
    postId?: boolean;
    value?: boolean;
    imageUrl?: boolean;
    status?: boolean;
    assignedLabel?: boolean;
    labeledBy?: boolean;
    labeledAt?: boolean;
    createdAt?: boolean;
};
export type DataOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "postId" | "value" | "imageUrl" | "status" | "assignedLabel" | "labeledBy" | "labeledAt" | "createdAt", ExtArgs["result"]["data"]>;
export type DataInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    labeler?: boolean | Prisma.Data$labelerArgs<ExtArgs>;
    verifications?: boolean | Prisma.Data$verificationsArgs<ExtArgs>;
    _count?: boolean | Prisma.DataCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DataIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    labeler?: boolean | Prisma.Data$labelerArgs<ExtArgs>;
};
export type DataIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    labeler?: boolean | Prisma.Data$labelerArgs<ExtArgs>;
};
export type $DataPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Data";
    objects: {
        post: Prisma.$PostPayload<ExtArgs>;
        labeler: Prisma.$UserPayload<ExtArgs> | null;
        verifications: Prisma.$VerificationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        postId: string;
        value: number;
        imageUrl: string;
        status: $Enums.DataStatus;
        assignedLabel: string | null;
        labeledBy: string | null;
        labeledAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["data"]>;
    composites: {};
};
export type DataGetPayload<S extends boolean | null | undefined | DataDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DataPayload, S>;
export type DataCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DataCountAggregateInputType | true;
};
export interface DataDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Data'];
        meta: {
            name: 'Data';
        };
    };
    /**
     * Find zero or one Data that matches the filter.
     * @param {DataFindUniqueArgs} args - Arguments to find a Data
     * @example
     * // Get one Data
     * const data = await prisma.data.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DataFindUniqueArgs>(args: Prisma.SelectSubset<T, DataFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DataClient<runtime.Types.Result.GetResult<Prisma.$DataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Data that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DataFindUniqueOrThrowArgs} args - Arguments to find a Data
     * @example
     * // Get one Data
     * const data = await prisma.data.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DataFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DataFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DataClient<runtime.Types.Result.GetResult<Prisma.$DataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Data that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataFindFirstArgs} args - Arguments to find a Data
     * @example
     * // Get one Data
     * const data = await prisma.data.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DataFindFirstArgs>(args?: Prisma.SelectSubset<T, DataFindFirstArgs<ExtArgs>>): Prisma.Prisma__DataClient<runtime.Types.Result.GetResult<Prisma.$DataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Data that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataFindFirstOrThrowArgs} args - Arguments to find a Data
     * @example
     * // Get one Data
     * const data = await prisma.data.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DataFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DataFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DataClient<runtime.Types.Result.GetResult<Prisma.$DataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Data that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Data
     * const data = await prisma.data.findMany()
     *
     * // Get first 10 Data
     * const data = await prisma.data.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const dataWithIdOnly = await prisma.data.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DataFindManyArgs>(args?: Prisma.SelectSubset<T, DataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Data.
     * @param {DataCreateArgs} args - Arguments to create a Data.
     * @example
     * // Create one Data
     * const Data = await prisma.data.create({
     *   data: {
     *     // ... data to create a Data
     *   }
     * })
     *
     */
    create<T extends DataCreateArgs>(args: Prisma.SelectSubset<T, DataCreateArgs<ExtArgs>>): Prisma.Prisma__DataClient<runtime.Types.Result.GetResult<Prisma.$DataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Data.
     * @param {DataCreateManyArgs} args - Arguments to create many Data.
     * @example
     * // Create many Data
     * const data = await prisma.data.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DataCreateManyArgs>(args?: Prisma.SelectSubset<T, DataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Data and returns the data saved in the database.
     * @param {DataCreateManyAndReturnArgs} args - Arguments to create many Data.
     * @example
     * // Create many Data
     * const data = await prisma.data.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Data and only return the `id`
     * const dataWithIdOnly = await prisma.data.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DataCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Data.
     * @param {DataDeleteArgs} args - Arguments to delete one Data.
     * @example
     * // Delete one Data
     * const Data = await prisma.data.delete({
     *   where: {
     *     // ... filter to delete one Data
     *   }
     * })
     *
     */
    delete<T extends DataDeleteArgs>(args: Prisma.SelectSubset<T, DataDeleteArgs<ExtArgs>>): Prisma.Prisma__DataClient<runtime.Types.Result.GetResult<Prisma.$DataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Data.
     * @param {DataUpdateArgs} args - Arguments to update one Data.
     * @example
     * // Update one Data
     * const data = await prisma.data.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DataUpdateArgs>(args: Prisma.SelectSubset<T, DataUpdateArgs<ExtArgs>>): Prisma.Prisma__DataClient<runtime.Types.Result.GetResult<Prisma.$DataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Data.
     * @param {DataDeleteManyArgs} args - Arguments to filter Data to delete.
     * @example
     * // Delete a few Data
     * const { count } = await prisma.data.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DataDeleteManyArgs>(args?: Prisma.SelectSubset<T, DataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Data
     * const data = await prisma.data.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DataUpdateManyArgs>(args: Prisma.SelectSubset<T, DataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Data and returns the data updated in the database.
     * @param {DataUpdateManyAndReturnArgs} args - Arguments to update many Data.
     * @example
     * // Update many Data
     * const data = await prisma.data.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Data and only return the `id`
     * const dataWithIdOnly = await prisma.data.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends DataUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Data.
     * @param {DataUpsertArgs} args - Arguments to update or create a Data.
     * @example
     * // Update or create a Data
     * const data = await prisma.data.upsert({
     *   create: {
     *     // ... data to create a Data
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Data we want to update
     *   }
     * })
     */
    upsert<T extends DataUpsertArgs>(args: Prisma.SelectSubset<T, DataUpsertArgs<ExtArgs>>): Prisma.Prisma__DataClient<runtime.Types.Result.GetResult<Prisma.$DataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataCountArgs} args - Arguments to filter Data to count.
     * @example
     * // Count the number of Data
     * const count = await prisma.data.count({
     *   where: {
     *     // ... the filter for the Data we want to count
     *   }
     * })
    **/
    count<T extends DataCountArgs>(args?: Prisma.Subset<T, DataCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DataCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DataAggregateArgs>(args: Prisma.Subset<T, DataAggregateArgs>): Prisma.PrismaPromise<GetDataAggregateType<T>>;
    /**
     * Group by Data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends DataGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DataGroupByArgs['orderBy'];
    } : {
        orderBy?: DataGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Data model
     */
    readonly fields: DataFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Data.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DataClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    post<T extends Prisma.PostDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PostDefaultArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    labeler<T extends Prisma.Data$labelerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Data$labelerArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    verifications<T extends Prisma.Data$verificationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Data$verificationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Data model
 */
export interface DataFieldRefs {
    readonly id: Prisma.FieldRef<"Data", 'String'>;
    readonly postId: Prisma.FieldRef<"Data", 'String'>;
    readonly value: Prisma.FieldRef<"Data", 'Int'>;
    readonly imageUrl: Prisma.FieldRef<"Data", 'String'>;
    readonly status: Prisma.FieldRef<"Data", 'DataStatus'>;
    readonly assignedLabel: Prisma.FieldRef<"Data", 'String'>;
    readonly labeledBy: Prisma.FieldRef<"Data", 'String'>;
    readonly labeledAt: Prisma.FieldRef<"Data", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Data", 'DateTime'>;
}
/**
 * Data findUnique
 */
export type DataFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Data
     */
    select?: Prisma.DataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Data
     */
    omit?: Prisma.DataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DataInclude<ExtArgs> | null;
    /**
     * Filter, which Data to fetch.
     */
    where: Prisma.DataWhereUniqueInput;
};
/**
 * Data findUniqueOrThrow
 */
export type DataFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Data
     */
    select?: Prisma.DataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Data
     */
    omit?: Prisma.DataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DataInclude<ExtArgs> | null;
    /**
     * Filter, which Data to fetch.
     */
    where: Prisma.DataWhereUniqueInput;
};
/**
 * Data findFirst
 */
export type DataFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Data
     */
    select?: Prisma.DataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Data
     */
    omit?: Prisma.DataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DataInclude<ExtArgs> | null;
    /**
     * Filter, which Data to fetch.
     */
    where?: Prisma.DataWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Data to fetch.
     */
    orderBy?: Prisma.DataOrderByWithRelationInput | Prisma.DataOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Data.
     */
    cursor?: Prisma.DataWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Data from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Data.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Data.
     */
    distinct?: Prisma.DataScalarFieldEnum | Prisma.DataScalarFieldEnum[];
};
/**
 * Data findFirstOrThrow
 */
export type DataFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Data
     */
    select?: Prisma.DataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Data
     */
    omit?: Prisma.DataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DataInclude<ExtArgs> | null;
    /**
     * Filter, which Data to fetch.
     */
    where?: Prisma.DataWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Data to fetch.
     */
    orderBy?: Prisma.DataOrderByWithRelationInput | Prisma.DataOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Data.
     */
    cursor?: Prisma.DataWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Data from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Data.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Data.
     */
    distinct?: Prisma.DataScalarFieldEnum | Prisma.DataScalarFieldEnum[];
};
/**
 * Data findMany
 */
export type DataFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Data
     */
    select?: Prisma.DataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Data
     */
    omit?: Prisma.DataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DataInclude<ExtArgs> | null;
    /**
     * Filter, which Data to fetch.
     */
    where?: Prisma.DataWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Data to fetch.
     */
    orderBy?: Prisma.DataOrderByWithRelationInput | Prisma.DataOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Data.
     */
    cursor?: Prisma.DataWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Data from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Data.
     */
    skip?: number;
    distinct?: Prisma.DataScalarFieldEnum | Prisma.DataScalarFieldEnum[];
};
/**
 * Data create
 */
export type DataCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Data
     */
    select?: Prisma.DataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Data
     */
    omit?: Prisma.DataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DataInclude<ExtArgs> | null;
    /**
     * The data needed to create a Data.
     */
    data: Prisma.XOR<Prisma.DataCreateInput, Prisma.DataUncheckedCreateInput>;
};
/**
 * Data createMany
 */
export type DataCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Data.
     */
    data: Prisma.DataCreateManyInput | Prisma.DataCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Data createManyAndReturn
 */
export type DataCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Data
     */
    select?: Prisma.DataSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Data
     */
    omit?: Prisma.DataOmit<ExtArgs> | null;
    /**
     * The data used to create many Data.
     */
    data: Prisma.DataCreateManyInput | Prisma.DataCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DataIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Data update
 */
export type DataUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Data
     */
    select?: Prisma.DataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Data
     */
    omit?: Prisma.DataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DataInclude<ExtArgs> | null;
    /**
     * The data needed to update a Data.
     */
    data: Prisma.XOR<Prisma.DataUpdateInput, Prisma.DataUncheckedUpdateInput>;
    /**
     * Choose, which Data to update.
     */
    where: Prisma.DataWhereUniqueInput;
};
/**
 * Data updateMany
 */
export type DataUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Data.
     */
    data: Prisma.XOR<Prisma.DataUpdateManyMutationInput, Prisma.DataUncheckedUpdateManyInput>;
    /**
     * Filter which Data to update
     */
    where?: Prisma.DataWhereInput;
    /**
     * Limit how many Data to update.
     */
    limit?: number;
};
/**
 * Data updateManyAndReturn
 */
export type DataUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Data
     */
    select?: Prisma.DataSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Data
     */
    omit?: Prisma.DataOmit<ExtArgs> | null;
    /**
     * The data used to update Data.
     */
    data: Prisma.XOR<Prisma.DataUpdateManyMutationInput, Prisma.DataUncheckedUpdateManyInput>;
    /**
     * Filter which Data to update
     */
    where?: Prisma.DataWhereInput;
    /**
     * Limit how many Data to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DataIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Data upsert
 */
export type DataUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Data
     */
    select?: Prisma.DataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Data
     */
    omit?: Prisma.DataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DataInclude<ExtArgs> | null;
    /**
     * The filter to search for the Data to update in case it exists.
     */
    where: Prisma.DataWhereUniqueInput;
    /**
     * In case the Data found by the `where` argument doesn't exist, create a new Data with this data.
     */
    create: Prisma.XOR<Prisma.DataCreateInput, Prisma.DataUncheckedCreateInput>;
    /**
     * In case the Data was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DataUpdateInput, Prisma.DataUncheckedUpdateInput>;
};
/**
 * Data delete
 */
export type DataDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Data
     */
    select?: Prisma.DataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Data
     */
    omit?: Prisma.DataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DataInclude<ExtArgs> | null;
    /**
     * Filter which Data to delete.
     */
    where: Prisma.DataWhereUniqueInput;
};
/**
 * Data deleteMany
 */
export type DataDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Data to delete
     */
    where?: Prisma.DataWhereInput;
    /**
     * Limit how many Data to delete.
     */
    limit?: number;
};
/**
 * Data.labeler
 */
export type Data$labelerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * Data.verifications
 */
export type Data$verificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: Prisma.VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: Prisma.VerificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VerificationInclude<ExtArgs> | null;
    where?: Prisma.VerificationWhereInput;
    orderBy?: Prisma.VerificationOrderByWithRelationInput | Prisma.VerificationOrderByWithRelationInput[];
    cursor?: Prisma.VerificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VerificationScalarFieldEnum | Prisma.VerificationScalarFieldEnum[];
};
/**
 * Data without action
 */
export type DataDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Data
     */
    select?: Prisma.DataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Data
     */
    omit?: Prisma.DataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DataInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Data.d.ts.map