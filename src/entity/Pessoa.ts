import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TipoPessoa {
    ALUNO = 1,
    INTERNO = 2,
}

@Entity({name: 'pessoas'})
export class Pessoa{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({type: 'date'})
    dataNasc: Date;

    @Column()
    cpf: string;

    @Column()
    status: number;

    @Column({
        type: "enum",
        enum: TipoPessoa,
    })
    tipo: TipoPessoa;

}