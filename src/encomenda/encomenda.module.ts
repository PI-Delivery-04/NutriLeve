import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Encomenda } from "./entities/encomenda.entity";
import { EncomendaController } from "./controllers/encomenda.controller";
import { EncomendaService } from "./services/encomenda.service";


@Module({
    imports: [TypeOrmModule.forFeature([Encomenda])],
    controllers: [EncomendaController],
    providers: [EncomendaService],
    exports: [],
})
export class EncomendaModule { }