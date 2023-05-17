import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginData } from './auth.types';
import { Public } from 'src/decorators/public.route.decorator';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body() loginData: loginData) {
    const token = await this.authService.signIn(loginData);
    return token;
  }
}
