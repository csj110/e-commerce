import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '@src/types/order';
import { OrderDTO } from './order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) {}

  async listOrdersByUser(userId: string): Promise<any[]> {
    const orders = await this.orderModel.find({ owner: userId });
    return orders;
  }

  async createOrder(orderDTO: OrderDTO) {
    
  }
}
