import {
  CreateUserDetails,
  LoginDetails,
  ReturnUserDetails,
  Tokens,
} from '../types';

export interface IAuthService {
  signup(details: CreateUserDetails): Promise<Tokens>;
  signin(details: LoginDetails): Promise<Tokens>;
  verifyUser(access_token: string): Promise<ReturnUserDetails>;
  refreshTokens(refreshToken: string): Promise<Tokens>;
}
