import { CartDetails } from '../dto';
import { PaginationDetails, SelectedCartItemDetails } from '../types';

export interface ICartService {
  getUserCart(userId: string, details: PaginationDetails): Promise<CartDetails>;
  addProductToUserCart(userId: string, productId: string): Promise<void>;
  removeProductFromUserCart(
    userId: string,
    details: SelectedCartItemDetails,
  ): Promise<void>;
}
