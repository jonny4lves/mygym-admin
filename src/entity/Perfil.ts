import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Acesso } from "./Acesso";

@Entity({name: 'perfil'})
export class Perfil{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @ManyToMany(()=> Acesso, {
        cascade: true
    })
    @JoinTable({name: 'perfil_acessos'})
    acessos: Acesso[];

}