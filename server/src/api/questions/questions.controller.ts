import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from 'src/db/entities';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post(':test_id')
  createQuestion(@Param('test_id') testId: number, @Body() question: Question) {
    return this.questionsService.create(testId, question);
  }

  // @Get(':test_id')
  // findQuestions(@Param('test_id') testId: number) {
  //   return this.questionsService.findAll(testId);
  // }

  @Patch(':question_id')
  updateQuestion(@Param('question_id') questionId: number, @Body() question: Question) {
    return this.questionsService.update(questionId, question);
  }

  @Delete(':question_id')
  deleteQuestion(@Param('question_id') questionId: number) {
    return this.questionsService.remove(questionId);
  }

  @Get('/answers/:question_id')
  findOneQuestion(@Param('question_id') questionId: number) {
    return this.questionsService.findOne(questionId);
  }
}
