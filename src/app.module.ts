import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { enviroments } from './enviroments';
import config from './config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    TasksModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'TASK',
      useFactory: async (http: HttpService) => {
        // const request = http.get('')
        // const tasks = await lastValueFrom(request);
        // return tasks.data;
      },
      inject: [HttpService],
    },
    AppService,
  ],
})
export class AppModule {}
//
