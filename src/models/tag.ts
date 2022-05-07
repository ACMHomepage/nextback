import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'tag' })
export class Tag {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;
}
