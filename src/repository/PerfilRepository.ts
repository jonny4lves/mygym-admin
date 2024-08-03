import { AppDataSource } from "../data-source";
import { Perfil } from "../entity/Perfil";

export const PerfilRepository = AppDataSource.getRepository(Perfil).extend({
    
});