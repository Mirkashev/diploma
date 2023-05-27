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

  async findAll() {
    return await this.repo.find({ where: { role: 'student' || 'teacher'} })
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

  async update(id: number, user: User) {
    const preloaded = await this.repo.preload(await this.repo.findOne({where:{id:id}}));
    console.log(preloaded)
    preloaded.login = user.login;
    preloaded.password = user.password;
    preloaded.surname = user.surname;
    preloaded.firstName = user.firstName;
    preloaded.lastName = user.lastName;

    // console.log(preloaded);  

    console.log({...preloaded, ...user});  


    return await this.repo.save(preloaded);
  }

  async remove(id: number) {
    const preloaded = await this.repo.preload(await this.repo.findOne({where:{id:id}}));
    return await this.repo.remove(preloaded);
  }
}
