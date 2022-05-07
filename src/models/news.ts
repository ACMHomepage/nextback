import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'news' })
export class News {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  imageUrl: string;

  @Field()
  createdDate: Date;

  @Field()
  modifiedDate: Date;
}
