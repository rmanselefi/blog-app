/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('login')
  async login(@Body() user: User) {
    const res = await this.authservice.login(user);
    return res;
  }

  @Post('register')
  register(@Body() user: User) {
    return this.authservice.registerUser(user);
  }
}
