import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { Services } from 'src/utils/const';
import { ICartService, IUserService } from 'src/utils/interfaces';
import {
  MockUser,
  MockUserCart,
  MockUserCartSelectedProduct,
  MockUserReq,
  MockUserUpdateDto,
  MockUserUpdatePasswordDto,
} from 'src/__mock__/MockUser';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
import { Response } from 'express';
import { MockPagintaionDto } from 'src/__mock__/MockUtils';

describe('UserController', () => {
  let controller: UserController;
  const userService: IUserService = {
    findOne: jest.fn().mockResolvedValue(MockUser),
    updateUser: jest.fn(),
    updateUserPassword: jest.fn(),
  } as unknown as IUserService;

  const cartService: ICartService = {
    getUserCart: jest.fn().mockResolvedValue(MockUserCart),
    addProductToUserCart: jest.fn(),
    removeProductFromUserCart: jest.fn(),
  } as unknown as ICartService;

  const mockRes = {
    sendStatus: jest.fn().mockReturnThis(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: Services.user,
          useValue: userService,
        },
        {
          provide: Services.cart,
          useValue: cartService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('User controller', () => {
    it('get user profile', async () => {
      const userProfile = await controller.getUserProfile(MockUserReq);
      expect(userProfile).toEqual(MockUser);
      expect(userService.findOne).toHaveBeenCalledWith(MockUserReq.user._uuid);
    });

    it('update user profile', async () => {
      await controller.updateUser(MockUserReq, MockUserUpdateDto, mockRes);
      expect(userService.updateUser).toHaveBeenCalledWith(
        MockUserReq.user._uuid,
        MockUserUpdateDto,
      );
    });

    it('update user password', async () => {
      await controller.updateUserPassword(
        MockUserReq,
        MockUserUpdatePasswordDto,
        mockRes,
      );
      expect(userService.updateUserPassword).toHaveBeenCalledWith(
        MockUserReq.user._uuid,
        MockUserUpdatePasswordDto,
      );
    });
  });

  describe('Cart controller', () => {
    it('get user cart', async () => {
      const userCart = await controller.getCart(MockPagintaionDto, MockUserReq);
      expect(userCart).toEqual(MockUserCart);
      expect(cartService.getUserCart).toHaveBeenCalledWith(
        MockUserReq.user._uuid,
        MockPagintaionDto,
      );
    });

    it('add product to cart', async () => {
      await controller.addProductToUserCart(MockUserReq, 'productid', mockRes);
      expect(cartService.addProductToUserCart).toHaveBeenCalledWith(
        MockUserReq.user._uuid,
        'productid',
      );
    });

    it('remove product from cart', async () => {
      await controller.removeProductFromCart(
        MockUserReq,
        MockUserCartSelectedProduct,
        mockRes,
      );
      expect(cartService.removeProductFromUserCart).toHaveBeenCalledWith(
        MockUserReq.user._uuid,
        MockUserCartSelectedProduct,
      );
    });
  });
});
