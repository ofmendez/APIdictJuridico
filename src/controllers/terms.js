import { validateTerm, validatePartialTerm } from '../schemas/terms.js';

export class TermController {
	constructor ({ model }) {
		this.termModel = model;
		console.log('TermController', typeof this.termModel);
	}

	getAll = async (c) => {
		const { role } = c.req.query();
		const terms = await this.termModel.getAll({ role });
		return c.json(terms);
	};

	getById = async (c) => {
		const { id } = c.req.param();
		const term = await this.termModel.getById({ id });
		if (term) return c.json(term);
		return c.json({ message: 'Term not found', id }, 404);
	};

	create = async (c) => {
		const body = await c.req.json();
		body.created_at = new Date();
		body.updated_at = new Date();
		console.log('create', body);
		const result = validateTerm(body);

		if (!result.success)
			return c.json({ error: 'unprocessable', message: JSON.parse(result.error.message) }, 422);
			// return c.json({ error: "unprocessable" }, 400);// 422 Unprocessable Entity

		const newTerm = await this.termModel.create({ input: result.data });

		return c.json(newTerm, 201);
	};

	update = async (c) => {
		const body = await c.req.json();
		body.updated_at = new Date();
		const result = validatePartialTerm(body);

		if (!result.success)
			return c.json({ error: JSON.parse(result.error.message) }, 422);

		const { id } = c.req.param();

		const updatedTerm = await this.termModel.update({ id, input: result.data });

		return c.json(updatedTerm);
	};

	delete = async (c) => {
		const { id } = c.req.param();
		const result = await this.termModel.delete({ id });

		if (result === false)
			return c.json({ message: 'Term not found' }, 404);

		return c.json({ message: 'Term deleted' });
	};
}
