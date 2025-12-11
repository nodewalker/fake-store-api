import {
  CartDetails,
  CreateUserDto,
  LoginDto,
  ReturnUserProfileDetails,
  CartItemsDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from 'src/utils/dto';
import { Request } from 'express';
import { MockCartProduct } from './MockProduct';
import { Tokens } from 'src/utils/types';

export const MockUserReq = {
  user: { _uuid: 1 },
} as unknown as Request;

export const MockUser: ReturnUserProfileDetails = {
  _uuid: '17a54659-a06a-464f-a914-190cee7d4b1a',
  firstName: 'mock',
  lastName: 'user',
  login: 'mock_user',
  email: 'mock@user.test',
  avatarURL: '17a54659-a06a-464f-a914-190cee7d4b1a.test',
};

export const MockUserUpdateDto: UpdateUserDto = {
  firstName: 'mock',
  lastName: 'user',
  login: 'mock_user',
  email: 'mock@user.test',
  avatar: '17a54659-a06a-464f-a914-190cee7d4b1a.test',
};

export const MockUserUpdatePasswordDto: UpdateUserPasswordDto = {
  currentPassword: '123456',
  newPassword: '1234567890',
  repeatNewPassword: '1234567890',
};

// AUTH
export const MockCreateUserDto: CreateUserDto = {
  firstName: 'mock',
  lastName: 'user',
  login: 'mock_user',
  email: 'mock@user.test',
  password: '123456',
};

export const MockAuthTokens: Tokens = {
  access_token: 'access token',
  refresh_token: 'refresh token',
};

export const MockLoginDto: LoginDto = {
  login: 'mock_user',
  password: '123456',
};

// CART
export const MockUserCart: CartDetails = {
  _uuid: '17a54659-a06a-464f-a914-190cee7d4b1a',
  products: [MockCartProduct],
};

export const MockUserCartSelectedProduct: CartItemsDto = {
  items: ['id', 'id'],
};
