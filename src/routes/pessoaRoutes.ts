import express from 'express';
import PessoaController from '../controller/PessoaController';
import {hasAllPermissions, hasAnyPermission} from "../middlewares/permissions";

const routes = express.Router();

routes.post('/pessoas', hasAnyPermission(['INCLUIR_PESSOA']),PessoaController.create);
routes.get('/pessoas/:id', PessoaController.read);
routes.get('/pessoas', PessoaController.findAll);
routes.put('/pessoas/:id', PessoaController.update);
routes.get("/pessoas/busca/:termo", PessoaController.findByNome);
routes.delete('/pessoas/:id', hasAnyPermission(['EXCLUIR_PESSOA']), PessoaController.delete);
routes.get('/pessoas/:status/:id',hasAllPermissions(['INCLUIR_PESSOA','EXCLUIR_PESSOA']) ,PessoaController.alterarStatus);

export default routes;
