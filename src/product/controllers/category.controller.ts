import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Controllers, Services } from 'src/utils/const';
import { CreateCategoryDto, PaginationQueryDto } from 'src/utils/dto';
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
    return res.status(200).send();
  }

  // TODO: query dto
  @Get('/all')
  async getAllCategories(
    @Query()
    dto: PaginationQueryDto,
  ) {
    return await this.categoryServcie.getAllCategories(dto);
  }
}
