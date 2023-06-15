import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
// import { AnswerService } from './answer.service';
// import { AnswerController } from './answer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  // controllers: [AnswerController],
  // providers: [AnswerService]
})
export class AnswerModule {
  private readonly logger = new Logger('ANSW MODULE')
  constructor (){
    this.logger.log('init')
  }
}
