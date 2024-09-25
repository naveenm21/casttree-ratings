"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const logger_module_1 = require("src/logger/logger.module");
const currency_controller_1 = require("./currency/currency.controller");
const currency_service_1 = require("./currency/currency.service");
const city_schema_1 = require("./schema/city.schema");
const command_source_schema_1 = require("./schema/command-source.schema");
const country_schema_1 = require("./schema/country.schema");
const currency_schema_1 = require("./schema/currency.schema");
const date_format_schema_1 = require("./schema/date-format.schema");
const language_schema_1 = require("./schema/language.schema");
const sequence_schema_1 = require("./schema/sequence.schema");
const state_schema_1 = require("./schema/state.schema");
const time_zone_schema_1 = require("./schema/time-zone.schema");
const shared_service_1 = require("./shared.service");
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            logger_module_1.LoggerModule,
            mongoose_1.MongooseModule.forFeature([
                { name: "sequence", schema: sequence_schema_1.SequenceSchema },
                { name: "currency", schema: currency_schema_1.CurrencySchema },
                { name: "country", schema: country_schema_1.CountrySchema },
                { name: "state", schema: state_schema_1.StateSchema },
                { name: "city", schema: city_schema_1.CitySchema },
                { name: "language", schema: language_schema_1.LanguageSchema },
                { name: "timeZone", schema: time_zone_schema_1.TimeZoneSchema },
                { name: "date-format", schema: date_format_schema_1.DateFormatSchema },
                { name: "commandSource", schema: command_source_schema_1.CommandSourceSchema },
            ]),
        ],
        providers: [shared_service_1.SharedService, currency_service_1.CurrencyService, config_1.ConfigService],
        exports: [shared_service_1.SharedService, currency_service_1.CurrencyService],
        controllers: [currency_controller_1.CurrencyController],
    })
], SharedModule);
//# sourceMappingURL=shared.module.js.map