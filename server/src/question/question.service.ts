import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { Answer } from 'src/answer/entities/answer.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question) private readonly repo: Repository<Question>,
    @InjectRepository(Answer) private readonly answersRepo: Repository<Answer>,
  ){}

  async create(testId: number, question: Question) {
    question.testId = testId;
    return await this.repo.save(question);
  }

  async findAll(testId: number) {
    return await this.repo.find({
      where:{ testId: testId }, 
      relations: { test: true }, 
      select:{ test: { title: true } }
    })
  }

  async update(questionId: number, question: Question) {
    let loadedQuestion = await this.repo.preload(await this.repo.findOne({where: {id: questionId}, relations:{answers:true}}));

    if(loadedQuestion) {

      await this.answersRepo.remove(await this.answersRepo.find({where:{questionId: questionId}}));
      
      loadedQuestion = {
        ...loadedQuestion,
        title: question.title,
        answers: question.answers,
      }
      return await this.repo.save(loadedQuestion);
    }
  }

  async remove(questionId: number) {
    return this.repo.softRemove(await this.repo.findOne({where: {id: questionId}, relations:['answers']}));
  }

  async findOne(questionId: number) {
    return await this.repo.find({where:{id: questionId}, relations: { answers:true }})
  }

}
