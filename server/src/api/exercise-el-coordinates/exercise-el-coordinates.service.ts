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

  findOne(id: number) {
    return `This action returns a #${id} exerciseEl`;
  }

  update(id: number, updateTestDto:any) {
    return `This action updates a #${id} exerciseEl`;
  }

  remove(id: number) {
    return `This action removes a #${id} exerciseEl`;
  }
}
