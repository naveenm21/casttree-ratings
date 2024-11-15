import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ratingsAggregated, ratings } from './schema/ratings-schema';
import { Model } from 'mongoose';
import { createRatingsDto } from './dto/createRating.dto';
import { ObjectId } from 'mongodb';
import { HelperService } from 'src/helper/helper.service';
import { UserToken } from 'src/auth/dto/usertoken.dto';
import { EratingStatus, ESratingStatus } from './enum/rating_status.enum';




@Injectable()
export class RatingsService {
    constructor(
        @InjectModel("ratings") private ratingModel: Model<ratings>,
        @InjectModel("ratingsAggregated") private aggregatedModel: Model<ratingsAggregated>,
        private helperService: HelperService
    ) { }

    async createRating(body: createRatingsDto, token: UserToken) {
        try {
            const oldRating = await this.ratingModel.findOne({
                sourceType: body.sourceType, sourceId: body.sourceId
            });
            body.reviewedBy = token.id;
            body.status = EratingStatus.active;
            const newRating = new this.ratingModel(body)
            const insertedRating = await newRating.save();
            if (oldRating == null) {
                const aggregatedBody = {
                    sourceId: body.sourceId,
                    sourceType: body.sourceType,
                    averageOverallRating: body.overAllRating,
                    finalAverageRating: body.overAllRating,
                    scale: body.scale,
                    totalReviewNumber: 1
                }
                const newAggregatedRating = new this.aggregatedModel(aggregatedBody);
                newAggregatedRating.save();
                return { message: "success" };
            }
            else {
                const oldAggregated = await this.aggregatedModel.findOne({
                    sourceId: body.sourceId
                });
                const oldAverage = oldAggregated.averageOverallRating;
                const oldCount = oldAggregated.totalReviewNumber;
                const newAverage = oldAverage + body.overAllRating;
                const newFinalAverage = (newAverage / (oldCount + 1)).toFixed(1);
                const updateAggregated = await this.aggregatedModel.findOneAndUpdate({ sourceId: body.sourceId }, { averageOverallRating: newAverage, totalReviewNumber: (oldCount + 1), finalAverageRating: newFinalAverage });
                return { message: "success" };
            }
        } catch (err) {
            throw err;
        }

    }


    async getReviewSummary(sourceType: string, sourceId: string) {
   
        try {
            let allReviews = await this.ratingModel.find({
                sourceId: sourceId, sourceType: sourceType
            }).sort({ _id: -1 }).limit(10)
                .lean();
            let aggregated = await this.aggregatedModel.findOne({
                sourceId: sourceId, sourceType: sourceType
            }).lean();
            const count = await this.ratingModel.countDocuments({
                sourceId: sourceId, sourceType: sourceType
            });
       
            if (aggregated !=null) {
                const profileInfo = await this.helperService.getProfileByIdTl(
                    [aggregated?.sourceId],
                 
                    null
                );

                aggregated["profileData"] = profileInfo[0];
                const reviewerUserIds = allReviews.map((e) => e.reviewedBy);
                const allProfileInfo = await this.helperService.getProfileByIdTl(
                    reviewerUserIds,
                 
                    null
                );

                var userProfileInfo = allProfileInfo.reduce((a, c) => {
                    a[c.userId] = c;
                    return a;
                }, {});

                for (let i = 0; i < allReviews.length; i++) {
                    allReviews[i]["profileData"] = userProfileInfo[allReviews[i]["reviewedBy"]]
                }
            }
            let final_response = {
                "aggregated": aggregated,
                "reviews": allReviews,
            };


            return { data: final_response, count: count };
        } catch (err) {
            throw err;
        }

    }

    async getAllReviews(sourceType: string, sourceId: string, skip: number, limit: number) {
        try {
            const allReviews = await this.ratingModel.find({
                sourceId: sourceId, sourceType: sourceType
            }).sort({ _id: -1 }).skip(skip)
                .limit(limit).lean();
            const count = await this.ratingModel.countDocuments({
                sourceId: sourceId, sourceType: sourceType
            });
      
            if (allReviews.length != 0 ) {
                const reviewerUserIds = allReviews.map((e) => e.reviewedBy);

                const allProfileInfo = await this.helperService.getProfileByIdTl(
                    reviewerUserIds,
                 
                    null
                );
                var userProfileInfo = allProfileInfo.reduce((a, c) => {
                    a[c.userId] = c;
                    return a;
                }, {});

                for (let i = 0; i < allReviews.length; i++) {
                    allReviews[i]["profileData"] = userProfileInfo[allReviews[i]["reviewedBy"]]
                }
            }
            return { data: allReviews, count: count };
        } catch (err) {
            throw err;
        }

    }


    async getRatingsAggregateList(body) {
        try {
            let aggregation_pipeline = [];
            let filter ;
            if (body.sourceIds) {
                let sourceIds = body.sourceIds.map((e) => e);
                filter = { sourceId: { $in: sourceIds } };
            }
            if (body.sourceType) {
                filter.sourceType = body.sourceType;
            }
            aggregation_pipeline.push({
                $match: filter,
            });
            aggregation_pipeline.push({
                $project: {
                    sourceId: "$sourceId",
                    totalReviews: "$totalReviewNumber",
                    averageReview: "$finalAverageRating"
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

            let ratingData = await this.aggregatedModel.aggregate(aggregation_pipeline);
            let total_count = await this.aggregatedModel.aggregate(countPipe);

            let count;
            if (total_count.length) {
                count = total_count[0].count;
            }

            return { ratingData, count };
        } catch (err) {
            throw err;
        }
    }

    async getRating(transactionId, transactionType, token: UserToken) {
        const ratingData = await this.ratingModel.findOne({
            transactionId: transactionId, transactionType: transactionType, reviewedBy: token.id
        });
        return ratingData;
    }
}
