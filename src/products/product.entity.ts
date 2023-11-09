import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity ,PrimaryGeneratedColumn} from 'typeorm';

@Entity()
@ObjectType()
export class Product{
        @PrimaryGeneratedColumn()
        @Field(()=>Int)
        Id?: number;
        @Column()
        @Field()
        Name?: string;
        @Column()
        @Field()
        Description?: string;
        @Column()
        @Field()
        Price?: number;
        @Column()
        @Field()
        Brand?: string;
        @Column()
        @Field()
        InStock?: boolean;
        @Column()
        @Field()
        SizeAvailable?: string;
        @Column()
        @Field()
        Image?: string;
        @Column()
        @Field()
        Reviews?: string;
        @Column()
        @Field()
        CategoryName?: string;
}