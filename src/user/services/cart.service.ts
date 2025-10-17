import { plainToInstance } from 'class-transformer';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from 'src/utils/const';
import { CartDetails } from 'src/utils/dto';
import { ICartService, IProductService } from 'src/utils/interfaces';
import { ProductEntity, UserCartEntity } from 'src/utils/typeorm';
import { PaginationDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CartService implements ICartService {
  constructor(
    @InjectRepository(UserCartEntity)
    private readonly cartRepository: Repository<UserCartEntity>,
    @Inject(Services.product) private readonly productService: IProductService,
    private readonly configService: ConfigService,
  ) {}

  async getUserCart(
    userId: string,
    details: PaginationDetails,
  ): Promise<CartDetails> {
    const cart: UserCartEntity = (await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoin('cart.user', 'user')
      .leftJoinAndSelect('cart.products', 'products')
      .where('user._uuid = :uuid', { uuid: userId })
      .take(details.limit)
      .skip((details.page - 1) * details.limit)
      .getOne()) as UserCartEntity;
    return plainToInstance(CartDetails, cart, {
      excludeExtraneousValues: true,
    });
  }

  async addProductToUserCart(userId: string, productId: string): Promise<void> {
    const cart: UserCartEntity = (await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoin('cart.user', 'user')
      .leftJoinAndSelect('cart.products', 'products')
      .where('user._uuid = :uuid', { uuid: userId })
      .getOne()) as UserCartEntity;
    const CART_MAX_SIZE = this.configService.get<number>(
      'cart_max_size',
    ) as number;
    if (cart.products.length >= CART_MAX_SIZE)
      throw new HttpException(
        `The maximum cart size is ${CART_MAX_SIZE}`,
        HttpStatus.BAD_REQUEST,
      );
    const product: ProductEntity =
      await this.productService.getProductById(productId);
    if (cart.products.filter((pr) => pr._uuid === product._uuid).length)
      throw new HttpException(
        'The product has already been added',
        HttpStatus.BAD_REQUEST,
      );
    cart.products.push(product);
    await this.cartRepository.save(cart);
  }

  async removeProductFromUserCart(
    userId: string,
    productId: string,
  ): Promise<void> {
    const cart: UserCartEntity = (await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoin('cart.user', 'user')
      .leftJoinAndSelect('cart.products', 'products')
      .where('user._uuid = :uuid', { uuid: userId })
      .getOne()) as UserCartEntity;
    const product: ProductEntity =
      await this.productService.getProductById(productId);
    if (!cart.products.filter((p) => p._uuid === product._uuid).length)
      throw new HttpException(
        'The product in your cart could not be found',
        HttpStatus.NOT_FOUND,
      );
    cart.products = cart.products.filter((p) => p._uuid !== product._uuid);
    await this.cartRepository.save(cart);
  }
}
