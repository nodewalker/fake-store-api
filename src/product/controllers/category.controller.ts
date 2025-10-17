import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Controllers, Services } from 'src/utils/const';
import {
  CategoryDetails,
  CreateCategoryDto,
  PaginationQueryDto,
  RootCategoriesDetail,
} from 'src/utils/dto';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
import { ICategoryService } from 'src/utils/interfaces';

@ApiTags('Category')
@Controller(Controllers.category)
export class CategoryController {
  constructor(
    @Inject(Services.category)
    private readonly categoryServcie: ICategoryService,
  ) {}

  @ApiOperation({ summary: 'Create category' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Category created',
  })
  @ApiResponse({
    status: '4XX',
    description: 'Check response message',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Server error',
  })
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

  @ApiOperation({ summary: 'Get root categories' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Root categories received',
    type: RootCategoriesDetail,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Check response message',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Server error',
  })
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getRootCategories(
    @Query()
    dto: PaginationQueryDto,
  ) {
    return await this.categoryServcie.getRootCategories(dto);
  }

  @ApiOperation({ summary: 'Get subcategories' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Parent category id',
  })
  @ApiQuery({
    name: 'all',
    required: false,
    default: false,
    type: Boolean,
    description:
      'Retrieve all subcategories at all levels, or just the current one.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Subcategories received',
    isArray: true,
    type: CategoryDetails,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Check response message',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Server error',
  })
  @Get('/:id/children')
  @HttpCode(HttpStatus.OK)
  async getChildrenByParentId(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Query('all') getAllSubcategories: boolean,
  ) {
    const res = await this.categoryServcie.getChildrenByParentId(
      id,
      getAllSubcategories,
    );
    // TODO:
    if (!res.length)
      throw new HttpException('Categories not found', HttpStatus.NOT_FOUND);
    return res;
  }

  @ApiOperation({ summary: 'Remove category by id' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Category id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category deleted',
  })
  @ApiResponse({
    status: '4XX',
    description: 'Check response message',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Server error',
  })
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
