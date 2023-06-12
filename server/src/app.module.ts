import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface"
import { ApiModule } from './api/api.module';
import { DbModule } from './db/db.module';
import * as entities from './db/entities';
import { ConfigModule } from './config/config.module';
import { AppConfig } from './config/config.types';
import { ConfigService } from './config/config.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './api/auth/auth.constants';
import { MinioClientModule } from './minio-client/minio-client.module';
import { CourseModule } from './course/course.module';

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
          entities: Object.values(entities),
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
    DbModule,
    MinioClientModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d'}
    }),
    ApiModule,
    CourseModule,
  ],
})
export class AppModule {}
