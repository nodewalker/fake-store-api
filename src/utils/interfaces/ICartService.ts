import { CartDetails } from '../dto';
import { PaginationDetails, CartItemsListDetails } from '../types';

export interface ICartService {
  getUserCart(
    this: void,
    userId: string,
    details: PaginationDetails,
  ): Promise<CartDetails>;
  addProductToUserCart(
    this: void,
    userId: string,
    details: CartItemsListDetails,
  ): Promise<void>;
  removeProductFromUserCart(
    this: void,
    userId: string,
    details: CartItemsListDetails,
  ): Promise<void>;
}
