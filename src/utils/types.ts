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

export type UserRequest = {
  _uuid: string;
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

export type UpdateUserDetails = {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  avatarURL: string;
};

export type UpdateUserPasswordDetails = {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};
