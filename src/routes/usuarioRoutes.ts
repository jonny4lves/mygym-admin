import express from 'express';
import UsuarioController from '../controller/UsuarioController';

const routes = express.Router();

routes.post('/usuarios/novo', UsuarioController.create);
routes.get('/usuarios', UsuarioController.findAll);

export default routes;