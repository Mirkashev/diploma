import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic) private readonly repo: Repository<Topic>,
  ){}

  async create(topic: Topic) {
    return await this.repo.save(topic);
  }

  async save(topic: Topic) {
    // return await this.repo.save(topic);
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

  async update(id: number, topic: Topic) {
    const topicInDb = await this.repo.findOne({where:{id: id}});
    topicInDb.title = topic.title

    return await this.repo.save(topicInDb);
  }

  async remove(id: number) {
    return await this.repo.softRemove(await this.repo.find({where:{id:id}, relations:['tests.questions.answers', 'theory', 'exercises']}))
  }
}
