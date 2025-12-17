import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Encomenda } from "../entities/encomenda.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class EncomendaService {
    constructor(
        @InjectRepository(Encomenda)
        private encomendaRepository: Repository<Encomenda>,
    ) { }

    async findAll(): Promise<Encomenda[]> {
        return this.encomendaRepository.find();
    }

    async findById(id: number): Promise<Encomenda> {
        const encomenda = await this.encomendaRepository.findOne({
            where: { id }
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
            }
        });

        if (!encomenda) {
            throw new HttpException(`Encomenda de ${nome} não encontrada`, HttpStatus.NOT_FOUND);
        }
        return encomenda;
    }

    async create(encomenda: Encomenda): Promise<Encomenda> {
        return this.encomendaRepository.save(encomenda);
    }

    async update(encomenda: Encomenda): Promise<Encomenda> {
        await this.findById(encomenda.id);
        return this.encomendaRepository.save(encomenda);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)
        return await this.encomendaRepository.delete(id);
    }

}