import { CartDetails } from '../dto';
import { PaginationDetails } from '../types';

export interface ICartService {
  getUserCart(userId: string, details: PaginationDetails): Promise<CartDetails>;
  addProductToUserCart(userId: string, productId: string): Promise<void>;
  removeProductFromUserCart(userId: string, productId: string): Promise<void>;
}
