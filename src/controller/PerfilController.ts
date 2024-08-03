import {Request, response, Response} from "express";
import {AcessoRepository} from "../repository/AcessoRepository";
import {In} from "typeorm";
import {PerfilRepository} from "../repository/PerfilRepository";
import {NotFoundError} from "../helpers/ApiErrors";

class PerfilController{
    
    static async create(req: Request, res: Response){
        const {nome, idsAcessos } = req.body;
        
        let acessos = [];
        if(idsAcessos){
            acessos = await AcessoRepository.findBy({id: In([...idsAcessos])})
        }
        
        const perfil = PerfilRepository.create({nome, acessos});
        
        await PerfilRepository.save(perfil);
        
        return res.status(200).json(perfil);
    }
        
    static async update(req: Request, res: Response){
        const { id } = req.params;
        const { nome, idsAcessos } = req.body;
        
        let pefil = await PerfilRepository.findOneOrFail({ where: { id: Number(id) } });
        
        if(!pefil)
                throw new NotFoundError("Registro não encotrado");
        
        let acessos = [];
        if(idsAcessos)
                acessos = await AcessoRepository.findBy({id: In([...idsAcessos])})

        pefil.acessos = acessos;
        pefil.nome = nome;
        
        const toUpdate = await PerfilRepository.preload(pefil);
        const perfilAtualizado = await PerfilRepository.save(toUpdate);
        
        return res.status(200).json(perfilAtualizado);
    }

}

export default PerfilController;