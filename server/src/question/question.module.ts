import { Logger, Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { AnswerModule } from 'src/answer/answer.module';
import { Answer } from 'src/db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer])],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule {
  private readonly logger = new Logger('QUESTION MODULE')
  constructor (){
    this.logger.log('init')
  }
}
