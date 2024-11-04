import { randomUUID } from 'node:crypto';

const collectionName = 'users';

export class UserModel {
	constructor () {
		console.log('->Mongol UserModel');
	};

	setEnv (connect, closeClient) {
		this.connect = connect;
		this.closeClient = closeClient;
	};

	async getAll ({ genre }) {
		const db = await this.connect(collectionName);
		try {
			return await db.find({}).toArray();
		} finally {
			this.closeClient(collectionName);
		}
	}

	async getById ({ id }) {
		const db = await this.connect(collectionName);
		try {
			return await db.findOne({ _id: id });
		} finally {
			this.closeClient(collectionName); ;
		}
	}

	async create ({ input }) {
		const db = await this.connect(collectionName);
		input._id = randomUUID();
		try {
			const { insertedId } = await db.insertOne(input);
			return {
				id: insertedId,
				...input
			};
		} finally {
			this.closeClient(collectionName);
		}
	}

	async delete ({ id }) {
		const db = await this.connect(collectionName);
		try {
			const { deletedCount } = await db.deleteOne({ _id: id });
			return deletedCount > 0;
		} finally {
			this.closeClient(collectionName);
		}
	}

	async update ({ id, input }) {
		const db = await this.connect(collectionName);
		try {
			const { ok, value } = await db.findOneAndUpdate({ _id: id }, { $set: input }, { returnNewDocument: true });
			if (!ok) return false;
			return value;
		} finally {
			this.closeClient(collectionName);
		}
	}
}
