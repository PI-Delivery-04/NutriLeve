import { IsEmail, IsNotEmpty } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Encomenda } from "../../encomenda/entities/encomenda.entity"


@Entity({ name: "tb_usuario" })
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    nome: string

    @IsNotEmpty()
    @IsEmail()
    @Column({ length: 255, nullable: false })
    usuario: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    tipo_usuario: string;

    @Column({ length: 255, nullable: true })
    foto: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    senha: string;

    @OneToMany(() => Encomenda, (encomenda) => encomenda.usuario)
    encomendas: Encomenda[];
}