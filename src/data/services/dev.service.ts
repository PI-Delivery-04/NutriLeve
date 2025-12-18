import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Encomenda } from "../../encomenda/entities/encomenda.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
<<<<<<< HEAD
      password: 'root',
=======
      password: 'r$4abWKj#456',
>>>>>>> f135ca20054d59a126caf212d10e00c420076829
      database: 'db_nutrileve',
      entities: [Categoria, Encomenda, Usuario],
      synchronize: true,
    };
  }
}