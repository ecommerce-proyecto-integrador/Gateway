/*import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EquipoIntegranteRol } from './equipoIntegranteRol.entity';

@ObjectType()
export class Integrantes {
  
  @Field(() => Int)
  idIntegrante?: number;

  @Field()
  correo: string;

  
  @Field(() => [EquipoIntegranteRol], { nullable: true }) // Relación muchos a muchos a través de EquipoIntegranteRol
  equipoIntegranteRoles?: EquipoIntegranteRol[];
}*/