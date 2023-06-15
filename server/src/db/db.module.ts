import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Question, Test, Theme, Media, Theory, Exercise, ExerciseEl, Group, Result, ExerciseShema,  } from './entities';
import { Answer } from './entities/answers.entity';
import { Course } from './entities/course.entity';

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
      // ExerciseEl,
      ExerciseShema,
      Result,
      Course
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
      // ExerciseEl,
      // ExerciseElCoordinates,
      ExerciseShema,
      Result,
      Course
    ]),
  ]
})
export class DbModule {}
 