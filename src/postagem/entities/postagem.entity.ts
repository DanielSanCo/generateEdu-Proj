import { IsNotEmpty } from "class-validator";
import { Tema } from "src/tema/entities/tema.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tb_postagem" })
export class Postagem {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 120, nullable: false})
    titulo: string;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    conteudo: string;

    @Column()
    data_hora: string;

    @Column({length: 20, nullable: true})
    curtida: number;

    @ManyToOne(() => Tema, (Tema) => Tema.postagem)
    tema: Tema

    @ManyToOne(() => Usuario, (Usuario) => Usuario.postagem)
    usuario: Usuario
}