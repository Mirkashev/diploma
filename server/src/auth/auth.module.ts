import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard
    },
    UserService
  ],
    imports:[UserModule, TypeOrmModule.forFeature([User])]
})
export class AuthModule {
  private readonly logger = new Logger('AUTH MODULE')
  constructor (){
    this.logger.log('init')
  }
} 
