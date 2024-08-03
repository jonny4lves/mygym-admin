import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";

export const UsuarioRepository = AppDataSource.getRepository(Usuario).extend({
    
})