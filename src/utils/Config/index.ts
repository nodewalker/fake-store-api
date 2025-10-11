import type { StringValue } from 'ms';
import { config } from 'dotenv';

config({ path: '.env.dev' });

export const Config = {
  SERVER: {
    PORT: Number(process.env['PORT']),
  },
  DATABASE: {
    HOST: process.env['DB_HOST'] as string,
    PORT: Number(process.env['DB_PORT']),
    USERNAME: process.env['DB_USERNAME'] as string,
    PASSWORD: process.env['DB_PASSWORD'] as string,
    NAME: process.env['DB_NAME'] as string,
  },
  JWT: {
    SECRET: process.env['JWT_SECRET'] as string,
    ACCESS_TOKEN_EXPIRES: '20m' as StringValue,
    REFRESH_TOKEN_EXPIRES: '30d' as StringValue,
  },
};
