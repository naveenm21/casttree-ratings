import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { createRatingsDto } from './dto/createRating.dto';
import { RatingsService } from './ratings.service';
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";

@Controller('ratings')
export class RatingsController {
  constructor(private ratingsService: RatingsService) {

  }
  @UseGuards(JwtAuthGuard)
  @Post()
  createRating(@Body(new ValidationPipe({ whitelist: true })) createratingdto: createRatingsDto) {

    return this.ratingsService.createRating(createratingdto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':sourceType/:sourceId/aggregate')
  @UsePipes(new ValidationPipe())
  getUserAggregated(@Param('sourceType') sourceType: string, @Param('sourceId') sourceId: string, @Req() req) {
    return this.ratingsService.getReviewSummary(sourceType, sourceId, req["headers"]["authorization"]);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':sourceType/:sourceId/allReviews')
  @UsePipes(new ValidationPipe())
  getAllReviews(@Param('sourceType') sourceType: string, @Param('sourceId') sourceId: string, @Query("skip", ParseIntPipe) skip: number,
    @Query("limit", ParseIntPipe) limit: number, @Req() req) {
    return this.ratingsService.getAllReviews(sourceType, sourceId, skip,
      limit, req["headers"]["authorization"]);
  }


  @UseGuards(JwtAuthGuard)
  @Post("get-aggregate-list")
  async getRatingsAggregateList(
    @Body(new ValidationPipe({ whitelist: true })) body: any) {
    try {
      let data: any = await this.ratingsService.getRatingsAggregateList(body);
      console.log(data);
      return data;

    } catch (err) {
      throw err;
    }
  }


  @UseGuards(JwtAuthGuard)
  @Post("getRatingSummary")
  async getRatingSummary(
    @Body(new ValidationPipe({ whitelist: true })) body: any, @Req() req) {
    try {
      let data: any = await this.ratingsService.getReviewSummary(body.sourceType, body.sourceId, req["headers"]["authorization"].toString());
      console.log(data);
      return data;

    } catch (err) {
      throw err;
    }
  }
}
