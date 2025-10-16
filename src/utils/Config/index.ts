import type { StringValue } from 'ms';
import { config } from 'dotenv';

config({
  path: process.env?.NODE_ENV
    ? `.env.${process.env.NODE_ENV.trim()}`
    : '.env.dev',
});

export const Config = {
  SERVER: {
    PORT: Number(process.env['PORT']),
  },
  DATABASE: {
    HOST: process.env['DATABASE_HOST'] as string,
    PORT: Number(process.env['DATABASE_PORT']),
    USERNAME: process.env['DATABASE_USER'] as string,
    PASSWORD: process.env['DATABASE_PASSWORD'] as string,
    NAME: process.env['DATABASE_NAME'] as string,
  },
  JWT: {
    SECRET: process.env['JWT_SECRET'] as string,
    ACCESS_TOKEN_EXPIRES: '20m' as StringValue,
    REFRESH_TOKEN_EXPIRES: '30d' as StringValue,
  },
  CATEGORY: {
    MAX_CHILDREN: 8,
    MAX_DEEP: 4,
  },
  CART: {
    SIZE: 50,
  },
};
