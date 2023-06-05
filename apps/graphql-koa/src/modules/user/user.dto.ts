import { Field, ID, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class User{
    @Field(()=>ID,{nullable:false})
    id!: number;

    @Field(()=>String,{nullable:false})
    name: string;

    @Field(()=>String,{nullable:false})
    email!: string;

    @Field(()=>String,{nullable:false})
    password!: string;
}

@InputType()
export class CreateUserInput {

    @Field(()=>String,{nullable:false})
        name: string;

    @Field(()=>String,{nullable:false})
    email!: string;

    @Field(()=>String,{nullable:false})
    password: string;
}