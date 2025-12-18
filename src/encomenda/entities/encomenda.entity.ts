import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({ name: 'tb_encomenda' })
export class Encomenda {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    @ApiProperty()
    nome: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 450, nullable: false })
    @ApiProperty()
    ingredientes: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
    @ApiProperty()
    caloria: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
    @ApiProperty()
    preco: number;

    // @IsNotEmpty()
    @ApiProperty()
    @Column({ default: 0, nullable: false })
    @ApiProperty()
    avaliacao: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ type: 'date', nullable: false })
    @ApiProperty()
    data: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.encomendas, {
        onDelete: 'CASCADE'
    })
    usuario: Usuario;

    @ManyToOne(() => Categoria, (categoria) => categoria.encomendas, {
        onDelete: 'CASCADE'
    })
    categoria: Categoria;


}