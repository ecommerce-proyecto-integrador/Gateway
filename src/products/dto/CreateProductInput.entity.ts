import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput{
        @Field()
        Name: string;
        @Field()
        Description: string;
        @Field()
        Price: number;
        @Field()
        Image: string;
        @Field()
        Category: string;
}
