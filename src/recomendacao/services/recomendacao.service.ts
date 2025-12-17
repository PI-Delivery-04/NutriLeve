import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Encomenda } from "../../encomenda/entities/encomenda.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Injectable()
export class RecomendacaoService {
    constructor(
        @InjectRepository(Encomenda)
        private encomendaRepository: Repository<Encomenda>,

        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
    ) { }

    /**
     * Retorna as 3 encomendas com menos calorias para cada categoria cadastrada.
     */
    async getTopEncomendasLeves(): Promise<any[]> {
        // 1. Pegamos todas as categorias existentes
        const categorias = await this.categoriaRepository.find();

        // 2. Criamos um mapeamento para buscar as top 3 de cada uma em paralelo
        const relatorio = await Promise.all(
            categorias.map(async (cat) => {
                const top3 = await this.encomendaRepository.find({
                    where: { categoria: { id: cat.id } },
                    order: { caloria: 'ASC' }, // Menor caloria primeiro
                    take: 3,                   // Limita a 3 resultados
                    relations: { categoria: false, usuario: true } // Oculta categoria (já sabemos qual é) e mostra o usuário
                });

                return {
                    categoriaId: cat.id,
                    categoriaNome: cat.nome,
                    encomendas: top3
                };
            })
        );

        // Removemos do resultado categorias que ainda não possuem encomendas
        return relatorio.filter(item => item.encomendas.length > 0);
    }
}