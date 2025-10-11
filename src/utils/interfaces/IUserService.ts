import { UserEntity } from '../typeorm';
import { CreateUserDetails, ReturnUserDetails } from '../types';

export interface IUserService {
  createUser(details: CreateUserDetails): Promise<ReturnUserDetails>;
  findOne(
    login: string,
    selectAll: boolean,
  ): Promise<UserEntity | ReturnUserDetails>;
}
