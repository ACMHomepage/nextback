import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';

import { NewsModule } from 'modules/news';
import { UserModule } from 'modules/user';
import { AuthModule } from 'modules/auth';

import nodeEnv from 'utils/nodeEnv';

@Module({
  imports: [
    NewsModule,
    UserModule,
    AuthModule,
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
        switch (nodeEnv) {
          case 'dev':
            options = {
              ...options,
              host: 'localhost',
              synchronize: true,
            }
            break;
          case 'prod':
            break;
          case 'test':
            options = {
              ...options,
              host: 'localhost',
            }
            break;
          default:
            throw new Error(`Unsupport node env: ${nodeEnv}`);
        }
        return options;
      }
    }),
  ],
})

export class AppModule {
  constructor(private connection: Connection) {}
}