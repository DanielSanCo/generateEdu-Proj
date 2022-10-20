import { Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Body, Param } from "@nestjs/common"
import { DeleteResult } from "typeorm"
import { Usuario } from "../entities/usuario.entity"
import { UsuarioService } from "../service/usuario.service"

@Controller('/user')
export class UsuarioController {

    constructor(private readonly UsuarioService: UsuarioService) {}
    
    @Post()
    @HttpCode(HttpStatus.OK)
    create(@Body() usuario: Usuario): Promise<Usuario> {
        return this.UsuarioService.create(usuario)
    }

    @Get()
    getAll(): Promise<Usuario[]> {
        return this.UsuarioService.findAll()
    }

    @Get('/:id')
    getOne(id: number): Promise<Usuario> {
        return this.UsuarioService.findOne(id)
    }

    @Get(':nome')
    getByUserName(@Body('nome') name: string): Promise<Usuario> {
        return this.UsuarioService.findByUserName(name)
    }

    @Put(':usuario')
    update(@Body('usuario') usuario: Usuario): Promise<Usuario> {
        return this.UsuarioService.update(usuario)
    }

    @Delete(':id')
    delete(@Body('id') id: number): Promise<DeleteResult> {
        return this.UsuarioService.delete(id)
    }
}