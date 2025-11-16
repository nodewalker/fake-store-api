import {
  CategoryDetails,
  CreateCategoryDto,
  RootCategoriesDetail,
} from 'src/utils/dto';
import { MockPaginationDetails } from './MockUtils';

export const MockCategory: CategoryDetails = {
  _uuid: 'category id',
  name: 'category name',
  hasChildren: false,
  hasProduct: false,
};

export const MockCreateCategory: CreateCategoryDto = {
  name: 'category name',
  parentId: 'parent category id',
};

export const MockRootCategoryDetails: RootCategoriesDetail = {
  tree: [MockCategory],
  pagination: MockPaginationDetails,
};
