import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Test } from './entities/test.entity';
import { TestService } from './test.service';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post(':theme_id')
  create(@Param('theme_id') id: number, @Body() test: Test) {
    return this.testService.create(id, test);
  }

  @Get(':test_id')
  findAll(@Param('test_id') id: number) {
    return this.testService.findOne(id);
  }

  @Patch(':test_id')
  update(@Param('test_id') id: number, @Body() test: Test) {
    return this.testService.update(id, test);
  }

  @Delete(':test_id')
  remove(@Param('test_id') id: number) {
    return this.testService.remove(id);
  }
}
