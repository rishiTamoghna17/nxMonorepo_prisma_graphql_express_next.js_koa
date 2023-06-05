import { Args, Mutation, Query, Resolver } from 'type-graphql';
import { CreateUserInput, User } from './user.dto';
import UserService from './user.service';
@Resolver()
class UserResolver {
  constructor(private userservice: UserService) {
    this.userservice = new UserService();
  }
  @Mutation(() =>User)
   createUser(@Args()input:CreateUserInput){
    return this.userservice.createuser(input);
   }
  @Query(() => User)
  user() {
    return {
      id: 1,
      username: 'admin',
      email: 'kenaa@example.com',
      password: 'admin',
    };
  }
}
export default UserResolver;
