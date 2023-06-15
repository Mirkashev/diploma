import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './entities'


@Global()
@Module({
  exports: [
    TypeOrmModule.forFeature([
      ...Object.values(entities)
    ]),
  ],
  imports: [
    TypeOrmModule.forFeature([
      ...Object.values(entities)
    ]),
  ]
})
export class DbModule {}
