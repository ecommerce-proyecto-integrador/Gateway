import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class AgregarIntegrante{
    @Field()
    nombreEquipo: string;
    @Field()
    correoIntegrante: string;
}
