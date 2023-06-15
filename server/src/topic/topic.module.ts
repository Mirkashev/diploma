import { Logger, Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  controllers: [TopicController],
  providers: [TopicService]
})
export class TopicModule {
  private readonly logger = new Logger('TOPIC MODULE')
  constructor (){
    this.logger.log('init')
  }
}
