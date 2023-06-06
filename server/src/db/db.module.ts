import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Question, Test, Theme, Media, Theory, Exercise, ExerciseEl, Group, Result, ExerciseShema,  } from './entities';
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
      ExerciseShema,
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
      // ExerciseElCoordinates,
      ExerciseShema,
      Result,
    ]),
  ]
})
export class DbModule {}
 