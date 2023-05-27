import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer, Question } from 'src/db/entities';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private readonly repo: Repository<Question>,
    @InjectRepository(Answer) private readonly answersRepo: Repository<Answer>,
  ){}

  async create(testId: number, question: Question) {
    question.testId = testId;
    return await this.repo.save(question);
  }

  // async findAll(testId: number) {
  //   return await this.repo.find({
  //     where:{ testId: testId }, 
  //     relations: { test: true }, 
  //     select:{ test: { title: true } }
  //   })
  // }

  async update(questionId: number, question: Question) {
    let loadedQuestion = await this.repo.preload(await this.repo.findOne({where: {id: questionId}}));

    if(loadedQuestion) {
      await this.answersRepo.remove(await this.answersRepo.find({where: {questionId: questionId}}));
      
      loadedQuestion = {
        ...loadedQuestion,
        title: question.title,
        answers: question.answers,
      }
      return await this.repo.save(loadedQuestion);
    }
  }

  async remove(questionId: number) {
    let loadedQuestion = await this.repo.preload(await this.repo.findOne({where: {id: questionId}}));

    if(loadedQuestion) {
      await this.answersRepo.remove(await this.answersRepo.find({where: {questionId: questionId}}));

      return this.repo.remove(loadedQuestion);
    }

    return false;
  }

  async findOne(questionId: number) {
    return await this.repo.find({where:{id: questionId}, relations: { answers:true }})
  }

}
