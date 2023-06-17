import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExResultService } from './ex-result.service';
import { ExResult } from './entities/ex-result.entity';

@Controller('resultsEx')
export class ExResultController {
  constructor(private readonly resultService: ExResultService) {}

  @Post()
  create(@Body() result: ExResult) {
    return this.resultService.create(result);
  }

  @Get()
  findAll() {
    return this.resultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResultDto: any) {
    return this.resultService.update(+id, updateResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultService.remove(+id);
  }
}
