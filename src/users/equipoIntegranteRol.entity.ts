import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Equipos } from './equipos.entity';
//import { Integrantes } from './integrantes.entity';
import { Roles } from './roles.entity';
@ObjectType()
export class EquipoIntegranteRol {
  @Field(() => Int)
  id?: number;

  @Field(() => Equipos) 
  equipo?: Equipos;
  /*
  @Field(() => Integrantes) 
  integrante?: Integrantes;
  */
  @Field(() => Roles) 
  rol?: Roles;

  
}