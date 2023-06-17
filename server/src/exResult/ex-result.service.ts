import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { TestService } from 'src/test/test.service';
import { Repository } from 'typeorm';
import { ExResult } from './entities/ex-result.entity';

@Injectable()
export class ExResultService {
  constructor(
    @InjectRepository(ExResult) private readonly repo: Repository<ExResult>,
    // private readonly testsService: TestService,
  ){}

  async create(result: ExResult) {
    // const percent = await this.testsService.countPercent(result.testId, result.questions);
    // result.percent = percent;
    // console.log(result);
    return await this.repo.save(this.repo.create(result));
  }

  async findAll() {
    return await this.repo.find({relations:['test.topic', 'user.group']});
  }

  async findOne(id: number) {
    return await this.repo.find({where:{userId:id}, relations:{exercise: true}});
  }

  update(id: number, updateExResultDto: any) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
