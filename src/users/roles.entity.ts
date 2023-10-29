import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EquipoIntegranteRol } from './equipoIntegranteRol.entity'; // Asegúrate de importar la entidad correcta

@ObjectType()
export class Roles {
  
  @Field(() => Int)
  idRoles?: number;
  
  @Field()
  name: string;

  @Field(() => [EquipoIntegranteRol], { nullable: true }) // Relación uno a muchos con EquipoIntegranteRol
  equipoIntegranteRoles?: EquipoIntegranteRol[];
}