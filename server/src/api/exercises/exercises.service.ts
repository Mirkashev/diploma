import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from 'src/db/entities';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise) private readonly repo: Repository<Exercise>,
  ){}
  async create(id: number, exercise: Exercise) {
    exercise.themeId = id;
    return await this.repo.save(exercise);
  }

  async findByThemeId(id: number) {
    return await this.repo.find({where:{themeId: id}, select: {title: true, id: true}})
  }

  async findById(id: number) {
    return await this.repo.findOne({where:{id: id}, relations: {
      theme: true,
      exerciseSchema: true
    }})
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  async update(id: number, exercise: Exercise) {

    let property: Exercise = await this.repo.preload(await this.repo.findOne({where: {id: id}}));

    // console.log(exercise.exerciseElCoordinates)
    if(property) {
      // property.content = theory.content;
      property = {
        ...property,
        title: exercise.title,
        description: exercise.description,
        url: exercise.url,
        exerciseSchema: {
          ...property.exerciseSchema,
          ...exercise.exerciseSchema,
        }
      }
      return await this.repo.save(property);

    }

    return false;
    // return `This action updates a #${id} exercise`;
  }

  async remove(id: number) {
    return await this.repo.remove(await this.repo.findOne({where:{id: id}}));
  }
}
