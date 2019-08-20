import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../types/user';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDTO, LoginDTO } from '../auth/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  private sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async create(userDTO: RegisterDTO) {
    const { username } = userDTO;
    let user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException(
        'username already been used',
        HttpStatus.BAD_REQUEST
      );
    }
    user = new this.userModel(userDTO);
    await user.save();
    return this.sanitizeUser(user);
  }

  async findByLogin(userDTO: LoginDTO) {
    const { username, password } = userDTO;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException('no such a user', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload(payload: any) {
    const { username } = payload;
    return await this.userModel.findOne({ username });
  }
}
