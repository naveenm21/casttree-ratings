import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { createRatingsDto } from './dto/createRating.dto';
import { RatingsService } from './ratings.service';
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { GetToken } from 'src/shared/decorator/getuser.decorator';
import { UserToken } from 'src/auth/dto/usertoken.dto';
import { EtransactionType } from './enum/transactionType.enum';

@Controller('ratings')
export class RatingsController {
  constructor(private ratingsService: RatingsService) {

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createRating(@Body(new ValidationPipe({ whitelist: true })) createratingdto: createRatingsDto,  @GetToken() token: UserToken,) {

    return this.ratingsService.createRating(createratingdto,token);
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
  @Get(':transactionId/:transactionType')
  @UsePipes(new ValidationPipe())
  getUserRatingData(@Param('transactionId') transactionId: string, @Param('transactionType') transactionType: EtransactionType, @Req() req, @GetToken() token: UserToken) {
    return this.ratingsService.getRating(transactionId, transactionType, token);
  }

  
}
