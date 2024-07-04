import { validateUser, validatePartialUser } from '../schemas/users.js';
import { scryptSync, randomBytes } from 'node:crypto';
import redis from 'redis';

export class UserController {
	constructor ({ model }) {
		this.userModel = model;
		this.redisClient = redis.createClient();
		this.redisAviable = false;
		this.redisClient.connect();
		this.redisClient.on('connect', () => {
			this.redisAviable = true;
		});
	}

	getAll = async (c) => {
		const cachedUsers = this.redisAviable ? await this.redisClient.get('users') : null;
		if (cachedUsers)
			return c.json(JSON.parse(cachedUsers));
		else {
			const { role } = c.req.query();
			const users = await this.userModel.getAll({ role });
			if (this.redisAviable) {
				await this.redisClient.set('users', JSON.stringify(users));
				await this.redisClient.expire('users', 120);
			}
			return c.json(users);
		}
	};

	getAllRaw = async (c) => {
		const cachedUsers = this.redisAviable ? await this.redisClient.get('users') : null;
		if (cachedUsers)
			return JSON.parse(cachedUsers);
		else {
			const users = await this.userModel.getAll({});
			if (this.redisAviable) {
				await this.redisClient.set('users', JSON.stringify(users));
				await this.redisClient.expire('users', 120);
			}
			return users;
		}
	};

	getById = async (c) => {
		const { id } = c.req.param();
		const user = await this.userModel.getById({ id });
		if (user) return c.json(user);
		return c.json({ message: 'User not found', id }, 404);
	};

	create = async (c) => {
		this.redisClient.del('users');
		console.log('--------->>>> model: ', this.userModel);
		const body = await c.req.json();
		body.initSuscription = new Date(body.initSuscription);
		const result = validateUser(body);

		if (!result.success)
			return c.json({ error: 'unprocessable', message: JSON.parse(result.error.message) }, 422);
		// return c.json({ error: "unprocessable" }, 400);// 422 Unprocessable Entity

		const salt = randomBytes(16).toString('hex');
		const hash = scryptSync(result.data.password + process.env.OFPEPE, salt, 64).toString('hex');
		result.data.email = result.data.email.toLowerCase();
		result.data.password = hash;
		result.data.salt = salt;

		console.log('PEPE : ', process.env.OFPEPE);
		console.log('created r d: ', result.data);
		const newUser = await this.userModel.create({ input: result.data });

		return c.json(newUser, 201);
	};

	delete = async (c) => {
		this.redisClient.del('users');
		const { id } = c.req.param();
		const result = await this.userModel.delete({ id });

		if (result === false)
			return c.json({ message: 'User not found' }, 404);

		return c.json({ message: 'User deleted' });
	};

	update = async (c) => {
		this.redisClient.del('users');
		const body = await c.req.json();
		body.initSuscription = new Date(body.initSuscription);
		const result = validatePartialUser(body);

		if (!result.success)
			return c.json({ error: JSON.parse(result.error.message) }, 400);

		const { id } = c.req.param();

		const updatedUser = await this.userModel.update({ id, input: result.data });

		return c.json(updatedUser);
	};
}
