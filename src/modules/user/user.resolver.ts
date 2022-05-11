import { Mutation, Query, Resolver, Args, Int, Context } from '@nestjs/graphql';
import { Request, Response } from 'express';

import { User } from 'models/user';
import setHttpOnlyCookie from 'utils/setHttpOnlyCookie';
import genJwt from 'utils/jwt/genJwt';
import verifiedJwtObject from 'utils/jwt/verifiedJwtObject';

import { UserService } from './user.service';
import { newUserInput } from './dto/newUserInput';
import { signInInput } from './dto/signInInput';

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
    @Args('input') newUserData: newUserInput,
  ): Promise<User> {
    return await this.userSerive.create(newUserData);
  }

  @Mutation((returns) => User)
  async signIn(
    @Args('input') signInData: signInInput,
    @Context('res') res: Response,
  ): Promise<User> {
    const { email, password } = signInData;
    const user = await this.userSerive.findByEmail(email);
    const verify = await user.check(password);
    if (verify) {
      setHttpOnlyCookie(res, 'jwt', genJwt(user.id, user.isAdmin));
      return user;
    } else {
      throw new Error('The password is not right');
    }
  }

  @Mutation((returns) => User)
  async register(
    @Args('input') newUserData: newUserInput,
    @Context('res') res: any,
  ): Promise<User> {
    const user = await this.addUser(newUserData);
    await this.signIn(newUserData, res);
    return user;
  }

  @Mutation((returns) => User)
  async signOut(
    @Context('req') req: Request,
    @Context('res') res: Response,
  ): Promise<User> {
    const id = verifiedJwtObject(req).id;
    const user = await this.userSerive.fingById(id);
    setHttpOnlyCookie(res, 'jwt', '');
    return user;
  }
}
