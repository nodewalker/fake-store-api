import { UserCartEntity } from '../typeorm';
import { PaginationDetails } from '../types';

export interface ICartService {
  getUserCart(
    userId: string,
    details: PaginationDetails,
  ): Promise<UserCartEntity>;
  addProductToUserCart(userId: string, productId: string): Promise<void>;
  removeProductFromUserCart(userId: string, productId: string): Promise<void>;
}
