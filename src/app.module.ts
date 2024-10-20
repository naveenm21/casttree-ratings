import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule/dist/schedule.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RatingsModule } from './ratings/ratings.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HelperModule } from './helper/helper.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerBehindProxyGuard } from './auth/guard/throttle-behind-proxy.guard';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get("THROTTLE_TTL"),
          limit: config.get("THROTTLE_LIMIT"),
        },
      ],
    }),
    HttpModule,
    ScheduleModule.forRoot(),
    RatingsModule,
    SharedModule,
    AuthModule,
    HelperModule,
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        console.log("db url", config.get("DB_URL"));
        return {
          uri: config.get("DB_URL"),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],

})
export class AppModule { }
