import { hashPassword, verifyPassword } from './../../utils/security/password';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserService } from 'src/utils/interfaces/IUserService';
import { CartEntity, UserEntity } from 'src/utils/typeorm';
import {
  CreateUserDetails,
  ReturnUserDetails,
  UpdateUserDetails,
  UpdateUserPasswordDetails,
} from 'src/utils/types';
import { Repository } from 'typeorm';
import { validate } from 'uuid';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async createUser(details: CreateUserDetails): Promise<ReturnUserDetails> {
    try {
      const existUser: UserEntity | null = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email: details.email })
        .getOne();
      // TODO: password check
      if (existUser)
        throw new HttpException('Email already used', HttpStatus.BAD_REQUEST);

      const user: UserEntity = await this.userRepository.save({
        ...details,
        password: await hashPassword(details.password),
      });
      await this.cartRepository.save({ user });
      // TODO:
      return user as ReturnUserDetails;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(
    loginOrUuid: string,
    selectAll: boolean,
  ): Promise<UserEntity | ReturnUserDetails> {
    try {
      const qb = this.userRepository
        .createQueryBuilder('user')
        .where('user.login = :login', { login: loginOrUuid });
      if (validate(loginOrUuid))
        qb.orWhere('user._uuid = :uuid', { uuid: loginOrUuid });
      const user: UserEntity | null = await qb.getOne();
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...data } = user;
      return selectAll ? user : data;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(userId: string, details: UpdateUserDetails): Promise<void> {
    try {
      await this.userRepository.update(userId, details);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUserPassword(
    userId: string,
    details: UpdateUserPasswordDetails,
  ): Promise<void> {
    try {
      const user: UserEntity = (await this.findOne(userId, true)) as UserEntity;
      if (!(await verifyPassword(details.currentPassword, user.password)))
        throw new HttpException(
          'The old password is incorrect',
          HttpStatus.BAD_REQUEST,
        );

      if (details.currentPassword === details.newPassword)
        throw new HttpException(
          'The old and new passwords are the same',
          HttpStatus.BAD_REQUEST,
        );

      if (details.newPassword !== details.repeatNewPassword)
        throw new HttpException(
          'The new password repeat is incorrect',
          HttpStatus.BAD_REQUEST,
        );

      await this.userRepository.update(userId, {
        password: await hashPassword(details.newPassword),
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
