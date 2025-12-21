import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Encomenda } from "../entities/encomenda.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { UsuarioService } from "../../usuario/services/usuario.service";
import { CategoriaService } from "../../categoria/services/categoria.service";

@Injectable()
export class EncomendaService {
    constructor(
        @InjectRepository(Encomenda)
        private encomendaRepository: Repository<Encomenda>,
        private categoriaService: CategoriaService,
        private usuarioService: UsuarioService
    ) { }

    async findAll(): Promise<Encomenda[]> {
        return this.encomendaRepository.find({
            relations: {
                categoria: true,
                usuario: true
            }
        });
    }

    async findById(id: number): Promise<Encomenda> {
        const encomenda = await this.encomendaRepository.findOne({
            where: { id },
            relations: {
                categoria: true,
                usuario: true
            }
        });

        if (!encomenda) {
            throw new HttpException(`Encomenda ${id} não encontrada`, HttpStatus.NOT_FOUND);
        }

        return encomenda;
    }

    async findAllByNome(nome: string): Promise<Encomenda[]> {
        const encomenda = await this.encomendaRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                categoria: true,
                usuario: true
            }
        });

        if (!encomenda) {
            throw new HttpException(`Encomenda de ${nome} não encontrada`, HttpStatus.NOT_FOUND);
        }
        return encomenda;
    }

    async create(encomenda: Encomenda): Promise<Encomenda> {
        await this.categoriaService.findById(encomenda.categoria.id);

        return await this.encomendaRepository.save(encomenda);
    }

    async update(encomenda: Encomenda): Promise<Encomenda> {
        await this.findById(encomenda.id);
        await this.categoriaService.findById(encomenda.categoria.id);
        // await this.usuarioService.findById(encomenda.usuario.id);

        return this.encomendaRepository.save(encomenda);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)
        return await this.encomendaRepository.delete(id);
    }

}