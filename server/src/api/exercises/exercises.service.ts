import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise, ExerciseElCoordinates } from 'src/db/entities';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise) private readonly repo: Repository<Exercise>,
    @InjectRepository(ExerciseElCoordinates) private readonly exElCoordinatesrepo: Repository<ExerciseElCoordinates>,
  ){}
  async create(id: number, exercise: Exercise) {
    exercise.themeId = id;
    return await this.repo.save(exercise);
  }

  async findByThemeId(id: number) {
    return await this.repo.find({where:{themeId: id}, select: {title: true, id: true}})
  }

  async findById(id: number) {
    return await this.repo.find({where:{id: id}, relations: {
      exerciseElCoordinates: true,
      theme: true
    }})
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  async update(id: number, exercise: Exercise) {

    let property: Exercise = await this.repo.preload(await this.repo.findOne({where: {id: id}}));

    await this.exElCoordinatesrepo.remove(await this.exElCoordinatesrepo.find({where:{exerciseId: exercise.id}}));

    // console.log(exercise.exerciseElCoordinates)
    if(property) {
      // property.content = theory.content;
      property = {
        ...property,
        exerciseElCoordinates: exercise.exerciseElCoordinates,
        title: exercise.title,
        description: exercise.description,
        url: exercise.url,
      }
      return await this.repo.save(property);

    }
    console.log(id, exercise);
    // return `This action updates a #${id} exercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}
