import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TheoriesService } from './theories.service';
import { Theory } from '../../db/entities/theories.entity';

@Controller('theories')
export class TheoriesController {
  constructor(private readonly theoriesService: TheoriesService) {}

  @Post(':id')
  create(@Param('id') id: number, @Body() theory: Theory) {
    return this.theoriesService.create(id, theory);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.theoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() theory: Theory) {
    return this.theoriesService.update(id, theory);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.theoriesService.remove(+id);
  }
}
