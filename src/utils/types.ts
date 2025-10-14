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
  name?: string;
  orderBy?: OrderBy;
  sortBy?: SortType;
  priceFrom?: number;
  priceTo?: number;
  categoryName?: string;
};
export type GetProductsReturn = {
  data: ProductEntity[];
  pagination: PaginationReturn;
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
