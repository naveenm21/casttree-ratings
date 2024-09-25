"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongodb_1 = require("mongodb");
let RatingsService = class RatingsService {
    constructor(ratingModel, aggregatedratingModel) {
        this.ratingModel = ratingModel;
        this.aggregatedratingModel = aggregatedratingModel;
    }
    async createRating(body) {
        try {
            const isNotFirst = await this.ratingModel.findOne({
                sourceId: body.sourceId
            });
            const newRating = new this.ratingModel(body);
            const insertedRating = await newRating.save();
            if (isNotFirst == null) {
                const aggregatedBody = {
                    sourceId: body.sourceId,
                    sourceType: body.sourceType,
                    averageOverallRating: body.overAllRating,
                    scale: body.scale,
                    totalReviewNumber: 1
                };
                const newAggregatedRating = new this.aggregatedratingModel(aggregatedBody);
                return newAggregatedRating.save();
            }
            else {
                const oldAggregated = await this.aggregatedratingModel.findOne({
                    sourceId: body.sourceId
                });
                console.log(oldAggregated);
                const oldAverage = oldAggregated.averageOverallRating;
                const oldCount = oldAggregated.totalReviewNumber;
                const newAverage = (oldAverage + body.overAllRating);
                return this.aggregatedratingModel.findOneAndUpdate({ sourceId: body.sourceId }, { averageOverallRating: newAverage, totalReviewNumber: (oldCount + 1) });
            }
        }
        catch (err) {
            throw err;
        }
    }
    async getReviewSummary(sourceType, sourceId, accessToken) {
        try {
            let allReviews = await this.ratingModel.find({
                sourceId: sourceId, sourceType: sourceType
            }).sort({ _id: -1 }).limit(10)
                .lean();
            let aggregated = await this.aggregatedratingModel.findOne({
                sourceId: sourceId, sourceType: sourceType
            }).lean();
            const count = await this.ratingModel.countDocuments({
                sourceId: sourceId, sourceType: sourceType
            });
            let final_response = {
                "aggregated": aggregated,
                "reviews": allReviews,
            };
            return { data: final_response, count: count };
        }
        catch (err) {
            throw err;
        }
    }
    async getAllReviews(sourceType, sourceId, skip, limit, accessToken) {
        try {
            const allReviews = await this.ratingModel.find({
                sourceId: sourceId, sourceType: sourceType
            }).sort({ _id: -1 }).skip(skip)
                .limit(limit).lean();
            const reviewerUserIds = allReviews.map((e) => e.reviewedBy);
            const count = await this.ratingModel.countDocuments({
                sourceId: sourceId, sourceType: sourceType
            });
            return { data: allReviews, count: count };
        }
        catch (err) {
            throw err;
        }
    }
    async getRatingsAggregateList(body) {
        try {
            let aggregation_pipeline = [];
            let filter = {};
            if (body.sourceIds) {
                let sourceIds = body.sourceIds.map((e) => new mongodb_1.ObjectId(e));
                filter = { sourceId: { $in: sourceIds } };
            }
            aggregation_pipeline.push({
                $match: filter,
            });
            aggregation_pipeline.push({
                $project: {
                    sourceId: "$sourceId",
                    totalReviews: "$totalReviewNumber",
                    averageReview: "$averageOverallRating"
                },
            });
            let countPipe = [...aggregation_pipeline];
            aggregation_pipeline.push({
                $sort: {
                    _id: -1,
                },
            });
            countPipe.push({
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                },
            });
            let ratingData = await this.aggregatedratingModel.aggregate(aggregation_pipeline);
            let total_count = await this.aggregatedratingModel.aggregate(countPipe);
            let count;
            if (total_count.length) {
                count = total_count[0].count;
            }
            console.log(ratingData);
            console.log(count);
            return { ratingData, count };
        }
        catch (err) {
            throw err;
        }
    }
};
exports.RatingsService = RatingsService;
exports.RatingsService = RatingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Ratingsv1")),
    __param(1, (0, mongoose_1.InjectModel)("Ratingsaggregated")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], RatingsService);
//# sourceMappingURL=ratings.service.js.map