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
};
