import { Mutation, Query, Resolver, Args, Int, Context } from '@nestjs/graphql';

import { User } from 'models/user';
import userInput from 'dto/userInput';

import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userSerive: UserService) {}

  @Query((returns) => [User])
  async userList(
    @Args('id', { type: () => Int, nullable: true }) id?: number
  ): Promise<User[]> {
    return await this.userSerive.find(id);
  }

  @Mutation((returns) => User)
  async addUser(
    @Args('user') user: userInput,
  ): Promise<User> {
    return await this.userSerive.create(user);
  }
}
