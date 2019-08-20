import { AuthService } from './auth.service';
import { Controller, Post, Body, Get, UseGuards, Logger } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Payload } from '@src/types/payload';
import { User } from '@src/utilities/user.decorator';
import { SellerGuard } from '@src/shared/seller.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authSerivce: AuthService
  ) {}

  // TODO used for test will be deleted
  @Get()
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  tempAuth(@User() user) {
    return user;
  }

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload: Payload = {
      username: user.username,
      seller: user.seller
    };
    const token = await this.authSerivce.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    const payload: Payload = {
      username: user.username,
      seller: user.seller
    };
    const token = await this.authSerivce.signPayload(payload);
    return { user, token };
  }
}
