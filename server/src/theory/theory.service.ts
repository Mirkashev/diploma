import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theory } from './entities/theory.entity';
// import { ThemesService } from '../themes/themes.service';

@Injectable()
export class TheoryService {
  constructor(
    // @InjectRepository(User) private readonly repo: Repository<User>
    @InjectRepository(Theory) private readonly repo: Repository<Theory>,
    // private readonly themesService: ThemesService,
    


  ){}

  async create(id: number, theory: Theory) {
    console.log(id, theory)
    if(!theory.content) {
      return;
    }
    theory.topicId = id;
    const theme = await this.repo.findOne({where: {topicId: id}})
    if(!theme) {
      return await this.repo.save(theory);
    }

    const property = await this.repo.preload(theme);

    if(property) {
      property.content = theory.content;
      return await this.repo.save(property);
    }

  }

  async save(theory: Theory) {
    // return await this.repo.save(theory);
  }

  async findOne(id: number) {
    return await this.repo.find({where: { topicId: id }, relations: { topic:true }})
  }

  async update(id: number, theory: Theory) {
    const property = await this.repo.preload(await this.repo.findOne({where: {topicId: id}}));

    if(property) {

      property.content = theory.content;
      return await this.repo.save(property);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} theory`;
  }
}
