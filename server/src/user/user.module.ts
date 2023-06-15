import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule implements OnModuleInit{
  private readonly logger = new Logger('USER MODULE')
  constructor (
    private readonly userService: UserService,
  ){
    this.logger.log('init')
  }

  onModuleInit() {
    // this.userService.create({
    //   login: "Admin",
    
    //   password: 'dvzz3uwu',
  
    //   firstName: 'Ilnaz',

    //   lastName: 'Lenarovich',

    //   surname: 'Mirkashev',
    // })
  }
}
