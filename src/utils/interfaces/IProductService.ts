import { ProductsListDetails } from '../dto';
import { ProductEntity } from '../typeorm';
import { CreateProductDetails, GetProductsDetails } from '../types';

export interface IProductService {
  createProduct(
    userId: string,
    details: CreateProductDetails,
  ): Promise<ProductEntity>;
  getProducts(details: GetProductsDetails): Promise<ProductsListDetails>;
  getProductById(id: string): Promise<ProductEntity>;
  isCategoryhasProducts(categoryId: string): Promise<boolean>;
  removeProduct(productId: string): Promise<void>;
}
