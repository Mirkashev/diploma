import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstrumentsService } from './instruments.service';
import { ExerciseEl } from 'src/db/entities';

@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentServices: InstrumentsService) {}

  @Post()
  create(@Body() exerciseEl: ExerciseEl) {
    console.log('here')
    console.log(exerciseEl);
    return this.instrumentServices.create(exerciseEl);
  }

  @Get()
  findAll() {
    return this.instrumentServices.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instrumentServices.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: any) {
    return this.instrumentServices.update(+id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instrumentServices.remove(+id);
  }
}
