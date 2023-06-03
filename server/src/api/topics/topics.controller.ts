import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { Theme } from '../../db/entities/theme.entity';

@Controller('topics')
export class TopicsController {
  constructor(private readonly themesService: TopicsService) {}

  @Post()
  create(@Body() theme: Theme) {
    return this.themesService.create(theme);
  }
  
  @Get()
  findAll() {
    return this.themesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.themesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() theme: Theme) {
    return this.themesService.update(+id, theme);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.themesService.remove(+id);
  }
}
