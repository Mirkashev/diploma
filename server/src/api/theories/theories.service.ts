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

  async create(id: number, theory: Theory) {
    theory.themeId = id;
    return await this.repo.save(theory);
  }

  async save(theory: Theory) {
    // return await this.repo.save(theory);
  }

  async findOne(id: number) {
    return await this.repo.find({ select: { content: true }, where:{themeId: id} })
  }

  async update(id: number, theory: Theory) {
    const property = await this.repo.preload(await this.repo.findOne({where: {themeId: id}}));

    if(property) {
      property.content = theory.content;
      return await this.repo.save(property);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} theory`;
  }
}
