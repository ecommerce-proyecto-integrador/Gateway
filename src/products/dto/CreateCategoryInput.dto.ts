import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput{
        id: string = "";
        @Field()
        name: string;
}
