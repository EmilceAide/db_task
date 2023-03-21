import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";
import config from '../config';

const API_KEY = '1223';
const API_KEY_PROD = 'POIOOOOO';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
        useFactory: (configService: ConfigType<typeof config>)=>{
            const { connection, user, password, host, port, dbName } =
          configService.mongo;
          return {
            uri: `${connection}://${host}:${port}`,
            user,
            pass: password, 
            dbName, 
          }
        },
        inject: [config.KEY]
    })
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
