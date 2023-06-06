import { ArgsType, Field, ID, InputType, ObjectType } from 'type-graphql';
import { Users } from '../user/user.dto';

@ObjectType()
export class Products {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  price: string;

  @Field(() => [Users])
  user: Users[];

  @Field(() => Boolean)
  thumbsUp: boolean;
}

@InputType()
@ArgsType()
export class CreateProductInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  price: string;
}