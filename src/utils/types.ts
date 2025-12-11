import { OrderBy, SortType } from './const';
import { ProductCategoryEntity, ProductEntity, UserEntity } from './typeorm';

// AUTH
export type LoginDetails = {
  login: string;
  password: string;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type JWTPayload = {
  sub: string;
};

export type UserRequest = {
  _uuid: string;
};

// USER
export type CreateUserDetails = {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
};
export type FindUserOptions = {
  selectAll: boolean;
  isAuth: boolean;
};
export type ReturnUserDetails = Omit<UserEntity, 'password'>;
export type UpdateUserDetails = {
  firstName?: string;
  lastName?: string;
  login?: string;
  email?: string;
  avatarURL?: string;
};
export type CartItemsListDetails = { items: string[] };

export type UpdateUserPasswordDetails = {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

// CATEGORY
export type CreateCategoryDetails = {
  name: string;
  parentId?: string;
};
export type GetCategoriesReturn = {
  tree: ProductCategoryEntity[];
  pagination: PaginationReturn;
};
export type UpdateCategoryDetails = {
  _uuid: string;
  name: string;
};

// PRODUCT
export type CreateProductDetails = {
  name: string;
  price: number;
  categoryId: string;
  discount?: number;
  images: string[];
};
export type GetProductsDetails = {
  limit: number;
  page: number;
  productIds?: string[];
  name?: string;
  orderBy?: OrderBy;
  sort?: SortType;
  priceFrom?: number;
  priceTo?: number;
  categoryName?: string;
  categoryId?: string;
};
export type GetProductsReturn = {
  data: ProductEntity[];
  pagination: PaginationReturn;
};
export type UpdateProductDetails = Partial<{
  _uuid: string;
  name: string;
  price: number;
  discount: number;
  removeImages: string[];
  addImages: string[];
}>;

// REVIEW
export type CreateReviewDetails = {
  userId: string;
  productId: string;
  content: string;
  rating: number;
};
export type UpdateReviewDetails = {
  userId: string;
  reviewId: string;
  productId: string;
  content?: string;
  rating?: number;
};
export type RemoveReviewDetails = {
  userId: string;
  productId: string;
  reviewId: string;
};

// utils
export type PaginationDetails = {
  limit: number;
  page: number;
};
export type PaginationReturn = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isLastPage: boolean;
};
