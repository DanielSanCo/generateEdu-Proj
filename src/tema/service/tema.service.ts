import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tema } from '../entities/tema.entity';
import { Repository, ILike, DeleteResult } from 'typeorm';

@Injectable()
export class TemaService {
    constructor(@InjectRepository(Tema) private TemaRepository: Repository<Tema>) {}

    async findAll(): Promise<Tema[]> {
        return await this.TemaRepository.find({})
    }

    async findById(id: number): Promise<Tema> {
        let tema = await this.TemaRepository.findOne({
            where: {
                id
            }
        })

        if(!tema)
            throw new HttpException('tema não encontrado', HttpStatus.NOT_FOUND)

        return tema;
    }

    async findByEducacao(educacao: string): Promise<Tema[]> {
        return await this.TemaRepository.find({ //ILike
            where: {
                educacao: ILike(`%${educacao}%`)
            }
        })
    }

    async findBySerie(serie: string): Promise<Tema[]> {
        return await this.TemaRepository.find({
            where: {
                serie: ILike(`%${serie}%`)
            }
        })
    }

    async create(tema: Tema): Promise<Tema> {
        return await this.TemaRepository.save(tema)
    }

    async update(tema: Tema): Promise<Tema> {
        let buscarEducacao = await this.findById(tema.id)

        if(!buscarEducacao || !tema.id) {
            throw new HttpException('Tema não existe', HttpStatus.NOT_FOUND)
        }

        return await this.TemaRepository.save(tema)
    }

    async delete (id: number): Promise<DeleteResult> {
        let buscarTema = await this.findById(id)

        if(!buscarTema)
            throw new HttpException('Tema não existe', HttpStatus.NOT_FOUND)
        
        return await this.TemaRepository.delete(id)
    }
}