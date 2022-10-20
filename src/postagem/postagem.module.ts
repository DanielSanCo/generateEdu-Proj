import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostagemController } from "./controller/postagem.controller";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./service/postagem.service";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem])],
    controllers: [PostagemController],
    providers: [PostagemService],
    exports: [TypeOrmModule]

})

export class PostagemModule {}