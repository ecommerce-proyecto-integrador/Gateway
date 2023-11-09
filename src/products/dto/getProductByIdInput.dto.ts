import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class getProductByIdInput{
        @Field()
        id: string;
}