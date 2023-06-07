import { Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { CreateUserInput, Users, LoginInput } from './user.dto';
import UserService from './user.service';
import bcrypt from 'bcrypt';
import Context from '../../type/context';

@Resolver()
class UserResolver {
  constructor( private userService: UserService) {
    this.userService = new UserService();
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
    // console.log(context.user)
    return context.user
  }
}

export default UserResolver;
