import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import { Controllers, Services } from 'src/utils/const';
import {
  CreateProductDto,
  GetProductsDto,
  PaginationQueryDto,
} from 'src/utils/dto';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
import { IProductService } from 'src/utils/interfaces';

@Controller(Controllers.product)
export class ProductController {
  constructor(
    @Inject(Services.product) private readonly productServcie: IProductService,
  ) {}

  // TEST: TRY TO SORT
  @Get('/')
  async getProducts(
    @Query() paginationDto: PaginationQueryDto,
    @Query() dto: GetProductsDto,
  ) {
    return await this.productServcie.getProducts({ ...dto, ...paginationDto });
  }

  @Get('/:id')
  getOneById(@Param('id', new ParseIntPipe()) id: string) {
    return this.productServcie.getProductById(id);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(
    FilesInterceptor('images', 3, {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const sanitized = file.originalname
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9._-]/g, '');
          callback(null, `${uniqueSuffix}-${sanitized}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10mb
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/^image\/(jpg|jpeg|png|webp)$/)) {
          return callback(
            new HttpException(
              'You can upload only images',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  @Post('/')
  async createProduct(
    @Req() req: Request,
    @Body() dto: CreateProductDto,
    @UploadedFiles(
      new ParseFilePipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    images: Express.Multer.File[],
  ) {
    console.log(images);
    return await this.productServcie.createProduct(req.user._uuid, {
      ...dto,
      images: images.map((image) => image.filename),
    });
  }
}
