import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { Exercise } from 'src/db/entities';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post(':id')
  create(@Body() exercise: Exercise, @Param('id') id: number) {
    return this.exercisesService.create(id, exercise);
  }

  // @Get(':id')
  // findAll(@Param('id') id: number) {
  //   return this.exercisesService.findByThemeId(id);
  // }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.exercisesService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() exercise: Exercise) {
    return this.exercisesService.update(+id, exercise);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(+id);
  }
}
