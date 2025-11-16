import { Test, TestingModule } from '@nestjs/testing';
import { ICategoryService } from 'src/utils/interfaces';
import { Services } from 'src/utils/const';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
import { MockUserReq } from 'src/__mock__/MockUser';
import { Response } from 'express';
import { CategoryController } from './category.controller';
import {
  MockCategory,
  MockCreateCategory,
  MockRootCategoryDetails,
} from 'src/__mock__/MockCategory';
import { MockPagintaionDto } from 'src/__mock__/MockUtils';

describe('CategoryController', () => {
  let controller: CategoryController;
  const categoryService: ICategoryService = {
    createCategory: jest.fn(),
    getRootCategories: jest.fn().mockResolvedValue(MockRootCategoryDetails),
    getChildrenByParentId: jest.fn().mockResolvedValue([MockCategory]),
    removeCategory: jest.fn(),
  } as unknown as ICategoryService;

  const MockRes = {
    sendStatus: jest.fn().mockReturnThis(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [{ provide: Services.category, useValue: categoryService }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('category controller', () => {
    it('create category', async () => {
      await controller.createCategory(MockUserReq, MockCreateCategory, MockRes);
      expect(categoryService.createCategory).toHaveBeenCalledWith(
        MockUserReq.user._uuid,
        MockCreateCategory,
      );
    });
    it('get root categories', async () => {
      const categories = await controller.getRootCategories(MockPagintaionDto);
      expect(categories).toEqual(MockRootCategoryDetails);
      expect(categoryService.getRootCategories).toHaveBeenCalledWith(
        MockPagintaionDto,
      );
    });
    it('get subcategories', async () => {
      const categories = await controller.getChildrenByParentId(
        'categoryid',
        true,
      );
      expect(categories).toEqual([MockCategory]);
      expect(categoryService.getChildrenByParentId).toHaveBeenCalledWith(
        'categoryid',
        true,
      );
    });
    it('remove category', async () => {
      await controller.removeCategory('categoryid', MockRes, true);
      expect(categoryService.removeCategory).toHaveBeenCalledWith(
        'categoryid',
        true,
      );
    });
  });
});
