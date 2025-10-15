import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
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
    return res.sendStatus(HttpStatus.CREATED);
  }

  @Get('/')
  async getRootCategories(
    @Query()
    dto: PaginationQueryDto,
  ) {
    return await this.categoryServcie.getRootCategories(dto);
  }

  @Get('/:id/children')
  async getChildrenByParentId(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return await this.categoryServcie.getChildrenByParentId(id);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async removeCategory(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Res() res: Response,
    @Query('all') all?: boolean,
  ) {
    await this.categoryServcie.removeCategory(id, all ? all : false);
    return res.sendStatus(HttpStatus.OK);
  }
}
