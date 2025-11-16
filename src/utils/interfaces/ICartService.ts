import { CartDetails } from '../dto';
import { PaginationDetails, SelectedCartItemDetails } from '../types';

export interface ICartService {
  getUserCart(
    this: void,
    userId: string,
    details: PaginationDetails,
  ): Promise<CartDetails>;
  addProductToUserCart(
    this: void,
    userId: string,
    productId: string,
  ): Promise<void>;
  removeProductFromUserCart(
    this: void,
    userId: string,
    details: SelectedCartItemDetails,
  ): Promise<void>;
}
