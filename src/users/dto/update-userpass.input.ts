import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePasswordInput{
    @Field()
    claveAntigua?: string;
    @Field()
    claveNueva: string;
}
