import express from 'express';
import AuthController from '../controller/AuthController';

const routes = express.Router();

routes.post("/authenticate", AuthController.authenticate);

export default routes;