import { Injectable, Inject } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { CreateProductInput } from './dto/CreateProductInput.entity';
import { CreateCategoryInput } from './dto/CreateCategoryInput.dto';
import { getProductByIdInput } from './dto/getProductByIdInput.dto';
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

  async getProducts(): Promise<string> {
    try {
      const record = new RmqRecordBuilder(null);

      record
        .setOptions({
          type: 'GET_PRODUCTS',
        })
        .build();

      const messageProperties = {
        type: 'GET_PRODUCTS', // Establece la propiedad "Type" del mensaje aquí
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

  async getProductById(ProductByIdInput: getProductByIdInput): Promise<string> {
    try {
      const record = new RmqRecordBuilder(ProductByIdInput);

      record
        .setOptions({
          type: 'GET_PRODUCTBYID',
        })
        .build();

      const messageProperties = {
        type: 'GET_PRODUCTBYID', // Establece la propiedad "Type" del mensaje aquí
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

  async getTop3PopularProducts(): Promise<string> {
    try {
      const record = new RmqRecordBuilder(null);

      record
        .setOptions({
          type: 'GET_TOP3POPULARPRODUCTS',
        })
        .build();

      const messageProperties = {
        type: 'GET_TOP3POPULARPRODUCTS', // Establece la propiedad "Type" del mensaje aquí
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
