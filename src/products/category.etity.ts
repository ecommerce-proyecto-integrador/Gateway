import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity ,PrimaryGeneratedColumn} from 'typeorm';

@Entity()
@ObjectType()
export class Category{
        @PrimaryGeneratedColumn()
        @Field(()=>Int)
        Id?: number;
        @Column()
        @Field()
        Name?: string;
}