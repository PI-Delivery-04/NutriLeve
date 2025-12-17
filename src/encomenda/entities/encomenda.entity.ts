import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({ name: 'tb_encomenda' })
export class Encomenda {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    nome: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 450, nullable: false })
    ingredientes: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
    caloria: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
    preco: number;

    // @IsNotEmpty()
    @ApiProperty()
    @Column({ default: 0, nullable: false })
    avaliacao: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ type: 'date', nullable: false })
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