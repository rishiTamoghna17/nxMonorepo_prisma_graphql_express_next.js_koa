import { ArgsType, Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { Products } from '../recipe/product.dto'

@ObjectType()
export class Users{
    @Field(()=>ID,{nullable:false})
    id!: number;

    @Field(()=>String,{nullable:false})
    name: string;

    @Field(()=>String,{nullable:false})
    email!: string;

    @Field(()=>String,{nullable:false})
    password!: string;

    @Field(() => [Products], { nullable: true })
    products?: Products[];
}

@InputType()
@ArgsType()
export class CreateUserInput {

    @Field(()=>String,{nullable:false})
        name: string;

    @Field(()=>String,{nullable:false})
    email!: string;

    @Field(()=>String,{nullable:false})
    password: string;
}

@InputType()
@ArgsType()
export class LoginInput{
    @Field(()=>String,{nullable:false})
    email: string;

    @Field(()=>String,{nullable:false})
    password: string;
}