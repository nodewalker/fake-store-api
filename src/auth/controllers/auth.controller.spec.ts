import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { IAuthService } from 'src/utils/interfaces';
import { Services } from 'src/utils/const';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
import {
  MockAuthTokens,
  MockCreateUserDto,
  MockLoginDto,
} from 'src/__mock__/MockUser';

describe('AuthController', () => {
  let controller: AuthController;
  const authService: IAuthService = {
    signup: jest.fn().mockResolvedValue(MockAuthTokens),
    signin: jest.fn().mockResolvedValue(MockAuthTokens),
    refreshTokens: jest.fn().mockResolvedValue(MockAuthTokens),
  } as unknown as IAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: Services.auth, useValue: authService }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('signup', async () => {
    const tokens = await controller.signup(MockCreateUserDto);
    expect(tokens).toEqual(MockAuthTokens);
    expect(authService.signup).toHaveBeenCalledWith(MockCreateUserDto);
  });

  it('signin', async () => {
    const tokens = await controller.signin(MockLoginDto);
    expect(tokens).toEqual(MockAuthTokens);
    expect(authService.signin).toHaveBeenCalledWith(MockLoginDto);
  });

  it('refresh token', async () => {
    const tokens = await controller.refresh('refresh token');
    expect(tokens).toEqual(MockAuthTokens);
    expect(authService.refreshTokens).toHaveBeenCalledWith('refresh token');
  });
});
