import { Logger, Module } from '@nestjs/common';
import { TheoryService } from './theory.service';
import { TheoryController } from './theory.controller';
import { Theory } from './entities/theory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Theory])],
  controllers: [TheoryController],
  providers: [TheoryService]
})
export class TheoryModule {
  private readonly logger = new Logger('TEST MODULE')
  constructor (){
    this.logger.log('init')
  }
}
