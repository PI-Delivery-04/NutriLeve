import { IsNotEmpty } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity({name: "tb_usuario"})
export class Usuario {

    @PrimaryGeneratedColumn()    
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome: string

    @IsNotEmpty()
    @Column ({length: 255, nullable: false})
    email: string
   
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    tipo_usuario: string;

    @Column({ length: 255, nullable: true })
    foto: string;
    
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    senha: string;

}