import { UserEntity } from '../typeorm';
import {
  CreateUserDetails,
  ReturnUserDetails,
  UpdateUserDetails,
  UpdateUserPasswordDetails,
} from '../types';

export interface IUserService {
  createUser(details: CreateUserDetails): Promise<ReturnUserDetails>;
  findOne(
    loginOrUuid: string,
    selectAll: boolean,
  ): Promise<UserEntity | ReturnUserDetails>;
  updateUser(userId: string, details: UpdateUserDetails): Promise<void>;
  updateUserPassword(
    userId: string,
    details: UpdateUserPasswordDetails,
  ): Promise<void>;
}
