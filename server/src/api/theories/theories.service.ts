import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theory, User } from '../../db/entities';
import { Repository } from 'typeorm';
// import { ThemesService } from '../themes/themes.service';

@Injectable()
export class TheoriesService {
  constructor(
    // @InjectRepository(User) private readonly repo: Repository<User>
    @InjectRepository(Theory) private readonly repo: Repository<Theory>,
    // private readonly themesService: ThemesService,
    


  ){}

  async create(theory: Theory) {
    return await this.repo.save(theory);
  }

  async save(theory: Theory) {
    // return await this.repo.save(theory);
  }

  update(id: number, updateThemeDto:any) {
    return `This action updates a #${id} theory`;
  }

  remove(id: number) {
    return `This action removes a #${id} theory`;
  }
}
