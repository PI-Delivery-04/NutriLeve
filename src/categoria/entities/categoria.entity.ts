import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Encomenda } from "../../encomenda/entities/encomenda.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_categoria" })
export class Categoria {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    nome: string

    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    @ApiProperty()
    descricao: string;

    @OneToMany(() => Encomenda, (encomenda) => encomenda.categoria)
    encomendas: Encomenda[];
}