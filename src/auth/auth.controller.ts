import { AuthService } from './auth.service';
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Payload } from '@src/types/payload';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authSerivce: AuthService
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  tempAuth() {
    return {
      auth: 'works'
    };
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
