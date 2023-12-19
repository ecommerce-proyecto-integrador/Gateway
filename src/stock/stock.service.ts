import { Injectable, Inject } from '@nestjs/common';
import { Stocks } from './stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
//import { ApiResponse } from './ApiResponse.entity';
import { getStockByIdInput } from './dto/getStockByIdInput.dto';

@Injectable()
export class StockService {
  constructor(
    @Inject('STOCK_SERVICE') private readonly client: ClientProxy,
    @InjectRepository(Stocks) private productsRepository: Repository<Stocks>,
    private jwtService: JwtService,
  ) {}
  findAll(): Promise<Stocks[]> {
    return this.productsRepository.find();
  }


  async getStockById(StockByIdInput: getStockByIdInput): Promise<string> {
    try {
      /*const record = new RmqRecordBuilder(StockByIdInput);

      record
        .setOptions({
          type: 'GET_STOCKBYPRODUCTID',
        })
        .build();*/

      const messageProperties = {
        type: 'GET_STOCKBYPRODUCTID', // Establece la propiedad "Type" del mensaje aquí
      };

      const resp = await firstValueFrom(
        this.client.send({properties: messageProperties}, StockByIdInput),
      );
      
      const decodedData = Buffer.from(resp.data, 'base64').toString('utf-8');
      //const products: string = JSON.parse(decodedData);
      console.log(decodedData);
      return decodedData;
    } catch (error) {
      console.error('Error al emitir el evento service:', error);
      return null;
    }
  }


}
