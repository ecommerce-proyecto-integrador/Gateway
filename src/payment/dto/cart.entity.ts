import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class cart{
    @Field()
    id: string;
    @Field()
    name: string;
    @Field()
    description: string;
    @Field()
    category: string;
    @Field()
    brand: string;
    @Field()
    size: string;
    @Field()
    quantity: number;
    @Field()
    price: number;
    @Field()
    stock: number;
    
}
