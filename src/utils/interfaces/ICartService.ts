import { UserCartEntity } from '../typeorm';

export interface ICartService {
  getUserCart(userId: string): Promise<UserCartEntity>;
  addProductToUserCart(userId: string, productId: string): Promise<void>;
  removeProductFromUserCart(userId: string, productId: string): Promise<void>;
}
