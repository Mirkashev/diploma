import { Logger, Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { TestModule } from 'src/test/test.module';
import { Result } from './entities/result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ResultController],
  providers: [ResultService],
  imports: [TestModule, TypeOrmModule.forFeature([Result])]
})
export class ResultModule {
  private readonly logger = new Logger('RESULT MODULE')
  constructor (){
    this.logger.log('init')
  }
}
