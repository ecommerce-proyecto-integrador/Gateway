import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class ConfirmCodeInput{
    @Field()
    correo: string;
    @Field()
    code: string;
    
}
