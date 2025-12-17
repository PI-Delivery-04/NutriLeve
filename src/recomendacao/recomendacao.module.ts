import { Module } from "@nestjs/common";
import { RecomendacaoController } from "./controllers/recomendacao.controller";
import { RecomendacaoService } from "./services/recomendacao.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Encomenda } from "../encomenda/entities/encomenda.entity";
import { Categoria } from "../categoria/entities/categoria.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Encomenda, Categoria])],
    controllers: [RecomendacaoController],
    providers: [RecomendacaoService],
    exports: [RecomendacaoService],
})
export class RecomendacaoModule { }