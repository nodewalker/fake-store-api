import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { IProductService } from 'src/utils/interfaces';
import { Services } from 'src/utils/const';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
import {
  MockCreateProductDto,
  MockCreateReview,
  MockGetProductsDto,
  MockProduct,
  MockProductList,
  MockReview,
  MockReviewsList,
  MockUpdateReview,
} from 'src/__mock__/MockProduct';
import { MockUserReq } from 'src/__mock__/MockUser';
import { MockFiles, MockPagintaionDto } from 'src/__mock__/MockUtils';
import { Response } from 'express';
import { IReviewService } from 'src/utils/interfaces/IReviewService';

describe('ProductController', () => {
  let controller: ProductController;
  const productService: IProductService = {
    getProducts: jest.fn().mockResolvedValue(MockProductList),
    getProductById: jest.fn().mockResolvedValue(MockProduct),
    createProduct: jest.fn().mockResolvedValue(MockProduct),
    removeProduct: jest.fn(),
  } as unknown as IProductService;
  const reviewService: IReviewService = {
    getProductsReviewByProductId: jest.fn().mockResolvedValue(MockReviewsList),
    createProductReview: jest.fn().mockResolvedValue(MockReview),
    updateProductReview: jest.fn(),
    removeProductReview: jest.fn(),
  } as unknown as IReviewService;

  const MockRes = {
    sendStatus: jest.fn().mockReturnThis(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        { provide: Services.product, useValue: productService },
        { provide: Services.review, useValue: reviewService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('products controller', () => {
    it('get products', async () => {
      const products = await controller.getProducts(MockGetProductsDto);
      expect(products).toEqual(MockProductList);
      expect(productService.getProducts).toHaveBeenCalledWith(
        MockGetProductsDto,
      );
    });

    it('get product by id', async () => {
      const products = await controller.getOneById('productid');
      expect(products).toEqual(MockProduct);
      expect(productService.getProductById).toHaveBeenCalledWith('productid');
    });

    it('create product', async () => {
      const products = await controller.createProduct(
        MockUserReq,
        MockCreateProductDto,
        MockFiles,
      );
      expect(products).toEqual(MockProduct);
      expect(productService.createProduct).toHaveBeenCalledWith(
        MockUserReq.user._uuid,
        {
          ...MockCreateProductDto,
          images: MockFiles.map((image) => image.filename),
        },
      );
    });

    it('remove product by id', async () => {
      await controller.removeProduct('productid', MockRes);
      expect(productService.removeProduct).toHaveBeenCalledWith('productid');
    });
  });

  describe('review controller', () => {
    it('get reviews by product id', async () => {
      const reviews = await controller.getProductReviews(
        MockPagintaionDto,
        'productid',
      );
      expect(reviews).toEqual(MockReviewsList);
      expect(reviewService.getProductsReviewByProductId).toHaveBeenCalledWith(
        MockPagintaionDto,
        'productid',
      );
    });
    it('create product review', async () => {
      const review = await controller.createProductReview(
        MockUserReq,
        'productid',
        MockCreateReview,
      );
      expect(review).toEqual(MockReview);
      expect(reviewService.createProductReview).toHaveBeenCalledWith({
        ...MockCreateReview,
        userId: MockUserReq.user._uuid,
        productId: 'productid',
      });
    });
    it('update product review', async () => {
      await controller.updateProductReview(
        MockUserReq,
        'productid',
        'reviewid',
        MockUpdateReview,
        MockRes,
      );
      expect(reviewService.updateProductReview).toHaveBeenCalledWith({
        ...MockUpdateReview,
        userId: MockUserReq.user._uuid,
        productId: 'productid',
        reviewId: 'reviewid',
      });
    });
    it('delete product review', async () => {
      await controller.DeleteProductReview(
        MockUserReq,
        'productid',
        'reviewid',
        MockRes,
      );
      expect(reviewService.removeProductReview).toHaveBeenCalledWith({
        userId: MockUserReq.user._uuid,
        productId: 'productid',
        reviewId: 'reviewid',
      });
    });
  });
});
