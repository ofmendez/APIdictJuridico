import users_ from './usersJson.js';
import { randomUUID } from 'node:crypto';

const users = JSON.parse(users_);
export class UserModel {
	constructor () {
		console.log('->Local UserModel');
	};

	setEnv (env) {
		this.env = env;
	};

	async getAll ({ role }) {
		if (role)
			return users.filter((user) =>
				user.role.toLowerCase() === role.toLowerCase()
			);

		return users;
	}

	async getById ({ id }) {
		const user = users.find((user) => user.id.toString() === id.toString());
		return user;
	}

	async create ({ input }) {
		const newUser = {
			id: randomUUID(),
			...input
		};

		users.push(newUser);

		return newUser;
	}

	async delete ({ id }) {
		const userIndex = users.findIndex((user) => user.id.toString() === id.toString());
		if (userIndex === -1) return false;

		users.splice(userIndex, 1);
		return true;
	}

	async update ({ id, input }) {
		const userIndex = users.findIndex((user) => user.id.toString() === id.toString());
		if (userIndex === -1) return false;

		users[userIndex] = {
			...users[userIndex],
			...input
		};

		return users[userIndex];
	}
}
