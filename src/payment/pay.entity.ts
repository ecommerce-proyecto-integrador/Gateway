import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity ,PrimaryGeneratedColumn} from 'typeorm';

@Entity()
@ObjectType()
export class Pay{
    
    @PrimaryGeneratedColumn()
    @Field(()=>Int)
    id?: number;
    @Column()
    @Field()
    correoCreador?: string;
    @Column()
    @Field()
    monto?: number;
    @Column()
    @Field()
    url?: string;
    
}