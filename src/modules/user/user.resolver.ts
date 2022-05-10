import { Mutation, Query, Resolver, Args, Int, Context } from '@nestjs/graphql';
import { Request } from 'express';

import { User } from 'models/user';
import setHttpOnlyCookie from 'utils/setHttpOnlyCookie';
import jwtoken from 'utils/jwt';

import { UserService } from './user.service';
import { newUserInput } from './dto/newUserInput';
import { signInInput } from './dto/signInInput';
import idByJwt from 'utils/idByJwt';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userSerive: UserService) {}

  @Query((returns) => [User])
  async userList(
    @Args('id', { type: () => Int, nullable: true }) id?: number
  ) {
    return await this.userSerive.find(id);
  }

  @Mutation((returns) => User)
  async addUser(
    @Args('input') newUserData: newUserInput,
  ): Promise<User> {
    return await this.userSerive.create(newUserData);
  }

  @Mutation((returns) => User)
  async signIn(
    @Args('input') signInData: signInInput,
    @Context('req') req: Request,
  ) {
    const { email, password } = signInData;
    const user = await this.userSerive.findByEmail(email);
    const verify = await user.check(password);
    if (verify) {
      setHttpOnlyCookie(req, 'jwt', jwtoken(user.id, user.isAdmin));
      return user;
    } else {
      throw new Error('The password is not right');
    }
  }

  @Mutation((returns) => User)
  async signOut(
    @Context('req') req: Request,
  ) {
    const id = idByJwt(req);
    const user = await this.userSerive.fingById(id);
    setHttpOnlyCookie(req, 'jwt', '');
    return user;
  }
}
