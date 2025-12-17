import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Encomenda } from './encomenda/entities/encomenda.entity';
import { EncomendaModule } from './encomenda/encomenda.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Encomenda, Categoria],
      synchronize: true,
    }),
    EncomendaModule, CategoriaModule
],
  controllers: [],
  providers: [],
})
export class AppModule { }
