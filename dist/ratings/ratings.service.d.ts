import { Ratingsaggregated, Ratingsv1 } from './schema/ratings-schema';
import { Model } from 'mongoose';
import { createRatingsDto } from './dto/createRating.dto';
export declare class RatingsService {
    private ratingModel;
    private aggregatedratingModel;
    constructor(ratingModel: Model<Ratingsv1>, aggregatedratingModel: Model<Ratingsaggregated>);
    createRating(body: createRatingsDto): Promise<import("mongoose").Document<unknown, {}, Ratingsaggregated> & Ratingsaggregated & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getReviewSummary(sourceType: string, sourceId: string, accessToken: string): Promise<{
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
