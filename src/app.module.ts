import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';

import { NewsModule } from 'modules/news';
import { UserModule } from 'modules/user';

@Module({
  imports: [
    NewsModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        let options = await getConnectionOptions();
        if (options.type !== 'mysql' && options.type !== 'mariadb') {
          throw new Error('The type should be mysql or mariadb')
        }
        if (process.env.NODE_ENV === 'dev') {
          options = {
            ...options,
            host: 'localhost',
            synchronize: true,
          };
          console.log('[DEV] options:', options);
        }
        return options;
      }
    }),
  ],
})

export class AppModule {
  constructor(private connection: Connection) {}
}