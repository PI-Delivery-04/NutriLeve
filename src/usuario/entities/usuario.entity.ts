import { IsEmail, IsNotEmpty } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Encomenda } from "../../encomenda/entities/encomenda.entity"
import { ApiProperty } from "@nestjs/swagger"


@Entity({ name: "tb_usuario" })
export class Usuario {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    nome: string

    @IsNotEmpty()
    @IsEmail()
    @Column({ length: 255, nullable: false })
    @ApiProperty({example: "email@email.com.br"})
    usuario: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    tipo_usuario: string;

    @Column({ length: 255, nullable: true })
    @ApiProperty()
    foto: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    senha: string;

    @ApiProperty()
    @OneToMany(() => Encomenda, (encomenda) => encomenda.usuario)
    encomendas: Encomenda[];
}