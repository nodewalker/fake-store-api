import { ReturnCreateUserDetails } from '../dto';
import { UserEntity } from '../typeorm';
import {
  CreateUserDetails,
  UpdateUserDetails,
  UpdateUserPasswordDetails,
} from '../types';

export interface IUserService {
  createUser(
    this: void,
    details: CreateUserDetails,
  ): Promise<ReturnCreateUserDetails>;
  findOne(this: void, loginOrUuid: string): Promise<UserEntity | null>;
  updateUser(
    this: void,
    userId: string,
    details: UpdateUserDetails,
  ): Promise<void>;
  updateUserPassword(
    this: void,
    userId: string,
    details: UpdateUserPasswordDetails,
  ): Promise<void>;
}
