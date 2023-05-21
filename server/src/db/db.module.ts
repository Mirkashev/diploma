import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Question, Test, Theme, Media, Theory, Exercise, ExerciseEl, ExerciseElCoordinates,  } from './entities';

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
      Exercise,
      ExerciseEl,
      ExerciseElCoordinates
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
      Exercise,
      ExerciseEl,
      ExerciseElCoordinates
    ]),
  ]
})
export class DbModule {}
 