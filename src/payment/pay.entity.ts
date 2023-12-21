import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity ,PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { History } from "./history.entity"

@ObjectType()
export class Pay{
    @PrimaryGeneratedColumn()
    @Column({ primary: true, generated: true })
    orden_compra: string;
    @Field()
    @Column()
    session_id: string;
    @Field()
    @Column()
    monto: number;
    @Field()
    @Column()
    url_retorno: string;
    @Field()
    @Column()
    correo: string;

    @Field(() => [History], { nullable: true })
    @OneToMany(() => History, history => history.pay)
    history?: History[];
    
}