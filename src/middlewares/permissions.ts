import {NextFunction, Request, Response} from "express";
import {PerfilRepository} from "../repository/PerfilRepository";


export function hasAnyPermission(permissions: string[]){
    return async (request: Request, response: Response, next: NextFunction) => {
        const user = request.user;

        const perfilComAcessos = await PerfilRepository.findOne({
            where: { id: user.perfil.id},
            relations: {
                acessos: true
            }
        });
        
        const temAcesso = perfilComAcessos.acessos
            .map((acesso) =>  acesso.nome)
            .some((acesso)=> permissions.includes(acesso));
        
        if(!temAcesso)
            return response.status(403).end();
        
        next();
    }
}

export function hasAllPermissions(permissions: string[]){
    return async (request: Request, response: Response, next: NextFunction) => {
        const user = request.user;

        const perfilComAcessos = await PerfilRepository.findOne({
            where: { id: user.perfil.id},
            relations: {
                acessos: true
            }
        });
        
        const temAcesso = permissions.every((permissao) =>
            perfilComAcessos.acessos.flatMap((acesso) => acesso.nome).includes(permissao)
        );

        
        if(!temAcesso)
            return response.status(403).end();
        
        next();
    }
}