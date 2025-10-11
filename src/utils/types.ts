// AUTH
export type LoginDetails = {
  login: string;
  password: string;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type JWTPayload = {
  sub: string;
};

// USER
export type CreateUserDetails = {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
};

export type ReturnUserDetails = {
  _uuid: string;
  firstName: string;
  lastName: string;
  login: string;
  avatarURL: string;
};
