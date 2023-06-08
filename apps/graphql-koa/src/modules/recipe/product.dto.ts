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

  @Field(() => [Users],{ nullable: true })
  user: Users[]| null;

  @Field(() => Boolean)
  thumbsUp: boolean;
}

@InputType()
@ArgsType()
export class CreateProductInput {
  @Field(() => String)
  title!: string;

  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  price: string;

  @Field(() => Boolean)
  thumbsUp: boolean;
}

@InputType()
@ArgsType()
export class GetProductInputById {
  @Field(() => ID)
  id: string;
}