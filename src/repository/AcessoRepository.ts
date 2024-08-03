import { AppDataSource } from "../data-source";
import { Acesso } from "../entity/Acesso";

export const AcessoRepository = AppDataSource.getRepository(Acesso).extend({

});