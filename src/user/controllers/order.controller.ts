import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Controllers, Services } from 'src/utils/const';
import { IOrderService } from 'src/utils/interfaces';

@ApiTags('Order')
@Controller(Controllers.order)
export class OrderController {
  constructor(
    @Inject(Services.order) private readonly orderService: IOrderService,
  ) {}
}
