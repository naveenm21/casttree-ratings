import { createRatingsDto } from './dto/createRating.dto';
import { RatingsService } from './ratings.service';
export declare class RatingsController {
    private ratingsService;
    constructor(ratingsService: RatingsService);
    createRating(createratingdto: createRatingsDto): Promise<(import("mongoose").Document<unknown, {}, import("./schema/ratings-schema").ratingsAggregated> & import("./schema/ratings-schema").ratingsAggregated & {
        _id: import("mongoose").Types.ObjectId;
    }) | {
        message: string;
    }>;
    getUserAggregated(sourceType: string, sourceId: string, req: any): Promise<{
        data: {
            [key: string]: string;
        };
        count: number;
    }>;
    getAllReviews(sourceType: string, sourceId: string, skip: number, limit: number, req: any): Promise<{
        data: any;
        count: number;
    }>;
    getRatingsAggregateList(body: any): Promise<any>;
    getRatingSummary(body: any): Promise<any>;
}
