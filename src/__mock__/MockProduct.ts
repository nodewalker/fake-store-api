import {
  CreateProductDto,
  CreateReviewDto,
  GetProductsDto,
  ProductDetails,
  ProductsListDetails,
  ReviewDetails,
  ReviewListDetails,
  UpdateReviewDto,
} from 'src/utils/dto';
import { MockPaginationDetails } from './MockUtils';
import { OrderBy, SortType } from 'src/utils/const';

export const MockProduct: ProductDetails = {
  _uuid: '17a54659-a06a-464f-a914-190cee7d4b1a',
  name: 'mock product',
  price: 0,
  discount: 0,
  rating: 0,
  review_count: 0,
  images: [],
  category: { _uuid: 'category od', name: 'product name' },
};

export const MockProductList: ProductsListDetails = {
  data: [MockProduct],
  price_range: { min: 0, max: 1 },
  pagination: MockPaginationDetails,
};

export const MockGetProductsDto: GetProductsDto = {
  name: 'product_name',
  orderBy: OrderBy.NAME,
  sort: SortType.ASC,
  priceFrom: 0,
  priceTo: 1000,
  categoryName: 'shoes',
  categoryId: 'cid',
  limit: 10,
  page: 1,
};

export const MockCreateProductDto: CreateProductDto = {
  name: 'mock product',
  price: 0,
  discount: 0,
  categoryId: 'cid',
};

// REVIEW
export const MockReview: ReviewDetails = {
  _uuid: 'review id',
  content: 'some text',
  rating: 0,
  user: {
    _uuid: 'user id',
    firstName: 'mock',
    lastName: 'user',
    avatarURL: 'awdawdawd.test',
  },
};

export const MockReviewsList: ReviewListDetails = {
  data: [MockReview],
  pagination: MockPaginationDetails,
};

export const MockCreateReview: CreateReviewDto = {
  content: 'some text',
  rating: 1,
};

export const MockUpdateReview: UpdateReviewDto = {
  content: 'some text',
  rating: 1,
};
