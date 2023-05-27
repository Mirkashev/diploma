import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from '../../db/entities/test.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test) private readonly repo: Repository<Test>,
  ){}
  async create(id:number, test: Test) {
    test.themeId = id;
    return await this.repo.save(test);
  }

  async findAll(id:number) {
    return await this.repo.find({ where:{themeId: id}, select:{ title: true, id: true } })
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
    return await this.repo.find({where:{id: testId}, relations: {
      questions: true
    }})
  }

}
