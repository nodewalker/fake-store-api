import { plainToInstance } from 'class-transformer';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from 'src/utils/const';
import { CartDetails, CartItemsDetails } from 'src/utils/dto';
import { ICartService, IProductService } from 'src/utils/interfaces';
import {
  ProductEntity,
  UserCartEntity,
  UserCartItemEntity,
} from 'src/utils/typeorm';
import { PaginationDetails, CartItemsListDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

// TODO: test
@Injectable()
export class CartService implements ICartService {
  constructor(
    @InjectRepository(UserCartEntity)
    private readonly cartRepository: Repository<UserCartEntity>,
    @InjectRepository(UserCartItemEntity)
    private readonly cartItemRepository: Repository<UserCartItemEntity>,
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
    const cartProducts = await this.productService.getProducts({
      page: details.page,
      limit: details.limit,
      productIds: cart.products.map((el) => el._uuid),
    });
    const products: CartItemsDetails[] = [];
    for (let i = 0; i < cart.products.length; i++) {
      let a = false;
      for (let j = 0; j < cartProducts.data.length; j++) {
        if (cart.products[i].productUuid === cartProducts.data[j]._uuid) {
          products.push({
            ...cartProducts.data[j],
            quantity: cart.products[i].quantity,
          });
          a = true;
        }
      }
      // NOT FOUND
      if (a) {
        products.push({
          _uuid: cart.products[i]._uuid,
          name: 'Not found',
          price: 0,
          discount: 0,
          rating: 0,
          review_count: 0,
          quantity: 0,
        });
      }
    }
    return plainToInstance(
      CartDetails,
      {
        _uuid: cart._uuid,
        products: products,
      } as CartDetails,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async addProductToUserCart(
    userId: string,
    details: CartItemsListDetails,
  ): Promise<void> {
    if (!details.items.length)
      throw new HttpException(
        'The items list is empty',
        HttpStatus.BAD_REQUEST,
      );
    const cart: UserCartEntity = (await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoin('cart.user', 'user')
      .leftJoinAndSelect('cart.products', 'products')
      .where('user._uuid = :uuid', { uuid: userId })
      .getOne()) as UserCartEntity;
    const CART_MAX_SIZE = this.configService.get<number>(
      'cart_max_size',
    ) as number;
    if (cart.products.length + details.items.length >= CART_MAX_SIZE)
      throw new HttpException(
        `The maximum cart size is ${CART_MAX_SIZE}`,
        HttpStatus.BAD_REQUEST,
      );
    const products: ProductEntity[] = await this.productService.getProductList(
      details.items,
    );
    for (let i = 0; i < products.length; i++) {
      const t = await this.cartItemRepository
        .createQueryBuilder('item')
        .leftJoin('item.cart', 'cart')
        .where('item.productUuid = :productUuid', {
          productUuid: products[i]._uuid,
        })
        .andWhere('cart._uuid = :cartUuid', { cartUuid: cart._uuid })
        .getOne();
      if (t)
        await this.cartItemRepository.update(t, { quantity: t.quantity + 1 });
      else
        await this.cartItemRepository.save({
          productUuid: products[i]._uuid,
          quantity: 1,
          cart: cart,
        });
    }
  }

  async removeProductFromUserCart(
    userId: string,
    details: CartItemsListDetails,
  ): Promise<void> {
    const cart: UserCartEntity = (await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoin('cart.user', 'user')
      .leftJoinAndSelect('cart.products', 'products')
      .where('user._uuid = :uuid', { uuid: userId })
      .getOne()) as UserCartEntity;

    const qb = this.cartItemRepository
      .createQueryBuilder('item')
      .leftJoin('item.cart', 'cart');
    for (let i = 0; i < details.items.length; i++) {
      qb.orWhere(`item.productUuid = :pid${i}`, {
        [`pid${i}`]: details.items[i],
      });
    }
    qb.andWhere('cart._uuid = :cartId', { cartId: cart._uuid }).delete();
  }
}
