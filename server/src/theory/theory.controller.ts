import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TheoryService } from './theory.service';
import { Theory } from './entities/theory.entity';

@Controller('theories')
export class TheoryController {
  constructor(private readonly theoryService: TheoryService) {}

  @Post(':id')
  create(@Param('id') id: number, @Body() theory: Theory) {
    return this.theoryService.create(id, theory);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.theoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() theory: Theory) {
    return this.theoryService.update(id, theory);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.theoryService.remove(+id);
  }
}
