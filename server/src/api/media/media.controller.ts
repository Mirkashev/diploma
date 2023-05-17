import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MediaService } from './media.service';
import { Media } from './entities/media.entity';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  create(@Body() media: Media) {
    return this.mediaService.create(media);
  }
  
  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    // возвращать объект со всеми вложенностями (теория, тесты, упражнения)
    return this.mediaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThemeDto: any) {
    return this.mediaService.update(+id, updateThemeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}
