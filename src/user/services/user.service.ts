import { hashPassword, verifyPassword } from './../../utils/security/password';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ReturnCreateUserDetails } from 'src/utils/dto';
import { IUserService } from 'src/utils/interfaces/IUserService';
import { UserCartEntity, UserEntity } from 'src/utils/typeorm';
import {
  CreateUserDetails,
  UpdateUserDetails,
  UpdateUserPasswordDetails,
} from 'src/utils/types';
import { Repository } from 'typeorm';
import { validate as UUIDValidate } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserCartEntity)
    private readonly cartRepository: Repository<UserCartEntity>,
  ) {}

  async createUser(
    details: CreateUserDetails,
  ): Promise<ReturnCreateUserDetails> {
    const existUser: UserEntity | null = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: details.email })
      .orWhere('user.login = :login', { login: details.login })
      .getOne();
    if (existUser)
      if (existUser.email == details.email && existUser.login === details.login)
        throw new HttpException(
          'Login and email already used',
          HttpStatus.BAD_REQUEST,
        );
      else if (existUser.email === details.email)
        throw new HttpException('Email already used', HttpStatus.BAD_REQUEST);
      else if (existUser.login === details.login)
        throw new HttpException('Login already used', HttpStatus.BAD_REQUEST);

    const user: UserEntity = await this.userRepository.save({
      ...details,
      password: await hashPassword(details.password),
    });
    await this.cartRepository.save({ user });
    return plainToInstance(ReturnCreateUserDetails, user, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(loginOrUuid: string): Promise<UserEntity | null> {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .where('user.login = :login', { login: loginOrUuid });
    if (UUIDValidate(loginOrUuid))
      qb.orWhere('user._uuid = :uuid', { uuid: loginOrUuid });
    const user: UserEntity | null = await qb.getOne();
    return user;
  }

  async updateUser(userId: string, details: UpdateUserDetails): Promise<void> {
    const a = Object.values(details).filter((d) => d === undefined);
    if (a.length === Object.values(details).length)
      throw new HttpException('Empty data', HttpStatus.BAD_REQUEST);
    if (details?.avatarURL) {
      const user: UserEntity | null = await this.userRepository
        .createQueryBuilder('user')
        .where('user._uuid = :uuid', { uuid: userId })
        .select('user.avatarURL')
        .getOne();
      fs.unlink(`./uploads/avatars/${user?.avatarURL}`, (res) => {
        console.log(res);
      });
    }
    await this.userRepository.update(userId, details);
  }

  async updateUserPassword(
    userId: string,
    details: UpdateUserPasswordDetails,
  ): Promise<void> {
    const user: UserEntity | null = await this.findOne(userId);
    if (!user?._uuid)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
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
  }
}
