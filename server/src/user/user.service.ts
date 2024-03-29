import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Raw, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService{

  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ){
    // super(repo, { useSoftDelete: true });
  }

  async create(user: User) {
    return await this.repo.save(user);

    console.log(user);
    if(user.role === 'student' || user.role === 'teacher' || user.role === undefined) {
      return await this.repo.save(user);
    }

    return new Error('bad role');
  }

  async createAdmin(user: User) {
    return await this.repo.save(user);
  }

  async save(user: User) {
    return await this.repo.save(user);
  }

  async findAll() {
    return await this.repo.find({ where: { role: Raw(alias => `${alias} = 'student' or ${alias} = 'teacher'`)}, relations:{group:true} })
  }

  async findWithoutGroup() {
    return await this.repo.find({ where: { role: Raw(alias => `${alias} = 'student'`), groupId: Raw(()=> '"groupId" IS NULL')} })
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

    if(user.role === 'student' || user.role === 'teacher' || user.role === undefined) {
      return await this.repo.save(this.repo.create({...preloaded, ...user}));
    }

    return new Error('bad role');
  }

  async remove(id: number) {
    const preloaded = await this.repo.preload(await this.repo.findOne({where:{id:id}}));
    return await this.repo.softRemove(preloaded);
  }
}
