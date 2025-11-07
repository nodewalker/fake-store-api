import {
  ProductDetails,
  ProductsListDetails,
  ReviewDetails,
  ReviewListDetails,
} from '../dto';
import { ProductEntity } from '../typeorm';
import {
  CreateProductDetails,
  CreateReviewDetails,
  GetProductsDetails,
  PaginationDetails,
  RemoveReviewDetails,
  UpdateReviewDetails,
} from '../types';

export interface IProductService {
  createProduct(
    userId: string,
    details: CreateProductDetails,
  ): Promise<ProductDetails>;
  getProducts(details: GetProductsDetails): Promise<ProductsListDetails>;
  getProductById(id: string): Promise<ProductEntity>;
  isCategoryhasProducts(categoryId: string): Promise<boolean>;
  removeProduct(productId: string): Promise<void>;

  // REVIEW
  createProductReview(details: CreateReviewDetails): Promise<ReviewDetails>;
  getProductsReviewByProductId(
    pagination: PaginationDetails,
    id: string,
  ): Promise<ReviewListDetails>;
  updateProductReview(details: UpdateReviewDetails): Promise<void>;
  removeProductReview(details: RemoveReviewDetails): Promise<void>;
}
