import { AppDataSource } from "../data-source";
import { Pessoa } from "../entity/Pessoa";

export const PessoaRepository = AppDataSource.getRepository(Pessoa).extend({

})