import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { User } from '@src/utilities/user.decorator';
import { OrderDTO } from './order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/all')
  @UseGuards(AuthGuard('jwt'))
  async getMyOrder(@User('id') userId: string) {
    return await this.orderService.listByUser(userId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createOrder(@User('id') userId: string, @Body() orderDTO: OrderDTO) {
    return await this.orderService.create(userId, orderDTO);
  }
}
