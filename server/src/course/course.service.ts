import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Course } from 'src/db/entities/course.entity';

@Injectable()
export class CourseService {

    constructor(
        private readonly em: EntityManager
    ){}
    
    async create(courseDto: Pick<Course, "name" | "description" >) {
        
        const course = this.em.create(Course, {...courseDto})

        return await this.em.save(course);
    }

    async findAll() {
        return await this.em.find(Course, {});
    }

}
