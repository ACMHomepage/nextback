import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class newNewsInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  imageUrl: string;
}
