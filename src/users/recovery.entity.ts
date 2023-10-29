import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity ,PrimaryGeneratedColumn} from 'typeorm';

@Entity()
@ObjectType()
export class RecoverPass{
    
    @PrimaryGeneratedColumn()
    @Field(()=>Int)
    id?: number;
    @Column()
    @Field()
    correo?: string;
    @Column()
    @Field()
    codigo?: string;
    
}