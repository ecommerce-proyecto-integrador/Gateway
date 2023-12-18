import { Module } from '@nestjs/common';
import { StockResolver } from './stock.resolver';
import { StockService } from './stock.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './stock.entity';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    StockModule,
    ClientsModule.register([
      {
        name: 'STOCK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], // sin docker es localhost
          queue: 'stock_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([Stock]),
    JwtModule.register({
      secret: 'tu_clave_secreta', // Reemplaza con tu clave secreta real
      signOptions: { expiresIn: '1h' }, // Opciones de firma del token
    }),
  ],
  providers: [StockResolver, StockService],
})
export class StockModule {}
