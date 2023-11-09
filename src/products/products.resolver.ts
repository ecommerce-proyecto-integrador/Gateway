import { Query, Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { Category } from './category.etity';
import { CreateProductInput } from './dto/CreateProductInput.entity';
import { CreateCategoryInput } from './dto/CreateCategoryInput.dto';
import { getProductByIdInput } from './dto/getProductByIdInput.dto';
import { Inject, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { ApiResponse } from './ApiResponse.entity';

@Resolver()
export class ProductsResolver {
  constructor(
    @Inject('PRODUCTS_SERVICE') private client: ClientProxy,
    private productsService: ProductsService,
  ) {}

  @Query(() => [Product])
  product() {
    return this.productsService.findAll();
  }

  /////////////////////////////////////////////////////// PRODUCTOS  ///////////////////////////////////////////////////////

  @Mutation(() => Boolean)
  async createProducts(@Args('productInput') productInput: CreateProductInput) {
    const result = await this.productsService.createProduct(productInput);
    return result; // Retornar el valor booleano directamente
  }

  @Mutation(() => ApiResponse)
  async createCategory(@Args('categoryInput') categoryInput: CreateCategoryInput) {
    const id = "";

    /*categoryInput = {
      id,
      ...categoryInput,
    };*/

    const result = await this.productsService.createCategory(categoryInput);
    return result;
  }

  @Query(() => String)
  async getProducts() {
    console.log('getProducts');
    const products = await this.productsService.getProducts();
    return products;
  }

  @Query(() => String)
  async getProductById(@Args('getProductByIdInput') ProductByIdInput: getProductByIdInput) {
    console.log('getProductById');
    const product = await this.productsService.getProductById(ProductByIdInput);
    return product;
  }

  @Query(() => String)
  async getTop3PopularProducts() {
    console.log('getTop3PopularProducts');
    const products = await this.productsService.getTop3PopularProducts();
    return products;
  }
}
