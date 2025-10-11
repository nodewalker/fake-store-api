import { HttpException, HttpStatus } from '@nestjs/common';
import { getRandomValues } from 'crypto';
import { argon2id, argon2Verify } from 'hash-wasm';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = new Uint8Array(16);
    getRandomValues(salt);
    return await argon2id({
      password,
      salt,
      parallelism: 1,
      iterations: 256,
      memorySize: 512,
      hashLength: 32,
      outputType: 'encoded',
    });
  } catch (error) {
    throw new HttpException(error as string, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await argon2Verify({
    password,
    hash,
  });
};
