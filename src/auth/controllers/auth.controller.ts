//importar as pastas para não dar erro (ctrl+espaço)

import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { UsuarioLogin } from "../entities/usuariologin.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Usuario')
@Controller("/usuario")
export class AuthController {
    constructor(private authService: AuthService) { }

    // Anotação que indica que usaremos uma classe de validação especial (Guard)
    // @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    login(@Body() usuario: UsuarioLogin): Promise<any> {
        return this.authService.login(usuario);
    }

}