import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity ,PrimaryGeneratedColumn} from 'typeorm';

@Entity()
@ObjectType()
export class Users{
    
    @PrimaryGeneratedColumn()
    @Field(()=>Int)
    id?: number;
    @Column()
    @Field()
    name?: string;
    @Column()
    @Field()
    clave?: string;
    @Column()
    @Field()
    correo?: string;
    @Column()
    @Field()
    phone?: string;
    @Column()
    @Field()
    rut?: string;
    @Column()
    @Field()
    rol?: string;
}