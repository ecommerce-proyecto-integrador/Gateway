import { Injectable, Inject } from '@nestjs/common';
import { Stock } from './stock.entity';
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
    @InjectRepository(Stock) private productsRepository: Repository<Stock>,
    private jwtService: JwtService,
  ) {}
  findAll(): Promise<Stock[]> {
    return this.productsRepository.find();
  }


  async getStockById(StockByIdInput: getStockByIdInput): Promise<string> {
    try {
      const record = new RmqRecordBuilder(StockByIdInput);

      record
        .setOptions({
          type: 'GET_STOCKBYID',
        })
        .build();

      const messageProperties = {
        type: 'GET_STOCKBYID', // Establece la propiedad "Type" del mensaje aquí
      };

      const resp = await firstValueFrom(
        this.client.send({properties: messageProperties}, record),
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
