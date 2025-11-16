import { CreateUserDetails, LoginDetails, Tokens, UserRequest } from '../types';

export interface IAuthService {
  signup(this: void, details: CreateUserDetails): Promise<Tokens>;
  signin(this: void, details: LoginDetails): Promise<Tokens>;
  verifyUser(this: void, access_token: string): Promise<UserRequest>;
  refreshTokens(this: void, refreshToken: string): Promise<Tokens>;
}
