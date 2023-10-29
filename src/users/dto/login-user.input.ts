import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput{
    @Field()
    clave: string;
    @Field()
    correo: string;
}
