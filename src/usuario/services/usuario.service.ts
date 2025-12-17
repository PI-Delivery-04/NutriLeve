import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { ILike, Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult } from "typeorm/browser";


@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>
    ) { }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }
    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            }
        });

        if (!usuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async findByNome(nome: string): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            }
        })
    }

    async create(usuario: Usuario): Promise<Usuario> {
        return await this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario> {

        const buscaUsuario = await this.findById(usuario.id);

        if (!buscaUsuario || !usuario.id)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        return await this.usuarioRepository.save(usuario);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)

        return await this.usuarioRepository.delete(id)
    } 

}