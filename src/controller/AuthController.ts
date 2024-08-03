import { Request, Response } from "express";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import bcrypt from 'bcrypt';
import { BadRequestError } from "../helpers/ApiErrors";
import jwt from 'jsonwebtoken';

class AuthController{

    static async authenticate(req: Request, res: Response){

        const { email, senha } = req.body;

        const usuario = await UsuarioRepository.findOneBy({email});

        if (!usuario) {
			throw new BadRequestError('E-mail ou senha inválidos')
		}

        const passwordMatch = await bcrypt.compare(senha, usuario.senha);

        if (!passwordMatch) {
			throw new BadRequestError('E-mail ou senha inválidos')
		}

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_PASS ?? '', {
			expiresIn: '8h',
		})

		const { senha: _, ...userLogin } = usuario

		return res.json({
			user: userLogin,
			token: token,
		})

    }

}

export default AuthController;