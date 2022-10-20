
import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";

@Injectable()
export class UsuarioService {
    constructor(@InjectRepository(Usuario) private UsuarioRepository: Repository<Usuario>) {}

    async create(usuario: Usuario): Promise<Usuario> {
        return await this.UsuarioRepository.save(usuario)
    }

    async findAll(): Promise<Usuario[]> {
        return await this.UsuarioRepository.find()
    }

    async findOne(id: number): Promise<Usuario> {
        return await this.UsuarioRepository.findOne({
            where: {
                id
            }
        })
    }

    async findByUserName(name: string): Promise<Usuario> {
        return await this.UsuarioRepository.findOne({
            where: {
                name: ILike(`%${name}%`)
            }
        })
    }

    async update(usuario: Usuario): Promise<Usuario> {
        let buscarUsuario = await this.findOne(usuario.id);

        if(!buscarUsuario || !usuario.id) {
            throw new HttpException('usuario não encontrado', HttpStatus.NOT_FOUND)
        }
        return await this.UsuarioRepository.save(usuario)
    }

    async delete(id: number): Promise<DeleteResult> {
        let buscarUsuario = await this.findOne(id)
        
        if(!buscarUsuario) {
            throw new HttpException('usuario não encontrado', HttpStatus.NOT_FOUND)
        }
        return await this.UsuarioRepository.delete(id)
    }
}