import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserToken } from 'src/auth/dto/usertoken.dto';
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { GetToken } from 'src/shared/decorator/getuser.decorator';
import { createRatingsDto } from './dto/createRating.dto';
import { filterDto, getServiceRequestRatingsDto } from './dto/filter.dto';
import { EtransactionType } from './enum/transactionType.enum';
import { RatingsService } from './ratings.service';


@Controller('ratings')
@ApiTags('Ratings Module')
export class RatingsController {
  constructor(private ratingsService: RatingsService) {

  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "This api is used to create ratings for an item" })
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        sourceId: {
          type: 'string',
          example: '66ebe84b9a3569c333693e46',
          description: 'Mongo Id of the item for which user is rating'
        },
        sourceType: {
          type: 'string',
          example: 'serviceItem',
          description: 'Type of the service for which user is rating'
        },
        transactionId: {
          type: 'string',
          example: '66ebe84b9a3569c333693e46',
          description: 'Mongo Id of the response for which user is rating'
        },
        transactionType: {
          type: 'string',
          example: 'serviceRequest',
          description: 'Type of the response for which user is rating'
        },
        overAllRating: {
          type: 'number',
          example: '5',
          description: 'Rating given for that service'
        },
        scale: {
          type: 'number',
          example: '5',
          description: 'Maximum rating that can be given for that service'
        },
        overAllDescription: {
          type: 'string',
          example: 'Good response and indepth analysis',
          description: 'description about the experience of the service '
        },
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Rating created successfully'
  })
  @ApiResponse({
    status: 404,
    description: 'Please concatinate casttree-ratings to base url'
  })
  @Post()
  createRating(@Body(new ValidationPipe({ whitelist: true })) createratingdto: createRatingsDto, @GetToken() token: UserToken,) {

    return this.ratingsService.createRating(createratingdto, token);
  }


  @Get(':sourceType/:sourceId/aggregate')
  @UsePipes(new ValidationPipe())
  getUserAggregated(@Param('sourceType') sourceType: string, @Param('sourceId') sourceId: string, @Req() req) {
    return this.ratingsService.getReviewSummary(sourceType, sourceId);
  }


  @Get(':sourceType/:sourceId/allReviews')
  @UsePipes(new ValidationPipe())
  getAllReviews(@Param('sourceType') sourceType: string, @Param('sourceId') sourceId: string, @Query("skip", ParseIntPipe) skip: number,
    @Query("limit", ParseIntPipe) limit: number, @Req() req) {
    return this.ratingsService.getAllReviews(sourceType, sourceId, skip,
      limit);
  }



  @Post("get-aggregate-list")
  async getRatingsAggregateList(
    @Body(new ValidationPipe({ whitelist: true })) body: filterDto) {
    try {
      let data = await this.ratingsService.getRatingsAggregateList(body);

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

  @Post("get-serviceRequest-ratings")
  async getServiceRequestRatings(
    @Body(new ValidationPipe({ whitelist: true })) body: getServiceRequestRatingsDto
  ) {
    try {
      let data = await this.ratingsService.getServiceRequestRatings(body);
      return data;
    }
    catch (err) {
    }
  }


}
