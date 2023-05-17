import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({})
export class ConfigModule {
  static forRootAsync(): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: ConfigService,
          useFactory: async (): Promise<ConfigService> => {
            const loaded = ConfigService.load()
            return loaded;
          },
        }
      ],
      exports: [ConfigService],
    };
  }
}
