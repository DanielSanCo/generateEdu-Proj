import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Param, Body, ParseIntPipe } from '@nestjs/common';
import { DeleteResult } from "typeorm";
import { Postagem } from '../entities/postagem.entity';
import { PostagemService } from '../service/postagem.service';

@Controller('/post')
export class PostagemController {
    constructor(private readonly postagemService: PostagemService) {}

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number ): Promise<Postagem> {
        return this.postagemService.findById(id)
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByEducacao(@Param('titulo') titulo: string): Promise<Postagem[]> {
        return this.postagemService.findByEducacao(titulo)
    }

    @Get('/data/:data_hora')
    @HttpCode(HttpStatus.OK)
    findByDate(@Param('data_hora') date: string): Promise<Postagem[]> {
        return this.postagemService.findByData(date)
    }

    @Get()
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll()
    }

    @Post(':id')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.create(postagem)
    }

    @Put()
    update(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.update(postagem)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    public delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.postagemService.delete(id)
    }

}