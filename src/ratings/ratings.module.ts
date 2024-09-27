import { Module } from '@nestjs/common';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ratingAggregatedSchema, ratingSchema } from './schema/ratings-schema';



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


],
  controllers: [RatingsController],
  providers: [RatingsService],
  exports:[RatingsService],
})
export class RatingsModule { }
