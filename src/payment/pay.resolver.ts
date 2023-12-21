import { Query, Resolver,Args,Mutation,Context } from '@nestjs/graphql';


import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';


import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { PayService } from './pay.service';
import { CreatePayInput } from './dto/create-pay.input';
import { commitPayInput } from './dto/commitPay.input';

@Resolver()
export class PayResolver {
    constructor(@Inject('PAY_SERVICE') private client: ClientProxy,private payService: PayService){}
    
    @Mutation(() => String)
    async paycreated(
      @Args('createPayInputnput') createPayInputnput: CreatePayInput,@Context() context,) {
      const authorization = context.req.headers.authorization;
      if (!authorization) {
        throw new Error('No se proporcionó un token de autorización1.');
      }
      try {
        const decoded = jwt.verify(authorization, 'tu_clave_secreta') as JwtPayload;;
        const correo = decoded.correo
        if(decoded){
          const result = await this.payService.payCreated(createPayInputnput.orden_compra,createPayInputnput.session_id,createPayInputnput
            .monto,createPayInputnput.return_url,correo);
          return result
        }
      } catch (error) {
        throw new Error('Token no válido. Verificación fallida.');
      }
    }

    @Mutation(() => String)
    async commitPay(
      @Args('commitPayInput') commitPayInput: commitPayInput, @Context() context,) {
      const authorization = context.req.headers.authorization;
      if (!authorization) {
        throw new Error('No se proporcionó un token de autorización1.');
      }
      try {
        const decoded = jwt.verify(authorization, 'tu_clave_secreta') as JwtPayload;;
        const correo = decoded.correo
        if(decoded){
          const result = await this.payService.commitPay(commitPayInput.token);
          return result
        }
      } catch (error) {
        throw new Error('Token no válido. Verificación fallida.');
      }
    }
    
    
}



