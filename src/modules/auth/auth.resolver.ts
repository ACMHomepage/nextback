import { Mutation, Resolver, Args, Context } from "@nestjs/graphql";
import { Request, Response } from 'express';

import { User } from "models/user";
import { UserService } from "modules/user/user.service";
import { UserResolver } from "modules/user/user.resolver";
import SignInInput from 'dto/signInInput';
import UserInput from "dto/userInput";
import * as jwt from 'utils/jwt';

@Resolver((of) => User)
export class AuthResolver {
  constructor(
    private readonly userResolver: UserResolver,
    private readonly userSerive: UserService,
  ) {}

  @Mutation((returns) => User)
  async signIn(
    @Args('signIn') signIn: SignInInput,
    @Context('res') res: Response,
  ): Promise<User> {
    const { email, password } = signIn;
    const user = await this.userSerive.findByEmail(email);
    const verify = await user.check(password);
    if (verify) {
      jwt.set(res, { id: user.id, isAdmin: user.isAdmin });
      return user;
    } else {
      throw new Error('The password is not right');
    }
  }

  @Mutation((returns) => User)
  async register(
    @Args('user') user: UserInput,
    @Context('res') res: any,
  ): Promise<User> {
    const userResult = await this.userResolver.addUser(user);
    await this.signIn(user, res);
    return userResult;
  }

  @Mutation((returns) => User)
  async signOut(
    @Context('req') req: Request,
    @Context('res') res: Response,
  ): Promise<User> {
    const id = jwt.get(req).id;
    const user = await this.userSerive.fingById(id);
    jwt.set(res, undefined);
    return user;
  }
}