import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class newUserInput {
  @Field()
  nickname: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
