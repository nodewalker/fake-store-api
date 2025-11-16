import {
  HttpStatus,
  Get,
  Query,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Post,
  Req,
  Body,
  Patch,
  Res,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  ReviewListDetails,
  PaginationQueryDto,
  ReviewDetails,
  CreateReviewDto,
  UpdateReviewDto,
} from 'src/utils/dto';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
import { Request, Response } from 'express';
import { IReviewService } from 'src/utils/interfaces/IReviewService';

export class ReviewController {
  protected reviewService: IReviewService;
  constructor(reviewService: IReviewService) {
    this.reviewService = reviewService;
  }

  @ApiOperation({ summary: 'Get reviews by product id' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Product id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reviews recived',
    type: ReviewListDetails,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Check response message',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Server error',
  })
  @Get(':id/review')
  async getProductReviews(
    @Query() pagination: PaginationQueryDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.reviewService.getProductsReviewByProductId(
      pagination,
      id,
    );
  }

  @ApiOperation({ summary: 'Create product review' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Product id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product review created',
    type: ReviewDetails,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Check response message',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Server error',
  })
  @UseGuards(AuthGuard)
  @Post(':id/review')
  async createProductReview(
    @Req() req: Request,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CreateReviewDto,
  ) {
    return await this.reviewService.createProductReview({
      ...dto,
      userId: req.user._uuid,
      productId: id,
    });
  }

  @ApiOperation({ summary: 'Update product review' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Product id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product review updated',
  })
  @ApiResponse({
    status: '4XX',
    description: 'Check response message',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Server error',
  })
  @UseGuards(AuthGuard)
  @Patch(':prodid/review/:reviewid')
  async updateProductReview(
    @Req() req: Request,
    @Param('prodid', new ParseUUIDPipe()) productId: string,
    @Param('reviewid', new ParseUUIDPipe()) reviewId: string,
    @Body() dto: UpdateReviewDto,
    @Res() res: Response,
  ) {
    await this.reviewService.updateProductReview({
      ...dto,
      userId: req.user._uuid,
      productId,
      reviewId,
    });
    return res.sendStatus(HttpStatus.OK);
  }

  @ApiOperation({ summary: 'Delete product review' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Product id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product review deleted',
  })
  @ApiResponse({
    status: '4XX',
    description: 'Check response message',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Server error',
  })
  @UseGuards(AuthGuard)
  @Delete(':prodid/review/:reviewid')
  async DeleteProductReview(
    @Req() req: Request,
    @Param('prodid', new ParseUUIDPipe()) productId: string,
    @Param('reviewid', new ParseUUIDPipe()) reviewId: string,
    @Res() res: Response,
  ) {
    await this.reviewService.removeProductReview({
      reviewId,
      productId,
      userId: req.user._uuid,
    });
    return res.sendStatus(HttpStatus.OK);
  }
}
