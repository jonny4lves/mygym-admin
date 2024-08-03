import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'acessos'})
export class Acesso{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string

    @Column()
    descricao: string;

}