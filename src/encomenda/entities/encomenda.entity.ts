import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'tb_encomenda' })
export class Encomenda {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    @ApiProperty()
    nome: string;

    @IsNotEmpty()
    @Column({ length: 450, nullable: false })
    @ApiProperty()
    ingredientes: string;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
    @ApiProperty()
    caloria: number;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
    @ApiProperty()
    preco: number;

    // @IsNotEmpty()
    @Column({ default: 0, nullable: false })
    @ApiProperty()
    avaliacao: number;

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