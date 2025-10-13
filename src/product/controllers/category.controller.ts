import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Controllers, Services } from 'src/utils/const';
import { CreateCategoryDto } from 'src/utils/dto';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
import { ICategoryService } from 'src/utils/interfaces';

@Controller(Controllers.category)
export class CategoryController {
  constructor(
    @Inject(Services.category)
    private readonly categoryServcie: ICategoryService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async createCategory(
    @Req() req: Request,
    @Body() dto: CreateCategoryDto,
    @Res() res: Response,
  ) {
    await this.categoryServcie.createCategory(req.user._uuid, dto);
    res.status(200).send();
  }

  // TODO: query dto
  @Get('/all')
  async getAllCategories(
    @Query('c')
    categoryName: string,
    @Query(
      'l',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        optional: true,
      }),
    )
    limit: number = 25,
    @Query(
      'p',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        optional: true,
      }),
    )
    page: number = 1,
  ) {
    if (!categoryName?.trim()) {
      throw new HttpException(
        'Category must not be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.categoryServcie.getAllCategories(
      categoryName,
      limit,
      page,
    );
  }
}
