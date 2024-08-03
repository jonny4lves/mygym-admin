import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Perfil } from "./Perfil";
import { Pessoa } from "./Pessoa";

@Entity({name: 'usuarios'})
export class Usuario{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;
    
    @Column()
    email: string;

    @Column()
    senha: string;

    @ManyToOne(()=> Perfil)
    perfil: Perfil

    @Column()
    status: number;

    @ManyToOne(()=> Pessoa)
    pessoa: Pessoa;

    toDto(): any {
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
            perfil: this.perfil,
            status: this.status,
            pessoa: this.pessoa
          };
    }
    
}