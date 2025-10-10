import { CreateUserDetails, LoginDetails, Tokens } from '../types';

export interface IAuthService {
  signup(details: CreateUserDetails): Promise<Tokens>;
  signin(details: LoginDetails): Promise<Tokens>;
}
