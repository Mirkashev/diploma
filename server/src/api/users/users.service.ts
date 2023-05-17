import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../db/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ){}

  async create(user: User) {
    console.log(user);
    return await this.repo.save(user);
  }

  async save(user: User) {
    return await this.repo.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return await this.repo.findBy({id: id});
  }

  async findByLogin(login: string) {
    return (await this.repo.findBy({login: login}))[0];
  }

  async findAdmin() {
    return await this.repo.findBy({role: 'admin'});
  }

  update(id: number, user: User) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
