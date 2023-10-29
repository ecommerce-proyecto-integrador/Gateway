import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePasswordInput2{
    @Field()
    correo: string;
    @Field()
    claveNueva: string;
}
