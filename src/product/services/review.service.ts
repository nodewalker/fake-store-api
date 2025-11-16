import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Services } from 'src/utils/const';
import {
  PaginationDetails,
  ReviewListDetails,
  ReviewDetails,
} from 'src/utils/dto';
import { IProductService, IUserService } from 'src/utils/interfaces';
import { IReviewService } from 'src/utils/interfaces/IReviewService';
import { ProductEntity, ReviewEntity, UserEntity } from 'src/utils/typeorm';
import {
  CreateReviewDetails,
  UpdateReviewDetails,
  RemoveReviewDetails,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService implements IReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly productReviewRepository: Repository<ReviewEntity>,
    @Inject(Services.user) private readonly userService: IUserService,
    @Inject(Services.product) private readonly productService: IProductService,
  ) {}

  async getProductsReviewByProductId(
    pagination: PaginationDetails,
    id: string,
  ): Promise<ReviewListDetails> {
    const product: ProductEntity = await this.productService.getProductById(id);
    const [data, total]: [ReviewDetails[], number] =
      await this.productReviewRepository
        .createQueryBuilder('review')
        .leftJoin('review.product', 'product')
        .leftJoinAndSelect('review.user', 'user')
        .where('product._uuid = :uuid', { uuid: product._uuid })
        .take(pagination.limit)
        .skip((pagination.page - 1) * pagination.limit)
        .getManyAndCount();
    return plainToInstance(
      ReviewListDetails,
      {
        data,
        pagination: {
          total,
          page: pagination.page,
          limit: pagination.limit,
          totalPages: Math.ceil(total / pagination.limit),
          isLastPage: pagination.page >= Math.ceil(total / pagination.limit),
        },
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async createProductReview(
    details: CreateReviewDetails,
  ): Promise<ReviewDetails> {
    const product: ProductEntity = await this.productService.getProductById(
      details.productId,
    );
    const user: UserEntity | null = await this.userService.findOne(
      details.userId,
    );
    if (!user?._uuid)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const reviewExist: ReviewEntity | null = await this.productReviewRepository
      .createQueryBuilder('review')
      .leftJoin('review.product', 'product')
      .leftJoin('review.user', 'user')
      .where('product._uuid = :product_uuid', { product_uuid: product._uuid })
      .andWhere('user._uuid = :user_uuid', { user_uuid: user._uuid })
      .getOne();
    if (reviewExist?._uuid)
      throw new HttpException(
        'Your review already exists. You can either update it or delete it and write a new one.',
        HttpStatus.BAD_REQUEST,
      );
    const review: ReviewEntity = await this.productReviewRepository.save({
      product,
      user,
      ...details,
    });
    return plainToInstance(
      ReviewDetails,
      { ...review, user },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async updateProductReview(details: UpdateReviewDetails): Promise<void> {
    const product: ProductEntity = await this.productService.getProductById(
      details.productId,
    );
    const user: UserEntity | null = await this.userService.findOne(
      details.userId,
    );
    if (!user?._uuid)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const review: ReviewEntity | null = await this.productReviewRepository
      .createQueryBuilder('review')
      .leftJoin('review.product', 'product')
      .leftJoin('review.user', 'user')
      .where('product._uuid = :product_uuid', { product_uuid: product._uuid })
      .andWhere('review._uuid = :review_uuid', {
        review_uuid: details.reviewId,
      })
      .andWhere('user._uuid = :user_uuid', { user_uuid: user._uuid })
      .getOne();
    if (!review?._uuid)
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    await this.productReviewRepository.update(
      { _uuid: review._uuid },
      {
        content: details?.content,
        rating: details?.rating,
      },
    );
  }

  async removeProductReview(details: RemoveReviewDetails): Promise<void> {
    const product: ProductEntity = await this.productService.getProductById(
      details.productId,
    );
    const user: UserEntity | null = await this.userService.findOne(
      details.userId,
    );
    if (!user?._uuid)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const review: ReviewEntity | null = await this.productReviewRepository
      .createQueryBuilder('review')
      .leftJoin('review.product', 'product')
      .leftJoin('review.user', 'user')
      .where('product._uuid = :product_uuid', { product_uuid: product._uuid })
      .andWhere('review._uuid = :review_uuid', {
        review_uuid: details.reviewId,
      })
      .andWhere('user._uuid = :user_uuid', { user_uuid: user._uuid })
      .getOne();
    if (!review?._uuid)
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    await this.productReviewRepository.remove(review);
  }
}
