import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { Theme } from '../../db/entities/theme.entity';

@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Post()
  create(@Body() theme: Theme) {
    return this.themesService.create(theme);
  }
  
  @Get()
  async findAll() {
    return (await this.themesService.findAll());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    // возвращать объект со всеми вложенностями (теория, тесты, упражнения)
    return this.themesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThemeDto: any) {
    return this.themesService.update(+id, updateThemeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.themesService.remove(+id);
  }
}
