import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import dayjs = require('dayjs');


type loginData = {
  login: string,
  password: string,
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
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
      refresh_token: await this.jwtService.signAsync({refresh: true }, {expiresIn: dayjs().add(15, 'day').unix()})
    };

    // console.log("AUTH.OK", user.);
    // send JWT
    // const user = this
    // return this.usersService.create(user);
  }

  async verify(token: string) {
    console.log(token);
    const payload = await this.jwtService.verifyAsync(
      token,
      {
        secret: jwtConstants.secret,
        ignoreExpiration: true,
      }
    );

    const {login} = payload;
 
    const user = await this.usersService.findByLogin(login);

    if(!user) {
      throw new UnauthorizedException();
    }

    // payload.expiresIn = date now + 60s

    return {
      access_token: await this.jwtService.signAsync({ login: user.login, sub: user.id, role: user.role }),
    };
  }
}
