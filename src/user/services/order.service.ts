import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IOrderService } from 'src/utils/interfaces';
import { OrderEntity, OrderItemEntity } from 'src/utils/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderProductRepository: Repository<OrderItemEntity>,
  ) {}
}
