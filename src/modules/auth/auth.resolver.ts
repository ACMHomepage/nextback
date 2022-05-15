import { Mutation, Resolver, Args, Context } from "@nestjs/graphql";
import { Request, Response } from 'express';

import { User } from "models/user";
import { UserService } from "modules/user/user.service";
import genJwt from 'utils/jwt/genJwt';
import verifiedJwtObject from 'utils/jwt/verifiedJwtObject';
import setHttpOnlyCookie from 'utils/setHttpOnlyCookie';
import { UserResolver } from "modules/user/user.resolver";
import signInInput from 'dto/signInInput';
import userInput from "dto/userInput";

@Resolver((of) => User)
export class AuthResolver {
  constructor(
    private readonly userResolver: UserResolver,
    private readonly userSerive: UserService,
  ) {}

  @Mutation((returns) => User)
  async signIn(
    @Args('signIn') signIn: signInInput,
    @Context('res') res: Response,
  ): Promise<User> {
    const { email, password } = signIn;
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
    @Args('user') user: userInput,
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
    const id = verifiedJwtObject(req).id;
    const user = await this.userSerive.fingById(id);
    setHttpOnlyCookie(res, 'jwt', '');
    return user;
  }
}