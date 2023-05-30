import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from 'src/db/entities';
import { Repository } from 'typeorm';
import { TestsService } from '../tests/tests.service';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result) private readonly repo: Repository<Result>,
    private readonly testsService: TestsService,
  ){}

  async create(result: any) {
    const percent = await this.testsService.countPercent(result.testId, result.questions);
    result.percent = percent;
    return await this.repo.save(this.repo.create(result));
  }

  async findAll() {
    return await this.repo.find({relations:['test.theme', 'user.group']});
  }

  async findOne(id: number) {
    return await this.repo.find({where:{userId:id}, relations:{test: true}});
  }

  update(id: number, updateResultDto: any) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}