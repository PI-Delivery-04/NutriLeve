import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Encomenda } from './encomenda/entities/encomenda.entity';
import { EncomendaModule } from './encomenda/encomenda.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RecomendacaoController } from './recomendacao/controllers/recomendacao.controller';
import { RecomendacaoService } from './recomendacao/services/recomendacao.service';
import { RecomendacaoModule } from './recomendacao/recomendacao.module';
import { AppController } from './app.controller';

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
      entities: [Encomenda, Categoria, Usuario],
      synchronize: true,
    }),
    EncomendaModule, CategoriaModule, AuthModule, UsuarioModule, RecomendacaoModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }