import { InputType, Field } from '@nestjs/graphql';

@InputType()
export default class NewsInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  imageUrl: string;
}
