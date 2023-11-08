import { Injectable, Inject } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { CreateProductInput } from './dto/CreateProductInput.entity';
import { CreateCategoryInput } from './dto/CreateCategoryInput.dto';
import { ApiResponse } from './ApiResponse.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly client: ClientProxy,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private jwtService: JwtService,
  ) {}
  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  ////////////////////////////////////////////////////// PRODUCTOS  ///////////////////////////////////////////////////////

  async createProduct(product: CreateProductInput): Promise<boolean> {
    try {
      // Crea un nuevo objeto RmqRecordBuilder
      const record = new RmqRecordBuilder(product);

      // Define la propiedad Type del mensaje
      record
        .setOptions({
          type: 'CREATE_PRODUCT',
        })
        .build();
      const messageProperties = {
        type: 'CREATE_PRODUCT', // Establece la propiedad "Type" del mensaje aquí
      };

      const resp = await firstValueFrom(
        this.client.send({properties: messageProperties}, record),
      );
      return resp;
    } catch (error) {
      console.error('Error al emitir el evento service:', error);
      return false;
    }
  }

  async createCategory(category: CreateCategoryInput): Promise<ApiResponse> {
    try {

      const record = new RmqRecordBuilder(category);

      record
        .setOptions({
          type: 'CREATE_CATEGORY',
        })
        .build();

      const messageProperties = {
        type: 'CREATE_CATEGORY', // Establece la propiedad "Type" del mensaje aquí
      };


      const resp = await firstValueFrom(
        this.client.send({properties: messageProperties}, record),
      );
      console.log(resp);
      return {
        success: resp.success,
        message: resp.message,
      };
    } catch (error) {
      console.error('Error al emitir el evento service:', error);
      return null;
    }
  }
}
