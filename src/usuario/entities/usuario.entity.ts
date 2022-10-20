import { IsNotEmpty } from "class-validator";
import { Postagem } from "src/postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_users'})
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 120, nullable: false})
    name: string;

    @IsNotEmpty()
    @Column({length: 30, nullable: false, unique: true})
    nickname: string;

    @IsNotEmpty()
    @Column({length: 120, nullable: false})
    email: string;

    @IsNotEmpty()
    @Column({length: 120, nullable: false})
    password: string;

    @Column({length: 255, nullable: true})
    photo: string;

    @OneToMany(() => Postagem, (Postagem) => Postagem.usuario, {
        onDelete: "CASCADE"
    })
    postagem: Postagem
}