import { Body, Controller, Get, Post } from '@nestjs/common';
import { Course } from 'src/db/entities/course.entity';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {

    constructor(
        private readonly courseService: CourseService
    ){}

    @Post()
    async create(@Body() course: Pick<Course, "name" | "description">) {
        return await this.courseService.create(course);
    }

    @Get()
    async findAll() {
        return await this.courseService.findAll()
    }
}
