import { PaginationDetails, PaginationQueryDto } from 'src/utils/dto';

export const MockPagintaionDto: PaginationQueryDto = {
  limit: 10,
  page: 1,
};

export const MockPaginationDetails: PaginationDetails = {
  total: 1,
  page: 1,
  limit: 10,
  totalPages: 1,
  isLastPage: true,
};

export const MockFiles: Express.Multer.File[] = [
  {
    originalname: 'file1.png',
    buffer: Buffer.from('abc'),
    mimetype: 'image/png',
    fieldname: 'images',
    size: 123,
    encoding: '7bit',
    destination: '',
    filename: '',
    path: '',
    stream: null as any,
  },
];
