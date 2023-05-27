import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseEl } from 'src/db/entities';

@Injectable()
export class InstrumentsService {
  constructor(
    @InjectRepository(ExerciseEl) private readonly repo: Repository<ExerciseEl>,
  ){}
  async create(exerciseEl: ExerciseEl) {
    return await this.repo.save(exerciseEl);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.find({where:{id:id}});

  }

  async update(id: number, exerciseEl: ExerciseEl) {
    const preloaded = await this.repo.findOne({where:{id:id}})
    return await this.repo.save(
      {
        ...preloaded,
        ...exerciseEl
      }
    )
    // return `This action updates a #${id} exerciseEl`;
  }

  async remove(id: number) {
    return await this.repo.remove(await this.repo.findOne({where:{id:id}}));
    // return `This action removes a #${id} exerciseEl`;
  }
}
