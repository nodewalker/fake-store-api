import { hashPassword } from './../../utils/security/password';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserService } from 'src/utils/interfaces/IUserService';
import { UserEntity } from 'src/utils/typeorm';
import { CreateUserDetails, ReturnUserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(details: CreateUserDetails): Promise<ReturnUserDetails> {
    try {
      const existUser: UserEntity | null = await this.userRepository.findOne({
        where: { email: details.email },
      });

      // TODO: password check
      if (existUser) {
        throw new HttpException('Email already used', HttpStatus.BAD_REQUEST);
      }

      const user: UserEntity = await this.userRepository.save({
        ...details,
        password: await hashPassword(details.password),
      });
      // TODO:
      return user as ReturnUserDetails;
    } catch (error) {
      throw new HttpException(
        error as string,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(login: string): Promise<UserEntity> {
    const user: UserEntity | null = await this.userRepository.findOne({
      where: { login },
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
