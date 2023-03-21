import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    mongo: {
      dbName: process.env.MONGO_INITDB_DATABASE,
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      host: process.env.MONGO_INITDB_HOST,
      port: process.env.MONGO_INITDB_PORT,
      connection: process.env.MONGO_INITDB_CONNECTION,
    },
    apiKey: process.env.API_KEY,
  };
});
