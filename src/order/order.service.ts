import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '@src/types/order';
import { OrderDTO } from './order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) {}

  async listByUser(userId: string): Promise<any[]> {
    const orders = await this.orderModel
      .find({ owner: userId })
      .populate('products.product');
    return orders;
  }

  async create(userId: string, orderDTO: OrderDTO) {
    let order = await this.orderModel.create({
      ...orderDTO,
      owner: userId
    });
    await order.save();
    order = await this.orderModel
      .findById(order._id)
      .populate('products.product')
      .populate('owner', 'username');
    const totalPrice = order.products.reduce(
      (acc, product) => acc + product.product.price * product.quantity,
      0
    );
    await order.update({ totalPrice }).exec();
    return order;
  }
}
