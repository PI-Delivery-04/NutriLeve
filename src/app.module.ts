import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EncomendaModule } from './encomenda/encomenda.module';
import { CategoriaModule } from './categoria/categoria.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RecomendacaoModule } from './recomendacao/recomendacao.module';
import { AppController } from './app.controller';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    EncomendaModule, CategoriaModule, AuthModule, UsuarioModule, RecomendacaoModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
