import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TheoriesService } from './theories.service';
import { Theory } from './entities/theories.entity';

@Controller('theories')
export class TheoriesController {
  constructor(private readonly theoriesService: TheoriesService) {}

  @Post()
  create(@Body() theory: Theory) {
    return this.theoriesService.create(theory);
  }
  
  // @Get()
  // async findAll() {
  //   // return await this.theoriesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   // console.log(id);
  //   // return this.theoriesService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThemeDto: any) {
    return this.theoriesService.update(+id, updateThemeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.theoriesService.remove(+id);
  }
}
