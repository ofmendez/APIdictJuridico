import { validateUser, validatePartialUser } from '../schemas/users.js';

export class UserController {
	constructor ({ userModel }) {
		this.userModel = userModel;
		console.log('UserController', userModel);
	}

	getAll = async (c) => {
		const { role } = c.req.query();
		const users = await this.userModel.getAll({ role });
		return c.json(users);
	};

	getById = async (c) => {
		const { id } = c.req.param();
		const user = await this.userModel.getById({ id });
		if (user) return c.json(user);
		return c.json({ message: 'User not found', id }, 404);
	};

	create = async (c) => {
		const body = await c.req.json();
		console.log('create', body);
		const result = validateUser(body);

		if (!result.success) {
			return c.json({ error: 'unprocessable', message: JSON.parse(result.error.message) }, 422);
			// return c.json({ error: "unprocessable" }, 400);// 422 Unprocessable Entity
		}
		const newUser = await this.userModel.create({ input: result.data });

		return c.json(newUser, 201);
	};

	delete = async (c) => {
		const { id } = c.req.param();
		const result = await this.userModel.delete({ id });

		if (result === false) {
			return c.json({ message: 'User not found' }, 404);
		}

		return c.json({ message: 'User deleted' });
	};

	update = async (c) => {
		const body = await c.req.json();
		const result = validatePartialUser(body);

		if (!result.success) {
			return c.json({ error: JSON.parse(result.error.message) }, 400);
		}

		const { id } = c.req.param();

		const updatedUser = await this.userModel.update({ id, input: result.data });

		return c.json(updatedUser);
	};
}
