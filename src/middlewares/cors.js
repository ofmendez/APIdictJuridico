import { cors } from 'hono/cors';

const ACCEPTED_ORIGINS = (o) => {
	const result = ['http://localhost:5173'];
	if (o.startsWith('http://localhost') || o.startsWith('https://diccionarioexplore.com') || o.endsWith('.diccionariojuridicoadmin.pages.dev')) {
		result.push(o);
		console.log(result);
	}
	return result;
};

export const corsMiddleware = () =>
	cors({
		origin: (o) => {
			let result = 'http://localhost:5173';
			if (o.startsWith('http://localhost') || o.startsWith('https://diccionarioexplore.com') || o.endsWith('.diccionariojuridicoadmin.pages.dev') || o.endsWith('.diccionarioexplore.com'))
				result = o;

			return result;
		}
	});
