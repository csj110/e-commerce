import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '@src/types/product';
import { ProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().populate('owner', '-password');
  }

  async findOneById(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .populate('owner', '-password');
    if (!product) {
      throw new HttpException('no such a product', HttpStatus.NO_CONTENT);
    }
    return product;
  }

  async findByOwner(id) {
    const product = await this.productModel
      .find({ owner: id })
      .populate('owner', '-password');
    return product;
  }

  async create(prodcutDTO: ProductDTO, user): Promise<Product> {
    const product = await this.productModel.create({
      ...prodcutDTO,
      owner: user
    });
    await product.save();
    return  await this.productModel.findById(product._id).populate('owner', '-password');
  }

  async update(
    id: string,
    prodcutDTO: Partial<ProductDTO>,
    userid: string
  ): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new HttpException('no such a product', HttpStatus.BAD_REQUEST);
    }
    if (userid !== product.owner.toString()) {
      throw new HttpException(
        'no authorizaion to update',
        HttpStatus.UNAUTHORIZED
      );
    }
    await product.update(prodcutDTO);
    return await this.productModel.findById(id).populate('owner', '-password');
  }

  async delete(id: string, userid: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new HttpException('no product to delete', HttpStatus.BAD_REQUEST);
    }
    if (userid !== product.owner.toString()) {
      throw new HttpException(
        'no authorizaion to delete',
        HttpStatus.UNAUTHORIZED
      );
    }
    await product.remove();
    return product;
  }
}
