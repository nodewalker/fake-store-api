import { ReviewDetails, ReviewListDetails } from '../dto';
import {
  CreateReviewDetails,
  UpdateReviewDetails,
  RemoveReviewDetails,
  PaginationDetails,
} from '../types';

export interface IReviewService {
  createProductReview(
    this: void,
    details: CreateReviewDetails,
  ): Promise<ReviewDetails>;
  getProductsReviewByProductId(
    this: void,
    pagination: PaginationDetails,
    id: string,
  ): Promise<ReviewListDetails>;
  updateProductReview(this: void, details: UpdateReviewDetails): Promise<void>;
  removeProductReview(this: void, details: RemoveReviewDetails): Promise<void>;
}
