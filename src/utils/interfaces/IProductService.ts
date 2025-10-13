import { ProductEntity } from '../typeorm';
import {
  CreateProductDetails,
  GetProductsDetails,
  GetProductsReturn,
} from '../types';

export interface IProductService {
  createProduct(
    userId: string,
    details: CreateProductDetails,
  ): Promise<ProductEntity>;
  getProducts(details: GetProductsDetails): Promise<GetProductsReturn>;
  getProductById(id: string): Promise<ProductEntity>;
}
