import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise) private readonly repo: Repository<Exercise>,
  ){}
  async create(id: number, exercise: Exercise) {
    exercise.topicId = id;
    return await this.repo.save(exercise);
  }

  async findByThemeId(id: number) {
    return await this.repo.find({where:{topicId: id}, select: {title: true, id: true}})
  }

  async findById(id: number) {
    return await this.repo.findOne({where:{id: id}, relations: {
      topic: true,
    }})
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  async update(id: number, exercise: Exercise) {

    let property: Exercise = await this.repo.preload(await this.repo.findOne({where: {id: id}}));
    
    property = {
      ...property,
      title: exercise.title,
      description: exercise.description,
      content: exercise.content
    }

    return await this.repo.save(property);
  }

  async remove(id: number) {
    return await this.repo.remove(await this.repo.findOne({where:{id: id}}));
  }
}
