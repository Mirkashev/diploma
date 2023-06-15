import { Logger, Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  controllers: [ExerciseController],
  providers: [ExerciseService]
})
export class ExerciseModule {
  private readonly logger = new Logger('EXERCISE MODULE')
  constructor (){
    this.logger.log('init')
  }
}
