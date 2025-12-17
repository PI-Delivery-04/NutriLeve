import { Module } from "@nestjs/common";
import { Usuario } from "./entities/usuario.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioService } from "./services/usuario.service";
import { UsuarioController } from "./controllers/usuario.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    providers: [UsuarioService],
    controllers: [UsuarioController],
    exports: []
})
export class UsuarioModule {}