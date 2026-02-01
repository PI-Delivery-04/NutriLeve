//importar as pastas para não dar erro (ctrl+espaço)

import { JwtService } from "@nestjs/jwt"
import { UsuarioService } from "../../usuario/services/usuario.service"
import { Bcrypt } from "../bcrypt/bcrypt"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { UsuarioLogin } from "../entities/usuariologin.entity"

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) { }

    // Método usado para validar o usuário
    async validateUser(username: string, password: string): Promise<any> {

        const buscaUsuario = await this.usuarioService.findByUsuario(username)

        if (!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        // Faz a comparação entre a senha criptografada no banco com a que está vindo pela requisição
        const matchPassword = await this.bcrypt.compararSenhas(buscaUsuario.senha, password)

        // Se as info estiverem corretas, entra no IF
        if (buscaUsuario && matchPassword) {
            const { senha, ...resposta } = buscaUsuario // Desestruturamos o objeto, isto é, pegamos o que importa para nós
            return resposta
        }

        return null
    }

    async login(usuarioLogin: UsuarioLogin) {

        const usuarioValidado = await this.validateUser(
            usuarioLogin.usuario,
            usuarioLogin.senha
        )

        if (!usuarioValidado)
            throw new HttpException('Senha inválida!', HttpStatus.UNAUTHORIZED)

        const payload = { sub: usuarioLogin.usuario }

        return {
            id: usuarioValidado.id,
            nome: usuarioValidado.nome,
            usuario: usuarioLogin.usuario,
            senha: '',
            foto: usuarioValidado.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }
    }

}