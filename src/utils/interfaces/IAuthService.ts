import { CreateUserDetails, LoginDetails, Tokens, UserRequest } from '../types';

export interface IAuthService {
  signup(details: CreateUserDetails): Promise<Tokens>;
  signin(details: LoginDetails): Promise<Tokens>;
  verifyUser(access_token: string): Promise<UserRequest>;
  refreshTokens(refreshToken: string): Promise<Tokens>;
}
