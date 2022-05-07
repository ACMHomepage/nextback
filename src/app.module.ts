import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { NewsModule } from 'modules/news';
import { UserModule } from 'modules/user';
import { TagModule } from 'modules/tag';

@Module({
  imports: [
    NewsModule,
    UserModule,
    TagModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
    TypeOrmModule.forRoot(),
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
