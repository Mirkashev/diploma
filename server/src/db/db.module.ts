import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Question, Test, Theme, Media, Theory, } from './entities';

@Global()
@Module({
  exports: [
    TypeOrmModule.forFeature([
      User,
      Question,
      Test,
      Theme,
      Media,
      Theory,
    ]),
  ],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Question,
      Test,
      Theme,
      Media,
      Theory,
    ]),
  ]
})
export class DbModule {}
