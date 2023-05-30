import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Question, Test, Theme, Media, Theory, Exercise, ExerciseEl, ExerciseElCoordinates, Group, Result,  } from './entities';
import { Answer } from './entities/answers.entity';

@Global()
@Module({
  exports: [
    TypeOrmModule.forFeature([
      User,
      Group,
      Question,
      Answer,
      Test,
      Theme,
      Media,
      Theory,
      Exercise,
      ExerciseEl,
      ExerciseElCoordinates,
      Result,
    ]),
  ],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Group,
      Question,
      Answer,
      Test,
      Theme,
      Media,
      Theory,
      Exercise,
      ExerciseEl,
      ExerciseElCoordinates,
      Result,
    ]),
  ]
})
export class DbModule {}
 