import { NextFunction, Request, Response } from "express"
import { UnauthorizedError } from "../helpers/ApiErrors"
import { UsuarioRepository } from "../repository/UsuarioRepository"
import jwt from 'jsonwebtoken';


type JwtPayload = {
	id: number
}

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { authorization } = req.headers

	if (!authorization) {
		throw new UnauthorizedError('Não autorizado')
	}

	const token = authorization.split(' ')[1]	

	try {
		const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload
	
		const user = await UsuarioRepository.findOne(
			{
				where: {id: Number(id)},
				relations: {perfil: true}
			},
		);
	
		if (!user) {
			throw new UnauthorizedError('Não autorizado')
		}
	
		const { senha: _, ...loggedUser } = user
	
		req.user = loggedUser
	
		next()
	} catch (error) {
		throw new UnauthorizedError("Não autorizado");
	}
}