import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise, ExerciseShema } from 'src/db/entities';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise) private readonly repo: Repository<Exercise>,
    @InjectRepository(ExerciseShema) private readonly schemaRepo: Repository<ExerciseShema>,
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

    let property: Exercise = await this.repo.preload(await this.repo.findOne({where: {id: id}, relations:{exerciseSchema:true}}));

    if(property) {
      if(property.exerciseSchema) {
        const schema = await this.schemaRepo.findOne({where:{exerciseId: id}})
        schema.content = exercise?.exerciseSchema?.content ||schema.content;
        await this.schemaRepo.save(schema);

        property = {
          ...property,
          title: exercise.title,
          description: exercise.description,
          url: exercise.url,
          exerciseSchema: {
            ...(await this.schemaRepo.save(schema))
          }
        }

        return await this.repo.save(property);
      }

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
