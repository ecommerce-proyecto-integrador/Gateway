import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { PayModule } from './payment/pay.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UsersModule,
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://locahost:5672'], // sin docker es localhost
          queue: 'users_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'silly.db.elephantsql.com',
      port: 5432,
      username: 'elxuemtd',
      password: 'LGo6aUDv0jkn-3bFRV8G9Kni9VA5CKDn',
      database: 'elxuemtd',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'products_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'silly.db.elephantsql.com',
      port: 5432,
      username: 'rhkeupic',
      password: 'UPfKFJRkeS3hjb5ciRfZlorJAibAeu2-',
      database: 'rhkeupic',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PayModule,
    ClientsModule.register([
      {
        name: 'PAY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://locahost:5672'], // sin docker es localhost
          queue: 'pay_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'silly.db.elephantsql.com',
      port: 5432,
      username: 'hfvhrvhi',
      password: 'gBMqnB78cnZBl_UXUKj4IhjvW1PA2DY7',
      database: 'hfvhrvhi',
      autoLoadEntities: true,
      synchronize: true,
    }),
    StockModule,
    ClientsModule.register([
      {
        name: 'STOCK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://locahost:5672'], // sin docker es localhost
          queue: 'stock_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'silly.db.elephantsql.com',
      port: 5432,
      username: 'ljixmlbh',
      password: 'wRYCSajKXwgUK0HK4niVFhq3ykHhVZRL',
      database: 'ljixmlbh',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
