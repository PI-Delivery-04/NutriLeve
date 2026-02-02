import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../services/usuario.service";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Usuario')
@Controller("/usuario")
@ApiBearerAuth()
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }


  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findById(id);
  }


  @UseGuards(JwtAuthGuard)
  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string): Promise<Usuario[]> {
    return this.usuarioService.findByNome(nome);
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }


  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.update(usuario);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.delete(id);
  }
    /**
   * PROFILE (JWT)
   */
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  getMe(@Req() req: any): Promise<Usuario> {
    return this.usuarioService.findById(req.user.id);
  }


  @UseGuards(JwtAuthGuard)
  @Put('/me')
  @HttpCode(HttpStatus.OK)
  updateMe(
    @Req() req: any,
    @Body() usuario: Usuario
  ): Promise<Usuario> {
    usuario.id = req.user.id;
    usuario.senha = undefined as any;

    return this.usuarioService.update(usuario);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/me/senha')
  @HttpCode(HttpStatus.OK)
  updateSenha(
    @Req() req: any,
    @Body() body: { senhaAtual: string; novaSenha: string }
  ) {
    return this.usuarioService.updateSenha(
      req.user.id,
      body.senhaAtual,
      body.novaSenha
    );
  }


  @UseGuards(JwtAuthGuard)
  @Delete('/me')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMe(@Req() req: any) {
    return this.usuarioService.delete(req.user.id);
  }
}