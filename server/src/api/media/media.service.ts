import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media, User } from '../../db/entities';
import { Repository } from 'typeorm';

@Injectable()
export class MediaService {
  constructor(
    // @InjectRepository(User) private readonly repo: Repository<User>
    @InjectRepository(Media) private readonly repo: Repository<Media>

  ){}

  async create(media: Media) {
    console.log(media);
    return await this.repo.save(media);
  }

  async save(media: Media) {
    // return await this.repo.save(media);
  }

  findAll() {
    // console.log('here');
    return this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findBy({id: id});
  }

  async findByLogin(login: string) {
   
  }

  async findAdmin() {
  }
  update(id: number, updateThemeDto:any) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
