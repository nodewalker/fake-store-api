import type { StringValue } from 'ms';

export const Config = () => {
  const a = {
    port: Number(process.env['PORT']),

    db_host: process.env['DATABASE_HOST'] as string,
    db_port: Number(process.env['DATABASE_PORT']),
    db_user: process.env['DATABASE_USER'] as string,
    db_password: process.env['DATABASE_PASSWORD'] as string,
    db_name: process.env['DATABASE_NAME'] as string,

    jwt_secret: process.env['JWT_SECRET'] as string,
    access_token_expires: '20m' as StringValue,
    refresh_token_expires: '30d' as StringValue,

    category_max_children: 8,
    category_max_deep: 4,

    cart_max_size: 50,
  };
  console.log(a);
  return a;
};
