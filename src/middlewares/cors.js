import { cors } from 'hono/cors';

const ACCEPTED_ORIGINS = [
	'http://localhost:3000',
	'http://localhost:5173'

];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
	cors({
		origin: acceptedOrigins
	});
