import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme, Theory, User } from '../../db/entities';
import { Repository } from 'typeorm';
import dayjs from 'dayjs';
import { TheoriesService } from '../theories/theories.service';
import { TestsService } from '../tests/tests.service';
import { ExercisesService } from '../exercises/exercises.service';
// import { TheoriesService } from '../theories/theories.service';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Theme) private readonly repo: Repository<Theme>,
    private readonly theoriesService: TheoriesService,
    private readonly testsService: TestsService,
    private readonly exercisesService: ExercisesService,
  ){}

  async create(theme: Theme) {
    return await this.repo.save(theme);
  }

  async save(theme: Theme) {
    // return await this.repo.save(theme);
  }

  async findAll() {
    return await this.repo.find({ order:{id:'DESC'}});
  }

  async findOne(id: number) {
    return await this.repo.findOne(
      {
        relations:{
          theory: true,
          tests: true,
          exercises: true,
        }, 
        where:{ id: id }, 
        select:{ 
          theory: { 
            content: true 
          }, 
          tests: {
            id: true, 
            title: true
          }, 
          exercises:{
            id: true, 
            title: true
          }
        }
      });
  }

  async findByLogin(login: string) {
   
  }

  async findAdmin() {
  }

  async update(id: number, theme: Theme) {
    const theme2 = await this.repo.findOne({where:{id: id}});
    theme2.title = theme.title

    return await this.repo.save(theme2);
  }

  async remove(id: number) {
    return await this.repo.remove(await this.repo.find({where:{id:id}}))
  }
}
