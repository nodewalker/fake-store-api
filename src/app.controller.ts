import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get('/health')
  isStart(@Res() res: Response) {
    return res.sendStatus(HttpStatus.OK);
  }
}
