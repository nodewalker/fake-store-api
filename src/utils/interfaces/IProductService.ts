import { ProductEntity } from '../typeorm';
import { GetProductsReturn } from '../types';

export interface IProductService {
  getProducts(
    limit: number,
    page: number,
    categoryName?: string,
  ): Promise<GetProductsReturn>;
  getProductById(id: string): Promise<ProductEntity>;
}
