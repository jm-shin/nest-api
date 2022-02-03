import { Injectable, Logger } from '@nestjs/common';

export interface EnvConfig {
  [Key: string]: string;
}

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig  = {}
    private readonly logger: Logger = new Logger(ConfigService.name);
}
