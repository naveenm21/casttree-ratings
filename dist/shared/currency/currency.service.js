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
exports.CurrencyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CurrencyService = class CurrencyService {
    constructor(currency_model) {
        this.currency_model = currency_model;
    }
    async getCurrency(search, skip, limit) {
        try {
            let cond = [];
            if (search) {
                let search_regex = new RegExp(search, "i");
                cond.push({ currency_name: search_regex });
                cond.push({ currency_code: search_regex });
            }
            let filter = {};
            if (cond.length) {
                filter["$or"] = cond;
            }
            let data = await this.currency_model
                .find(filter)
                .skip(skip)
                .limit(limit);
            let count = await this.currency_model.countDocuments(filter);
            return { data, count };
        }
        catch (err) {
            throw err;
        }
    }
    getSingleCurrency(currency_id) {
        try {
            return this.currency_model.findById(currency_id);
        }
        catch (err) {
            throw err;
        }
    }
    async getDefaultCurrency() {
        try {
            let data = await this.currency_model.findOne({
                is_default: true,
            });
            return data;
        }
        catch (err) {
            throw err;
        }
    }
};
exports.CurrencyService = CurrencyService;
exports.CurrencyService = CurrencyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("currency")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CurrencyService);
//# sourceMappingURL=currency.service.js.map