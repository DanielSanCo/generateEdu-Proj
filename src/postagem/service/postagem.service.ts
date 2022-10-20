import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Postagem } from '../entities/postagem.entity';
import { Repository, ILike, DeleteResult } from 'typeorm';

@Injectable()
export class PostagemService {
    constructor(@InjectRepository(Postagem) private postagemRepository: Repository<Postagem>) {}

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find({})
    }

    async findById(id: number): Promise<Postagem> {
        let postagem = await this.postagemRepository.findOne({
            where: {
                id
            }
        })

        if(!postagem)
            throw new HttpException('tema não encontrado', HttpStatus.NOT_FOUND)

        return postagem;
    }

    async findByEducacao(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({ //ILike
            where: {
                titulo: ILike(`%${titulo}%`)
            }
        })
    }

    async findByData(data: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                data_hora: ILike(`%${data}%`)
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem)
    }

    async update(postagem: Postagem): Promise<Postagem> {
        let buscarPostagem = await this.findById(postagem.id)

        if(!buscarPostagem || !postagem.id) {
            throw new HttpException('Tema não existe', HttpStatus.NOT_FOUND)
        }

        return await this.postagemRepository.save(postagem)
    }

    async delete (id: number): Promise<DeleteResult> {
        let buscarPostagem = await this.findById(id)

        if(!buscarPostagem)
            throw new HttpException('Tema não existe', HttpStatus.NOT_FOUND)
        
        return await this.postagemRepository.delete(id)
    }
}