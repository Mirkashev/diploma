import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestsService } from './tests.service';
import { Test } from '../../db/entities/test.entity';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post(':theme_id')
  create(@Param('theme_id') id: number, @Body() test: Test) {
    return this.testsService.create(id, test);
  }

  // @Get(':theme_id')
  // findAll(@Param('theme_id') id: number) {
  //   return this.testsService.findAll(id);
  // }

  @Patch(':test_id')
  update(@Param('test_id') id: number, @Body() test: Test) {
    return this.testsService.update(id, test);
  }

  @Delete(':test_id')
  remove(@Param('test_id') id: number) {
    return this.testsService.remove(id);
  }

  @Get('/getone/:test_id')
  findOne(@Param('test_id') id: number) {
    return this.testsService.findOne(id);
  }
}
