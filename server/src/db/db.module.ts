import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Question, Test, Theme, Media, Theory, Exercise, ExerciseEl, ExerciseElCoordinates, Group,  } from './entities';
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
      ExerciseElCoordinates
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
      ExerciseElCoordinates
    ]),
  ]
})
export class DbModule {}
 