import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";


@Entity({ name: 'tb_encomenda' })
export class Encomenda {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    nome: string;

    @IsNotEmpty()
    @Column({ length: 450, nullable: false })
    ingredientes: string;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
    caloria: number;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
    preco: number;

    // @IsNotEmpty()
    @Column({ default: 0, nullable: false })
    avaliacao: number;

    @IsNotEmpty()
    @Column({ type: 'date', nullable: false })
    data: Date;
   

    @ManyToOne(() => Usuario, (usuario) => usuario.encomenda, {
        onDelete: "CASCADE"
    })
    usuario: Usuario



    
}