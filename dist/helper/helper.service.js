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
exports.HelperService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let HelperService = class HelperService {
    constructor(http_service, configService) {
        this.http_service = http_service;
        this.configService = configService;
    }
    getRequiredHeaders(req) {
        const reqHeaders = {
            Authorization: "",
        };
        if (req.headers) {
            reqHeaders.Authorization = req.headers["authorization"] ?? "";
        }
        return reqHeaders;
    }
    async getProfileById(userId, accessToken, type) {
        try {
            let data = await this.http_service
                .post(`${this.configService.get("CASTTREE_BASE_URL")}/profile/get-profile-list`, { userIds: userId, type: type }, {
                headers: {
                    Authorization: accessToken,
                },
            })
                .toPromise();
            return data.data.profileData;
        }
        catch (err) {
            throw err;
        }
    }
    async getRatings(sourceId, sourceType) {
        try {
            let data = await this.http_service
                .post(`http://localhost:3000/ratings/get-aggregate-list`, { sourceIds: sourceId, sourceType: sourceType })
                .toPromise();
            return data.data.ratingData;
        }
        catch (err) {
            throw err;
        }
    }
    async getRatingsSummary(sourceId, sourceType) {
        try {
            let data = await this.http_service
                .post(`http://localhost:3000/ratings/getRatingSummary`, { sourceId: sourceId, sourceType: sourceType })
                .toPromise();
            return data.data;
        }
        catch (err) {
            throw err;
        }
    }
    async updateNominationStatus(body) {
        try {
            let data = await this.http_service
                .patch(`${this.configService.get("CASTTREE_BASE_URL")}/nominations`, body, {
                headers: {
                    Authorization: `${body.token}`,
                },
            })
                .toPromise();
            return data.data;
        }
        catch (err) {
            throw err;
        }
    }
};
exports.HelperService = HelperService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HelperService.prototype, "getRequiredHeaders", null);
exports.HelperService = HelperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], HelperService);
//# sourceMappingURL=helper.service.js.map