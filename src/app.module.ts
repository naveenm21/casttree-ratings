import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule/dist/schedule.module';


import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RatingsModule } from './ratings/ratings.module';


@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://dbAdmin:umP6QgRUxgPkK7kd@tecxprt.qbxr7.mongodb.net/tecxprt?authSource=admin&replicaSet=atlas-m6ccdd-shard-0&readPreference=primary&ssl=true'),
    RatingsModule
 ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
