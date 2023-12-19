import { Query, Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { StockService } from './stock.service';
import { Stocks } from './stock.entity';
import { Inject, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
//import { ApiResponse } from './ApiResponse.entity';
import { getStockByIdInput } from './dto/getStockByIdInput.dto';

@Resolver()
export class StockResolver {
  constructor(
    @Inject('STOCK_SERVICE') private client: ClientProxy,
    private stockService: StockService,
  ) {}

  @Query(() => String)
  async getStockById(@Args('getStocktByIdInput') StockByIdInput: getStockByIdInput) {
    console.log('getStockById');
    const stock = await this.stockService.getStockById(StockByIdInput);
    return stock;
  }

}
