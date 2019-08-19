import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from 'src/shared/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Get()
  @Post('login')
  async login(@Body() user: LoginDTO) {
    return await this.userService.findByLogin(user);
  }

  @Post('register')
  async register(@Body() user: RegisterDTO) {
    return await this.userService.create(user);
  }
}
