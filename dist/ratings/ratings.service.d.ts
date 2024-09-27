import { ratingsAggregated, ratings } from './schema/ratings-schema';
import { Model } from 'mongoose';
import { createRatingsDto } from './dto/createRating.dto';
export declare class RatingsService {
    private ratingModel;
    private aggregatedModel;
    constructor(ratingModel: Model<ratings>, aggregatedModel: Model<ratingsAggregated>);
    createRating(body: createRatingsDto): Promise<(import("mongoose").Document<unknown, {}, ratingsAggregated> & ratingsAggregated & {
        _id: import("mongoose").Types.ObjectId;
    }) | {
        message: string;
    }>;
    getReviewSummary(sourceType: string, sourceId: string, accessToken?: string): Promise<{
        data: {
            [key: string]: string;
        };
        count: number;
    }>;
    getAllReviews(sourceType: string, sourceId: string, skip: number, limit: number, accessToken: any): Promise<{
        data: any;
        count: number;
    }>;
    getRatingsAggregateList(body: any): Promise<{
        ratingData: any[];
        count: any;
    }>;
}
