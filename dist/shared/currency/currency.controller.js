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
exports.CurrencyController = void 0;
const common_1 = require("@nestjs/common");
const currency_service_1 = require("./currency.service");
const shared_service_1 = require("../shared.service");
let CurrencyController = class CurrencyController {
    constructor(currency_service, shared_service) {
        this.currency_service = currency_service;
        this.shared_service = shared_service;
    }
    async getCurrency(search, skip, limit, res) {
        try {
            let data = await this.currency_service.getCurrency(search, skip, limit);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.shared_service.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
};
exports.CurrencyController = CurrencyController;
__decorate([
    (0, common_1.Get)(""),
    __param(0, (0, common_1.Query)("search")),
    __param(1, (0, common_1.Query)("skip", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)("limit", common_1.ParseIntPipe)),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "getCurrency", null);
exports.CurrencyController = CurrencyController = __decorate([
    (0, common_1.Controller)("currency"),
    __metadata("design:paramtypes", [currency_service_1.CurrencyService,
        shared_service_1.SharedService])
], CurrencyController);
//# sourceMappingURL=currency.controller.js.map