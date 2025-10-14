import { ReturnCreateUserDetails } from '../dto';
import { UserEntity } from '../typeorm';
import {
  CreateUserDetails,
  UpdateUserDetails,
  UpdateUserPasswordDetails,
} from '../types';

export interface IUserService {
  createUser(details: CreateUserDetails): Promise<ReturnCreateUserDetails>;
  findOne(loginOrUuid: string): Promise<UserEntity | null>;
  updateUser(userId: string, details: UpdateUserDetails): Promise<void>;
  updateUserPassword(
    userId: string,
    details: UpdateUserPasswordDetails,
  ): Promise<void>;
}
