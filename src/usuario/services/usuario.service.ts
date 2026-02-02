import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { ILike, Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult } from "typeorm/browser";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt

    ) { }

    async findByUsuario(usuario: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations: {
                encomendas: true
            }
        });
    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                encomendas: true
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
            },
            relations: {
                encomendas: true
            }
        })
    }

    async create(usuario: Usuario): Promise<Usuario> {
        let usuarioBusca = await this.findByUsuario(usuario.usuario);

        if (!usuarioBusca) {
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)

            return await this.usuarioRepository.save(usuario);
        }

        throw new HttpException("O Usuário já existe!", HttpStatus.BAD_REQUEST)

    }


async update(usuario: Usuario): Promise<Usuario> {
  const usuarioUpdate = await this.findById(usuario.id);

  const usuarioBusca = await this.findByUsuario(usuario.usuario);
  if (usuarioBusca && usuarioBusca.id !== usuario.id) {
    throw new HttpException(
      'Usuário (e-mail) já cadastrado!',
      HttpStatus.BAD_REQUEST
    );
  }

  usuario.senha = usuarioUpdate.senha;

  return this.usuarioRepository.save({
    ...usuarioUpdate,
    ...usuario,
  });
}


async updateSenha(
  id: number,
  senhaAtual: string,
  novaSenha: string
) {
  const usuario = await this.findById(id);

  const senhaOk = await this.bcrypt.compararSenhas(
    usuario.senha,
    senhaAtual
  );

  if (!senhaOk) {
    throw new HttpException('Senha atual inválida', HttpStatus.BAD_REQUEST);
  }

  usuario.senha = await this.bcrypt.criptografarSenha(novaSenha);
  await this.usuarioRepository.save(usuario);

  return { message: 'Senha alterada com sucesso' };
}

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)

        return await this.usuarioRepository.delete(id)
    }

    

}