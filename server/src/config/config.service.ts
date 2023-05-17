import { Injectable, Logger } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { AppConfig } from './config.types';

dotenvConfig();

@Injectable()
export class ConfigService {
  private static readonly logger = new Logger(ConfigService.name);

  constructor(public readonly config: AppConfig) {
  }

  private static getString(name: string, def?: string): string | never {
    const value = this.getStringOptional(name, def);

    if (value !== undefined) {
      return value;
    }

    this.logger.error(`Env variable "${name}" is undefined`);
    process.exit(1);
  }

  private static getStringOptional(name: string, def?: string): string | undefined {
    const value = process.env[name];

    return value || def;
  }

  private static getNumber(name: string, def?: number): number | never {
    const value = process.env[name];

    if (value) {
      const result = Number(value);
      if (Number.isNaN(result)) {
        this.logger.error(`Invalid number in "${name}"`);
        process.exit(1);
      }
      return result;
    }
    if (def !== undefined) {
      return def;
    }

    this.logger.error(`Env variable "${name}" is undefined`);
    process.exit(1);
  }

  static async load(): Promise<ConfigService> {
    const config: AppConfig = {
      db: {
        host: this.getString('DB_HOST'),
        port: this.getNumber('DB_PORT'),
        dbname: this.getString('DB_DATABASE'),
        user: this.getString('DB_USER'),
        pass: this.getString('DB_PASS'),
        ca: this.getStringOptional('DB_CA')
      },
    };
    return new ConfigService(config);
  }
}
