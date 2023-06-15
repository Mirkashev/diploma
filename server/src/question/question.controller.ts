import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Question } from 'src/db/entities';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post(':test_id')
  createQuestion(@Param('test_id') testId: number, @Body() question: Question) {
    return this.questionService.create(testId, question);
  }

  // @Get(':test_id')
  // findQuestions(@Param('test_id') testId: number) {
  //   return this.questionService.findAll(testId);
  // }

  @Patch(':question_id')
  updateQuestion(@Param('question_id') questionId: number, @Body() question: Question) {
    return this.questionService.update(questionId, question);
  } 

  @Delete(':question_id')
  deleteQuestion(@Param('question_id') questionId: number) {
    return this.questionService.remove(questionId);
  }

  @Get('/answers/:question_id')
  findOneQuestion(@Param('question_id') questionId: number) {
    return this.questionService.findOne(questionId);
  }
}
