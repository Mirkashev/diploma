import { Module, Global } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';


@Global()
@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async ({config}: ConfigService) => ({
        endPoint: config.minio.endPoint,
        port: config.minio.port,
        useSSL: false, // If on localhost, keep it at false. If deployed on https, change to true
        accessKey: config.minio.accessKey,
        secretKey: config.minio.secretKey,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}