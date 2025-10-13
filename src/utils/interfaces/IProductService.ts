import { ProductEntity } from '../typeorm';
import { GetProductsDetails, GetProductsReturn } from '../types';

export interface IProductService {
  getProducts(details: GetProductsDetails): Promise<GetProductsReturn>;
  getProductById(id: string): Promise<ProductEntity>;
}
