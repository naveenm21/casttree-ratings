"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const schedule_module_1 = require("@nestjs/schedule/dist/schedule.module");
const core_1 = require("@nestjs/core");
const ratings_module_1 = require("./ratings/ratings.module");
const shared_module_1 = require("./shared/shared.module");
const auth_module_1 = require("./auth/auth.module");
const helper_module_1 = require("./helper/helper.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const throttler_1 = require("@nestjs/throttler");
const throttle_behind_proxy_guard_1 = require("./auth/guard/throttle-behind-proxy.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => [
                    {
                        ttl: config.get("THROTTLE_TTL"),
                        limit: config.get("THROTTLE_LIMIT"),
                    },
                ],
            }),
            axios_1.HttpModule,
            schedule_module_1.ScheduleModule.forRoot(),
            mongoose_1.MongooseModule.forRoot('mongodb+srv://dbAdmin:umP6QgRUxgPkK7kd@tecxprt.qbxr7.mongodb.net/tecxprt?authSource=admin&replicaSet=atlas-m6ccdd-shard-0&readPreference=primary&ssl=true'),
            ratings_module_1.RatingsModule,
            shared_module_1.SharedModule, auth_module_1.AuthModule, helper_module_1.HelperModule,
            event_emitter_1.EventEmitterModule.forRoot(),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttle_behind_proxy_guard_1.ThrottlerBehindProxyGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map