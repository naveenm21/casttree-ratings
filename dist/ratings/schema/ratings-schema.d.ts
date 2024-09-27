import mongoose from "mongoose";
export interface ratings {
    sourceId: string;
    userId: string;
    sourceType: string;
    overAllRating: number;
    scale: number;
    overAllDescription: string;
    status: string;
    reviewedBy: string;
    createdAt: any;
    updatedAt: any;
    createdBy: string;
    updatedBy: string;
}
export interface ratingsAggregated {
    sourceId: string;
    sourceType: string;
    finalAverageRating: Number;
    averageOverallRating: Number;
    scale: Number;
    totalReviewNumber: Number;
}
export declare const ratingSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    [x: string]: unknown;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    [x: string]: unknown;
}>> & mongoose.FlatRecord<{
    [x: string]: unknown;
}> & Required<{
    _id: unknown;
}>>;
export declare const ratingAggregatedSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    [x: string]: unknown;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    [x: string]: unknown;
}>> & mongoose.FlatRecord<{
    [x: string]: unknown;
}> & Required<{
    _id: unknown;
}>>;
