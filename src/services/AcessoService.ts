import { AcessoRepository } from "../repository/AcessoRepository";

class AcessoService{

    static async insereAcessosNoBanco(): Promise<void>{
        await AcessoRepository.upsert({id: 1,nome: 'INCLUIR_PESSOA', descricao: 'Controla se o usuário pode incluir uma pessoa'}, ['id']);
        await AcessoRepository.upsert({id: 2,nome: 'EXCLUIR_PESSOA', descricao: 'Controla se o usuário pode excluir uma pessoa'}, ['id']);
    }

}

export default AcessoService;