import { Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { CreateUserInput, Users, LoginInput } from './user.dto';
import { PrismaClient } from '@prisma/client';
import UserService from './user.service';
import bcrypt from 'bcrypt';
import Context from '../../type/context';

@Resolver()
class UserResolver {
  constructor(private prisma: PrismaClient, private userService: UserService) {
    this.prisma = new PrismaClient();
    this.userService = new UserService(this.prisma);
  }

  @Mutation(() => Users)
  async createUser(@Args(() => CreateUserInput) input: CreateUserInput) {
    // return this.prisma.user.create({ data: input });
    return this.userService.createuser({
      ...input,
      password: await bcrypt.hash(input.password, 10),
    });
  }

  @Mutation(() => String)
  async login(@Args(() => LoginInput) input: LoginInput,@Ctx() context:Context) {
    // return this.prisma.user.create({ data: input });
    return this.userService.login(
      input,context
    );
  }

  @Query(() => Users)
  user(@Ctx() context:Context) {
    console.log(context.user)
    return context.user
  }
}

export default UserResolver;
