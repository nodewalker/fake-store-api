import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('')
export class AppController {
  @Get('/')
  get(@Res() res: Response) {
    return res.status(200).json({
      docs: 'gitbook: docs.fakestoreapi.ru || swagger: fakestoreapi.ru/api',
      github: 'https://github.com/nodewalker/fake-store-api',
    });
  }
}
