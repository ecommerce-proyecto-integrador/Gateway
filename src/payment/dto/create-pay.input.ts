import {Field, InputType } from '@nestjs/graphql';
import { cart } from './cart.entity';
@InputType()
export class CreatePayInput{
    @Field()
    orden_compra: string;
    @Field()
    session_id: number;
    @Field()
    monto: number;
    @Field()
    return_url: string;
    @Field()
    cart: string[];
}
