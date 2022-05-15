import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class signInInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
