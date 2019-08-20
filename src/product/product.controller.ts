import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Body,
  Param,
  UseGuards
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './product.dto';
import { AuthGuard } from '@nestjs/passport';
import { SellerGuard } from '@src/shared/seller.guard';
import { User } from '@src/utilities/user.decorator';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('all')
  async listAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async read(@Param('id') id: string) {
    return this.productService.findOneById(id);
  }

  @Get('/mine')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async listByOwner(@User('id') userid) {
    return await this.productService.findByOwner(userid);
  }

  @Get('/seller/:id')
  async listBySeller(@Param('id') id: string) {
    return this.productService.findByOwner(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async create(@Body() productDTO: ProductDTO, @User() user) {
    return this.productService.create(productDTO, user);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async update(
    @Param('id') id: string,
    @Body() productUpdateDTO: Partial<ProductDTO>,
    @User('id') userid: string
  ) {
    return this.productService.update(id, productUpdateDTO, userid);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async destroy(@Param('id') id: string, @User('id') userid: string) {
    return this.productService.delete(id, userid);
  }
}
