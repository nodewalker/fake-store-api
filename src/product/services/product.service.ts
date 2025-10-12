import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductService } from 'src/utils/interfaces/IProductService';
import { ProductEntity, ProductImageEntity } from 'src/utils/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductImageEntity)
    private readonly productImageEntity: Repository<ProductImageEntity>,
  ) {}
}
