import { Usuario } from '../../entity/Usuario'

declare global {
	namespace Express {
		export interface Request {
			user: Partial<Usuario>
		}
	}
}