import express from "express";
import {authMiddleware} from "../middlewares/AuthMiddlware";
import usuarios from '../routes/usuarioRoutes';
import pessoas from './pessoaRoutes';
import authenticate from '../routes/authRoutes';
import perfil from '../routes/perfilRoutes';
import cors from 'cors';

const routes = (app) => {
    app.use(
     express.json(),
     cors(),
     authenticate,
     usuarios,
     authMiddleware,
     perfil,
     pessoas,
    );
    
};

export default routes;