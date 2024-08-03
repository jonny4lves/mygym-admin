import { Request, Response } from "express";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import bcrypt from 'bcrypt';
import { PessoaRepository } from "../repository/PessoaRepository";

class UsuarioController {

    static async create(req: Request, res: Response){

        const { nome, email, senha, perfil, idPessoa } = req.body;

        let pessoa = null;
        if(idPessoa){
            pessoa = await PessoaRepository.findOneBy({id: idPessoa});
        }

        const exists = await UsuarioRepository.exist({where: {email}});

        if(exists){
            return res.status(400).json({message:'Já existe um usuário registrado com esse email'})
        }

        const encodedPassword = await bcrypt.hash(senha, 10)

        const novoUsuario = UsuarioRepository.create({
            nome, email, senha: encodedPassword, perfil, status: 1, pessoa
        });

        await UsuarioRepository.save(novoUsuario);

        const {senha: _, ...usuario} = novoUsuario;

        return res.status(201).json(usuario);

    }

    static async findAll(req: Request, res: Response){
        
        let usuarios = await UsuarioRepository.find({
            relations:{
                perfil:true,
                pessoa: true
            }
        });

        const usuariosDto = usuarios.map((usuario)=> usuario.toDto());
          
        return res.status(200).json(usuariosDto);
    }

}

export default UsuarioController;