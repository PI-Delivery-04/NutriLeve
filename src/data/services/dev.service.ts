import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Encomenda } from "../../encomenda/entities/encomenda.entity";
import { ConfigModule } from '@nestjs/config';

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.DB_PASSWORD,
      database: 'db_nutrileve',
      entities: [Categoria, Encomenda, Usuario],
      synchronize: true,
    };
  }
}