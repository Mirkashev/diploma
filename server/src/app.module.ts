import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ExerciseModule } from './exercise/exercise.module';
import { GroupModule } from './group/group.module';
import { ResultModule } from './result/result.module';
import { TestModule } from './test/test.module';
import { TheoryModule } from './theory/theory.module';
import { TopicModule } from './topic/topic.module';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface"
import { ConfigService } from './config/config.service';
import { MinioClientModule } from './minio-client/minio-client.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/auth.constants';
import { ExResultModule } from './exResult/ex-result.module';

@Module({
  imports: [
    ConfigModule.forRootAsync(),
    TypeOrmModule.forRootAsync({
      useFactory: ({config}: ConfigService) => {
        // console.log(config)
        const ssl = config.db.ca ? {ca: config.db.ca} : undefined; 

        const options: TypeOrmModuleOptions = {
          type: 'postgres',
          database: config.db.dbname, 
          host: config.db.host,
          port: config.db.port,
          username: config.db.user,
          password: config.db.pass,
          synchronize: true, // do not set it to "true" in production code
          // entities: [],
          autoLoadEntities: true,
          // migrationsTableName: 'migrations',
          // migrations: ['dist/db/migrations/*.js'],
          // migrationsRun: true,
          cache: false,
          logging: [`error`, `warn`],
          ssl
        }

        return options
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    MinioClientModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m'}
    }),
    AuthModule, 
    ExerciseModule, 
    GroupModule, 
    ResultModule,
    ExResultModule, 
    TestModule, 
    TheoryModule, 
    TopicModule, 
    UserModule, 
    QuestionModule, 
    AnswerModule
  ],
})
export class AppModule {}
