import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from 'src/utils/Config';
import { Services } from 'src/utils/const';
import { ICartService, IProductService } from 'src/utils/interfaces';
import { ProductEntity, UserCartEntity } from 'src/utils/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CartService implements ICartService {
  constructor(
    @InjectRepository(UserCartEntity)
    private readonly cartRepository: Repository<UserCartEntity>,
    @Inject(Services.product) private readonly productService: IProductService,
  ) {}

  async getUserCart(userId: string): Promise<UserCartEntity> {
    const cart: UserCartEntity = (await this.cartRepository
      .createQueryBuilder('cart')
      .where('cart.user._uuid = :uuid', { uuid: userId })
      .getOne()) as UserCartEntity;
    return cart;
  }

  async addProductToUserCart(userId: string, productId: string): Promise<void> {
    const cart: UserCartEntity = (await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.products', 'products')
      .where('cart.user._uuid = :uuid', { uuid: userId })
      .getOne()) as UserCartEntity;
    if (cart.products.length >= Config.CART.SIZE)
      throw new HttpException(
        `The maximum cart size is ${Config.CART.SIZE}`,
        HttpStatus.BAD_REQUEST,
      );
    const product: ProductEntity =
      await this.productService.getProductById(productId);
    cart.products.push(product);
    await this.cartRepository.save(cart);
  }

  async removeProductFromUserCart(
    userId: string,
    productId: string,
  ): Promise<void> {
    const cart: UserCartEntity = (await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.products', 'products')
      .where('cart.user._uuid = :uuid', { uuid: userId })
      .getOne()) as UserCartEntity;
    const product: ProductEntity =
      await this.productService.getProductById(productId);
    cart.products.filter((p) => p._uuid !== product._uuid);
    await this.cartRepository.save(cart);
  }
}
