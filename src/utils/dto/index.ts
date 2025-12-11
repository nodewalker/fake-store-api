import { UpdateCategoryDto } from './req.dto/UpdateCategory.dto';
import { UpdateProductDto } from './req.dto/UpdateProduct.dto';
import { CartItemsDto } from './req.dto/CartItems.dto';
import { ReviewDetails } from './res.dto/Review.dto';
import { CartDetails } from './res.dto/Cart.dto';
import { ProductsListDetails } from './res.dto/ProductsList.dto';
import { ProductDetails } from './res.dto/Product.dto';
import { RootCategoriesDetail } from './res.dto/RootCategories.dto';
import { CategoryDetails } from './res.dto/Caregory.dto';
import { TokensDetails } from './res.dto/Tokens.dt';
import { ReturnUserProfileDetails } from './res.dto/ReturnUserProfile.dto';
import { JwtTokensDetails } from './res.dto/JwtTokens.dto';
import { ReturnCreateUserDetails } from './res.dto/ReturnCreateUser.dto';
import { CreateProductDto } from './req.dto/CreateProduct.dto';
import { PaginationQueryDto } from './req.dto/PaginationQuery.dto';
import { GetProductsDto } from './req.dto/GetProducts.dto';
import { CreateCategoryDto } from './req.dto/CreateCategory.dto';
import { UpdateUserPasswordDto } from './req.dto/UpdateUserPassword.dto';
import { UpdateUserDto } from './req.dto/UpdateUser.dto';
import { CreateUserDto } from './req.dto/CreateUser.dto';
import { LoginDto } from './req.dto/Login.dto';
import { PaginationDetails } from './res.dto/Pagination.dto';
import { CreateReviewDto } from './req.dto/CreateReview.dto';
import { ReviewUserDetails } from './res.dto/ReviewUser.dto';
import { ReviewListDetails } from './res.dto/ReviewList.dto';
import { UpdateReviewDto } from './req.dto/UpdateReview.dto';
import { ProductCategoryDetails } from './res.dto/ProductCategory.dto';
import { CartItemsDetails } from './res.dto/CartItem.dto';

// REQ
export {
  CreateUserDto,
  LoginDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
  CreateCategoryDto,
  GetProductsDto,
  PaginationQueryDto,
  CreateProductDto,
  CreateReviewDto,
  UpdateReviewDto,
  CartItemsDto,
  UpdateProductDto,
  UpdateCategoryDto,
};

// RES
export {
  ProductCategoryDetails,
  PaginationDetails,
  CartDetails,
  ProductDetails,
  ProductsListDetails,
  RootCategoriesDetail,
  CategoryDetails,
  TokensDetails,
  ReturnCreateUserDetails,
  JwtTokensDetails,
  ReturnUserProfileDetails,
  ReviewUserDetails,
  ReviewDetails,
  ReviewListDetails,
  CartItemsDetails,
};
