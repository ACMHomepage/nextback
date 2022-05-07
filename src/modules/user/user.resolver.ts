import { Mutation, Query, Resolver, Args, Int } from '@nestjs/graphql';

import { User } from 'models/user';
import { UserService } from './user.service';
import { newUserInput } from './dto/newUserInput';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userSerive: UserService) {}

  @Query((returns) => [User])
  async userList(@Args('id', { type: () => Int, nullable: true }) id?: number) {
    return await this.userSerive.find(id);
  }

  @Mutation((returns) => User)
  async createUser(
    @Args('newUserData') newUserData: newUserInput,
  ): Promise<User> {
    return await this.userSerive.create(newUserData);
  }
}
