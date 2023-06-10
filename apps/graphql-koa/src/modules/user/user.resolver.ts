import { Args, Authorized, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { CreateUserInput, Users, LoginInput, GetUserById } from './user.dto';
import UserService from './user.service';
import bcrypt from 'bcrypt';
import Context from '../../type/context';

@Resolver()
class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }
  

 //************* signup  *************//
  @Mutation(() => Users)
  async createUser(@Args(() => CreateUserInput) input: CreateUserInput) {
    // return this.prisma.user.create({ data: input });
    return this.userService.createuser({
      ...input,
      password: await bcrypt.hash(input.password, 10),
    });
  }


  //************* login  *************//
  @Mutation(() => String)
  async login(@Args(() => LoginInput) input: LoginInput) {
    // return this.prisma.user.create({ data: input });
    return this.userService.login(
      input
    );
  }


  //************* login user *************//
  @Query(() => Users,{nullable:true})
  @Authorized() // Add the @Authorized decorator
  loginUser(@Ctx() context: Context) {
    // console.log(context.user);
    return context.user;
  }


  //************* all users *************//
  @Query(() => [Users],{nullable:true})
  // @Authorized() // Add the @Authorized decorator
  allUsers() {
    // console.log(context.user);
    return this.userService.allUsers()
  }


  //************* user by id *************//
  @Query(() => Users)
  async getUserById(@Args(() => GetUserById) input: GetUserById) {
    return await this.userService.getUserById(input);
  }


}

export default UserResolver;
