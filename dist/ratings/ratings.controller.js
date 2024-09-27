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
exports.RatingsController = void 0;
const common_1 = require("@nestjs/common");
const createRating_dto_1 = require("./dto/createRating.dto");
const ratings_service_1 = require("./ratings.service");
let RatingsController = class RatingsController {
    constructor(ratingsService) {
        this.ratingsService = ratingsService;
    }
    createRating(createratingdto) {
        return this.ratingsService.createRating(createratingdto);
    }
    getUserAggregated(sourceType, sourceId, req) {
        return this.ratingsService.getReviewSummary(sourceType, sourceId, req["headers"]["authorization"]);
    }
    getAllReviews(sourceType, sourceId, skip, limit, req) {
        return this.ratingsService.getAllReviews(sourceType, sourceId, skip, limit, req["headers"]["authorization"]);
    }
    async getRatingsAggregateList(body) {
        try {
            let data = await this.ratingsService.getRatingsAggregateList(body);
            console.log(data);
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    async getRatingSummary(body) {
        try {
            let data = await this.ratingsService.getReviewSummary(body.sourceType, body.sourceId);
            console.log(data);
            return data;
        }
        catch (err) {
            throw err;
        }
    }
};
exports.RatingsController = RatingsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createRating_dto_1.createRatingsDto]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "createRating", null);
__decorate([
    (0, common_1.Get)(':sourceType/:sourceId/aggregate'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('sourceType')),
    __param(1, (0, common_1.Param)('sourceId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "getUserAggregated", null);
__decorate([
    (0, common_1.Get)(':sourceType/:sourceId/allReviews'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('sourceType')),
    __param(1, (0, common_1.Param)('sourceId')),
    __param(2, (0, common_1.Query)("skip", common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)("limit", common_1.ParseIntPipe)),
    __param(4, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, Object]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "getAllReviews", null);
__decorate([
    (0, common_1.Post)("get-aggregate-list"),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "getRatingsAggregateList", null);
__decorate([
    (0, common_1.Post)("getRatingSummary"),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "getRatingSummary", null);
exports.RatingsController = RatingsController = __decorate([
    (0, common_1.Controller)('ratings'),
    __metadata("design:paramtypes", [ratings_service_1.RatingsService])
], RatingsController);
//# sourceMappingURL=ratings.controller.js.map