import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Encomenda } from "./entities/encomenda.entity";
import { EncomendaController } from "./controllers/encomenda.controller";
import { EncomendaService } from "./services/encomenda.service";
import { CategoriaModule } from "../categoria/categoria.module";
import { UsuarioModule } from "../usuario/usuario.module";


@Module({
    imports: [TypeOrmModule.forFeature([Encomenda]), CategoriaModule, UsuarioModule],
    controllers: [EncomendaController],
    providers: [EncomendaService],
    exports: [],
})
export class EncomendaModule { }