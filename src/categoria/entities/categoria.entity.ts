import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Encomenda } from "../../encomenda/entities/encomenda.entity";

@Entity({ name: "tb_categoria" })
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    nome: string

    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    descricao: string;

    @OneToMany(() => Encomenda, (encomenda) => encomenda.usuario)
    encomendas: Encomenda[];
}