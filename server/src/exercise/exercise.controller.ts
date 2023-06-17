import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { Exercise } from './entities/exercise.entity';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post(':id')
  create(@Body() exercise: Exercise, @Param('id') id: number) {
    console.log(id, exercise);
    return this.exerciseService.create(id, exercise);
  }

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
