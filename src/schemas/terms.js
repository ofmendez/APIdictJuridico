import z from 'zod';

const termSchema = z.object({

	term: z.string().min(2, {
		message: 'El termino debe tener al menos 2 caracteres'
	}),
	meanings: z.array(
		z.object({
			descriptor: z.string().min(2, {
				message: 'El descriptor debe tener al menos 2 caracteres'
			}),
			year: z.number().int().min(1900).max(2100),
			subject: z.string(
				z.enum(['Jurisprudencia', 'Doctrina', 'Norma']),
				{
					required_error: 'La materia es requerida.',
					invalid_type_error: 'La materia debe ser Jurisprudencia, Doctrina o Norma.'
				}
			),
			definition: z.string().min(2, {
				message: 'La definicion debe tener al menos 2 caracteres'
			}),
			source: z.string().min(2, {
				message: 'La fuente debe tener al menos 2 caracteres'
			})
		})
	).min(1, {
		message: 'Debe tener al menos una definicion'
	}),
	created_at: z.date(),
	updated_at: z.date().optional(),
	created_by: z.string().min(2, {
		message: 'El usuario debe tener al menos 2 caracteres'
	})

});

export function validateTerm (input) {
	return termSchema.safeParse(input);
}

export function validatePartialTerm (input) {
	return termSchema.partial().safeParse(input);
}
