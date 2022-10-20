import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    port: 3306,
    database: 'db_generatedu',
    username: 'root',
    password: 'root',
    entities: [Postagem, Tema, Usuario],
    synchronize: true
  }), PostagemModule, TemaModule, UsuarioModule],
})
export class AppModule {}
