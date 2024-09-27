import { Module } from '@nestjs/common';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ratingAggregatedSchema, ratingSchema } from './schema/ratings-schema';
import { AuthModule } from 'src/auth/auth.module';
import { HelperModule } from 'src/helper/helper.module';



@Module({
  imports: [MongooseModule.forFeature([
    {
      name: "ratings",
      schema: ratingSchema
    }
    , {
      name: "ratingsAggregated",
      schema: ratingAggregatedSchema
    }
  ]),
  AuthModule,
  HelperModule,


],
  controllers: [RatingsController],
  providers: [RatingsService],
  exports:[RatingsService],
})
export class RatingsModule { }
