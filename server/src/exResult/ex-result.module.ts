import { Logger, Module } from '@nestjs/common';
import { ExResultService } from './ex-result.service';
import { ExResultController } from './ex-result.controller';
import { ExResult } from './entities/ex-result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ExResultController],
  providers: [ExResultService],
  imports: [ TypeOrmModule.forFeature([ExResult])]
})
export class ExResultModule {
  private readonly logger = new Logger('EXRESULT MODULE')
  constructor (){
    this.logger.log('init')
  }
}
