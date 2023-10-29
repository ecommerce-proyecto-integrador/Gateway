import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EquipoIntegranteRol } from './equipoIntegranteRol.entity'; // Asegúrate de importar la entidad correcta

@ObjectType()
export class Equipos {
  
  @Field(() => Int)
  idEquipos?: number;
  
  @Field()
  name: string;

  @Field()
  proyecto?: string;

  @Field(() => [EquipoIntegranteRol], { nullable: true }) // Relación muchos a muchos a través de EquipoIntegranteRol
  equipoIntegrantes?: EquipoIntegranteRol[];
}