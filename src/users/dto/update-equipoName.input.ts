import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateEquipoNameInput{
    @Field()
    antiguoNombreEquipo: string;
    @Field()
    nuevoNombreEquipo: string;
    
}
