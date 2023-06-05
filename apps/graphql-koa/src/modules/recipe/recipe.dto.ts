import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User{
    @Field(()=>ID,{nullable:false})
    id: number;

    @Field(()=>String,{nullable:false})
    title: string;

    @Field(()=>String,{nullable:false})
    description: string;

    @Field(()=>String,{nullable:false})
    thumbsUp: string;

    @Field(()=>String,{nullable:false})
    thumbsDown: [string];
}