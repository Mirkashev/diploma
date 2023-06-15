import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) private readonly repo: Repository<Test>,
  ){}
  async create(id:number, test: Test) {
    test.topicId = id;
    return await this.repo.save(test);
  }

  async findAll(id:number) {
    return await this.repo.find({ where:{topicId: id}, select:{ title: true, id: true } })
  }
  async update(id: number, test: Test) {
    const preloaded = await this.repo.preload(await this.repo.findOne({where:{id:id}}));
    preloaded.title = test.title;

    return await this.repo.save(preloaded);
  }

  async remove(id: number) {
    return await this.repo.remove(await this.repo.find({where:{id: id}}))
  }

  async findOne(testId: number) {
    return await this.repo.findOne({where:{id: testId}, relations: ['questions.answers', 'theme']})
  }

  async countPercent(testId: number, questions: Array<any>) {
    const test = await this.repo.findOne({
      where:{ id: testId }, 
      relations:['questions.answers'], 
      select:{
        questions:{
          id: true, 
          answers:{ id: true, isTrue: true }
        }
      }});

    let countOfTrue = 0;
    test.questions.forEach(element => {
      const questionGet = questions.find((el)=> el.questionId === element.id);
      const questionDb = test.questions.find((el)=> el.id === element.id);

      console.log(questionGet.questionId, questionDb.id);
      countOfTrue +=1;

      for(let i = 0; i < questionGet.answers.length; i +=1) {
        if(!(questionGet.answers[i].isTrue === (questionDb.answers.find((el)=> el.id === questionGet.answers[i].id).isTrue))) {
          countOfTrue -=1;
          return;
        }
      }
    });


    return (countOfTrue / (test.questions.length) * 100);
  }

}
