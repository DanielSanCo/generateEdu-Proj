import { IsNotEmpty } from "class-validator";
import { Postagem } from "src/postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tb_tema" })
export class Tema {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 120, nullable: false})
    educacao: string;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    serie: string;

    @OneToMany(() => Postagem, (Postagem) => Postagem.tema, {
        onDelete: "CASCADE"
    })
    postagem: Postagem
}