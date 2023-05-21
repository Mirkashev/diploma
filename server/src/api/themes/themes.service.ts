import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme, Theory, User } from '../../db/entities';
import { Repository } from 'typeorm';
import dayjs from 'dayjs';
// import { TheoriesService } from '../theories/theories.service';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme) private readonly repo: Repository<Theme>,
  ){}

  async create(theme: Theme) {
    return await this.repo.save(theme);
  }

  async save(theme: Theme) {
    // return await this.repo.save(theme);
  }

  async findAll() {
    // console.log('here');
    return await this.repo.find({ order:{id:'DESC'}});
  }

  async findOne(id: number) {
    ['theory', 'tests', 'exercises']
    return await this.repo.find({relations:{
      theory: true,
      tests: true,
      exercises: {
        exerciseElCoordinates:true
      }
    }, where:{ id: id }, select:{ theory: { content: true }}});
  }

  async findByLogin(login: string) {
   
  }

  async findAdmin() {
  }

  async update(id: number, theory: Theory) {
    const theme = await this.repo.find({where:{id: id}});

    return await this.repo.save({theory: theory, ...theme[0]});
  }

  remove(id: number) {
    return `This action removes a #${id} theme`;
  }
}
