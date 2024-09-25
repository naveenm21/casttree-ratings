import { Module } from '@nestjs/common';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ratingaggregatedSchema, ratingSchema } from './schema/ratings-schema';


@Module({
  imports: [MongooseModule.forFeature([
    {
      name: "Ratingsv1",
      schema: ratingSchema
    }
    , {
      name: "Ratingsaggregated",
      schema: ratingaggregatedSchema
    }
  ]),],
  controllers: [RatingsController],
  providers: [RatingsService],
  exports:[RatingsService],
})
export class RatingsModule { }
