import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
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

  @Get('/')
  async getRootCategories(
    @Query()
    dto: PaginationQueryDto,
  ) {
    // TODO: undefined dto
    console.log(dto);
    return await this.categoryServcie.getRootCategories(dto);
  }

  @Get('/:uuid/children')
  async getChildrenByParentId(@Param('uuid') uuid: string) {
    return await this.categoryServcie.getChildrenByParentId(uuid);
  }
}
