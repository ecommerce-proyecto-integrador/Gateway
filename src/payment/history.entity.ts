import { Column, Entity ,PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Pay } from "./pay.entity"
import { Field } from '@nestjs/graphql';


export class History{
    @PrimaryGeneratedColumn()
    @Column({ primary: true, generated: true })
    idHistory: number;
    @Field()
    @Column()
    orden_compra: string;
    @Field()
    @Column()
    product_id: string;

    @Field(() => Pay)
    @ManyToOne(() => Pay, pay => pay.history)
    @JoinColumn({ name: "idPay" })
    pay?: Pay;
}