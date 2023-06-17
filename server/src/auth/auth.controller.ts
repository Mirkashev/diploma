import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.route.decorator';
import { Refresh } from 'src/decorators/verify.route.decorator';


type loginData = {
  login: string,
  password: string,
}

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

  @HttpCode(HttpStatus.OK)
  @Refresh()
  @Post('refresh')
  async refresh(@Body() expiredToken: any){
    console.log('refresh');
    const refreshedToken = await this.authService.verify(expiredToken.access_token);
    return refreshedToken;
  }
}
