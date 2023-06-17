import { Logger, Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';

@Module({
  imports: [TestModule, TypeOrmModule.forFeature([Test])],
  controllers: [TestController],
  providers: [TestService],
  exports:[TestService]
})
export class TestModule {
  private readonly logger = new Logger('TEST MODULE')
  constructor (){
    this.logger.log('init')
  }
}
