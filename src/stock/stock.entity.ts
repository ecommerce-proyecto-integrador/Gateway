import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity ,PrimaryGeneratedColumn} from 'typeorm';

@Entity()
@ObjectType()
export class Stock{
        @PrimaryGeneratedColumn()
        @Field(()=>Int)
        Id?: number;
        @Column()
        @Field()
        ProductoID?: string;
        @Column()
        @Field()
        TiendaID?: string;
        @Column()
        @Field()
        Cantidad?: number;

}