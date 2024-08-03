import { Request, Response } from "express";
import { PessoaRepository } from "../repository/PessoaRepository";
import { BadRequestError, NotFoundError } from "../helpers/ApiErrors";

class PessoaController{

    static async create(req: Request, res: Response){
        const { nome, dataNasc, cpf, tipo } = req.body;

        try {
            const novopessoa = PessoaRepository.create({nome, dataNasc,cpf, status: 1, tipo});

            await PessoaRepository.save(novopessoa);

            return res.status(201).json(novopessoa);
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server error: '+ error})
        }
    }

    static async read(req: Request, res: Response){
        const { id } = req.params;

        try {
            const pessoa = await PessoaRepository.exist({where:{id: Number(id)}});
            if(!pessoa)
                throw new NotFoundError("Registro não encontrado");
            
            return res.status(200).json(pessoa);

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server error: ' + error});
        }

    }

    static async findAll(req: Request, res: Response){
        try {
            const pessoas = await PessoaRepository.find();

            return res.status(200).json(pessoas);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server error: ' + error});
        }
    }

    static async update(req: Request, res: Response){
        const { id } = req.params;
        const { nome, dataNasc, cpf } = req.body;
        
        try {
            const exists = await PessoaRepository.exist({where: { id: Number(id)}});

            if(!exists)
                return res.status(404).json({message: 'Registro não encontrado'});

            await PessoaRepository.update({id: Number(id)}, {nome, dataNasc, cpf}); 

            const pessoaAtualizada = await PessoaRepository.findOneBy({id: Number(id)})

            return res.status(200).json(pessoaAtualizada);
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server error: ' + error});
        }
    }

    static async delete(req: Request, res: Response){
        const { id } = req.params

        try {
            await PessoaRepository.delete({id: Number(id)});

            return res.status(200).json({message: 'Registro excluído com sucesso'});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server error: ' + error});
        }
    }

    static async alterarStatus(req: Request, res: Response){
        const { id, status } = req.params;

        try {
            const exists = await PessoaRepository.exist({where:{id: Number(id)}});
    
            if(!exists){
                throw new NotFoundError('Pessoa não encontrada');
            }

            if(!status) throw new BadRequestError("É preciso informar qual alteração de status deseja fazer");
            if(!['ativar','inativar'].includes(status)) throw new BadRequestError("Informar um ação válida: ativar ou inativar");
    
            await PessoaRepository.update({id: Number(id)},{status: status == 'ativar' ? 1 : 0});
    
            return res.status(200).json({message: 'Status alterado com sucessa'});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server error: ' + error});
        }

    }

    static async findByNome(req: Request, res: Response){
        try {
            const {termo} = req.params;
    
            const users = await PessoaRepository.createQueryBuilder("p").where(
                "p.nome like("+ "'%"+ termo+ "%') AND p.status = 1 and p.tipo = '2'"
            ).getMany();
    
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server error: ' + error});
        }
    }
}


export default PessoaController;