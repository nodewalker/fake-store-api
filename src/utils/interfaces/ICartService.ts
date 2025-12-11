import { CartDetails } from '../dto';
import { PaginationDetails, CartItemsDetails } from '../types';

export interface ICartService {
  getUserCart(
    this: void,
    userId: string,
    details: PaginationDetails,
  ): Promise<CartDetails>;
  addProductToUserCart(
    this: void,
    userId: string,
    details: CartItemsDetails,
  ): Promise<void>;
  removeProductFromUserCart(
    this: void,
    userId: string,
    details: CartItemsDetails,
  ): Promise<void>;
}
