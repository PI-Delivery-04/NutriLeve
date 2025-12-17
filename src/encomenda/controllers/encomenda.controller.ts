import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { EncomendaService } from "../services/encomenda.service";
import { Encomenda } from "../entities/encomenda.entity";
import { DeleteResult } from "typeorm";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


 @ApiTags('Encomendas')
 @UseGuards(JwtAuthGuard)
 @Controller('/encomendas')
 @ApiBearerAuth()
export class EncomendaController {
    constructor(private readonly encomendaService: EncomendaService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Encomenda[]> {
        return this.encomendaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id', ParseIntPipe) id: number): Promise<Encomenda> {
        return this.encomendaService.findById(id);
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    async findAllByNome(@Param('nome') nome: string): Promise<Encomenda[]> {
        return this.encomendaService.findAllByNome(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() encomenda: Encomenda): Promise<Encomenda> {
        return this.encomendaService.create(encomenda);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async update(@Body() encomenda: Encomenda): Promise<Encomenda> {
        return this.encomendaService.update(encomenda);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.encomendaService.delete(id);
    }
}