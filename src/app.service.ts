import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {Db} from 'mongodb';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASK') private tasksList: any[],
    @Inject('MONGO') private database: Db ,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getApi(): string {
    const apiKey = this.configService.apiKey;
    const name = this.configService.database.name;
    return `Hola soy API_KEY: ${apiKey} y ${name}`;
  }
}
