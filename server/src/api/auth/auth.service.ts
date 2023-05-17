import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginData } from './auth.types';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  async signIn(loginData: loginData){
    const {login, password} = loginData;
 
    const user = await this.usersService.findByLogin(login);

    if(user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { login: user.login, sub: user.id, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };

    // console.log("AUTH.OK", user.);
    // send JWT
    // const user = this
    // return this.usersService.create(user);
  }
}
