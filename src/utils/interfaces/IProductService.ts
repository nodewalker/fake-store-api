import { ProductDetails, ProductsListDetails } from '../dto';
import { ProductEntity } from '../typeorm';
import {
  CreateProductDetails,
  GetProductsDetails,
  UpdateProductDetails,
} from '../types';

export interface IProductService {
  createProduct(
    this: void,
    userId: string,
    details: CreateProductDetails,
  ): Promise<ProductDetails>;
  getProducts(
    this: void,
    details: GetProductsDetails,
  ): Promise<ProductsListDetails>;
  getProductById(this: void, id: string): Promise<ProductEntity>;
  isCategoryhasProducts(this: void, categoryId: string): Promise<boolean>;
  removeProduct(this: void, productId: string): Promise<void>;
  updateProduct(userid: string, details: UpdateProductDetails): Promise<void>;
}
