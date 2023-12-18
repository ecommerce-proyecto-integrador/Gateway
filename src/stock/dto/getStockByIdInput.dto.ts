import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class getStockByIdInput{
        @Field()
        id: string;
}