import { cors } from 'hono/cors';

const ACCEPTED_ORIGINS = [
	'http://localhost:8080',
	'http://localhost:1234'

];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
	cors({
		origin: acceptedOrigins
	});
