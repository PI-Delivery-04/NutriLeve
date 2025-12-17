import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
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

  @Post("/cadastrar")
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
}