import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/db/entities';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private readonly repo: Repository<Group>,
  ){}

  async create(group: Group) {
    return await this.repo.save(this.repo.create(group));
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOne({where:{id:id},relations:{users: true}});
    // return `This action returns a #${id} group`;
  }

  async update(id: number, group: Group) {
    const preload = await this.repo.preload(await this.repo.findOne({where:{id}}));

    delete group.users;

    return await this.repo.save(this.repo.create({...preload, ...group}));
  }

  async remove(id: number) {
    return await this.repo.remove(await this.repo.findOne({where:{id:id}}));
  }
}
