import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Param, Body, ParseIntPipe } from '@nestjs/common';
import { DeleteResult } from "typeorm";
import { Tema } from '../entities/tema.entity';
import { TemaService } from '../service/tema.service';

@Controller('/tema')
export class TemaController {
    constructor(private readonly temaService: TemaService) {}

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number ): Promise<Tema> {
        return this.temaService.findById(id)
    }

    @Get('/serie/:serie')
    @HttpCode(HttpStatus.OK)
    findBySerie(@Param('serie') serie: string): Promise<Tema[]> {
        return this.temaService.findBySerie(serie)
    }

    @Get('/serie/:educacao')
    @HttpCode(HttpStatus.OK)
    findByEducacao(@Param('educacao') educacao: string): Promise<Tema[]> {
        return this.temaService.findByEducacao(educacao)
    }

    @Get()
    findAll(): Promise<Tema[]> {
        return this.temaService.findAll()
    }
    
    @Post(':id')
    @HttpCode(HttpStatus.OK)
    create(@Body() tema: Tema): Promise<Tema> {
        return this.temaService.create(tema)
    }

    @Put()
    update(@Body() tema: Tema): Promise<Tema> {
        return this.temaService.update(tema)
    }

    @Delete()
    @HttpCode(HttpStatus.OK)
    public delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.temaService.delete(id)
    }

}