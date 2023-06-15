import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { Exercise } from 'src/db/entities';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post(':id')
  create(@Body() exercise: Exercise, @Param('id') id: number) {
    console.log(id, exercise);
    return this.exerciseService.create(id, exercise);
  }

  // @Get(':id')
  // findAll(@Param('id') id: number) {
  //   return this.exerciseService.findByThemeId(id);
  // }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.exerciseService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() exercise: Exercise) {
    console.log(id, exercise);
    return this.exerciseService.update(+id, exercise);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseService.remove(+id);
  }
}
