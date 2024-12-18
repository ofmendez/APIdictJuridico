import z from 'zod';

const userSchema = z.object({

	email: z.string().email({
		message: 'Email must be a valid email'
	}),
	password: z.string().min(8, {
		message: 'Password must be at least 8 characters long'
	}),
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters long'
	}),
	profession: z.string().min(2, {
		message: 'Profession must be at least 2 characters long'
	}).optional(),
	suscription: z.string().optional(),
	timeToExpire: z.string().optional(),
	initSuscription: z.date().optional(),
	role: z.enum(['Administrador', 'Editor', 'Lector']).default('user'),
	modules: z.string().optional(),
	lastSearches: z.string().optional(),
	// optional fields
	avatar: z.string().url({
		message: 'Avatar must be a valid URL'
	}).optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional()

});

export function validateUser (input) {
	return userSchema.safeParse(input);
}

export function validatePartialUser (input) {
	return userSchema.partial().safeParse(input);
}
