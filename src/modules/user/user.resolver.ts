import { Mutation, Query, Resolver, Args, Int, Context } from '@nestjs/graphql';

import { User } from 'models/user';
import UserInput from 'dto/userInput';

import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userSerive: UserService) {}

  @Query((returns) => [User])
  async userList(
  ): Promise<User[]> {
    return await this.userSerive.find();
  }

  @Query((returns) => User)
  async userById(
    @Args('id', { type: () => Int }) id: number
  ): Promise<User> {
    return await this.userSerive.fingById(id);
  }

  @Mutation((returns) => User)
  async addUser(
    @Args('user') user: UserInput,
  ): Promise<User> {
    return await this.userSerive.create(user);
  }
}
