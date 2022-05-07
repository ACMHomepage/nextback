import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class newTagInput {
  @Field()
  name: string;
}
