import express from 'express';
import PerfilController from '../controller/PerfilController';

const routes = express.Router();

routes.post("/perfil", PerfilController.create);
routes.put("/perfil/:id", PerfilController.update);

export default routes;