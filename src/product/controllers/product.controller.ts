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
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import { Controllers, Services } from 'src/utils/const';
import {
  CreateProductDto,
  GetProductsDto,
  ProductDetails,
  ProductsListDetails,
} from 'src/utils/dto';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
import { IProductService } from 'src/utils/interfaces';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Product')
@Controller(Controllers.product)
export class ProductController {
  constructor(
    @Inject(Services.product) private readonly productServcie: IProductService,
  ) {}

  @ApiOperation({ summary: 'Get list of products' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Products recived',
    type: ProductsListDetails,
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
  async getProducts(@Query() dto: GetProductsDto) {
    return await this.productServcie.getProducts(dto);
  }

  @ApiOperation({ summary: 'Get product by id' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Product id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product recived',
    type: ProductDetails,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Check response message',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Server error',
  })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getOneById(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return plainToInstance(
      ProductDetails,
      this.productServcie.getProductById(id),
      { excludeExtraneousValues: true },
    );
  }

  @ApiOperation({ summary: 'Create product' })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Product created',
    type: ProductDetails,
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
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @Req() req: Request,
    @Body() dto: CreateProductDto,
    @UploadedFiles(new ParseFilePipe())
    images: Express.Multer.File[],
  ) {
    return await this.productServcie.createProduct(req.user._uuid, {
      ...dto,
      images: images.map((image) => image.filename),
    });
  }

  @ApiOperation({ summary: 'Remove product' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Product id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product removed',
  })
  @ApiResponse({
    status: '4XX',
    description: 'Check response message',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Server error',
  })
  @UseInterceptors(NoFilesInterceptor())
  @UseGuards(AuthGuard)
  @Delete('/:id')
  async removeProduct(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Res() res: Response,
  ) {
    await this.productServcie.removeProduct(id);
    return res.sendStatus(HttpStatus.OK);
  }
}
