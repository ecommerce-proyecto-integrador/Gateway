import { Injectable, Inject } from '@nestjs/common';
import { Pay } from './pay.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';

import { JwtService } from '@nestjs/jwt';
import { CreatePayInput } from './dto/create-pay.input';



@Injectable()
export class PayService {
    constructor(@Inject('PAY_SERVICE') private readonly client: ClientProxy,@InjectRepository(Pay) private usersRepository:Repository<Pay>,private jwtService: JwtService){}
    
    async payCreated(orden_compra:string,session_id:number,monto:number,url_retorno:string,correo:string, cart:string[]): Promise<string> {
        try {
          const resp = await firstValueFrom(this.client.send('new_pay_created', {orden_compra,session_id,monto,url_retorno,correo,cart}))
          return resp; 
        } catch (error) {
          console.error('Error al emitir el evento1:', error);
          return "false"; 
        }
      }

    async commitPay(token:string): Promise<string> {
        try {
          const resp = await firstValueFrom(this.client.send('commit_pay', {token}))
          return resp; 
        } catch (error) {
          console.error('Error al emitir el evento1:', error);
          return "false"; 
        }
      }
    

}
