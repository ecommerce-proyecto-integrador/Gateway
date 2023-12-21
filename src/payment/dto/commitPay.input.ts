import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class commitPayInput{
    @Field()
    token: string;

    
}
