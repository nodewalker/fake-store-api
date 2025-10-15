import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = CustomValidationPipe.formatErrors(errors);
        return new BadRequestException(messages);
      },
    });
  }

  private static formatErrors(errors: ValidationError[]): string[] {
    const result: string[] = [];

    for (const error of errors) {
      if (error.constraints) {
        result.push(...Object.values(error.constraints));
      }

      if (error.children && error.children.length > 0) {
        result.push(...this.formatErrors(error.children));
      }
    }

    return result;
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await super.transform(value, metadata);
    } catch (error) {
      if (error instanceof BadRequestException) {
        const response: any = error.getResponse();
        throw new HttpException(
          Array.isArray(response.message)
            ? (response.message as string)
            : [response.message],
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }
}
