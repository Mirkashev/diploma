import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MediaService } from './media.service';
import { Media } from '../../db/entities/media.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { MinioClientService } from 'src/minio-client/minio-client.service';

@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly fileUploader: MinioClientService
    ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    const url = await this.fileUploader.upload(file);
    return JSON.stringify(url.url);
  }
  
  // @Get()
  // findAll() {
  //   return 'zalupa';
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   console.log(id);
  //   // возвращать объект со всеми вложенностями (теория, тесты, упражнения)
  //   return this.mediaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateThemeDto: any) {
  //   return this.mediaService.update(+id, updateThemeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mediaService.remove(+id);
  // }
}
