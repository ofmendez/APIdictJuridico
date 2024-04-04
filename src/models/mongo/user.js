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
		// if (genre)
		// 	return db.find({
		// 		genre: {
		// 			$elemMatch: {
		// 				$regex: genre,
		// 				$options: 'i'
		// 			}
		// 		}
		// 	}).toArray();
		try {
			return await db.find({}).toArray();
		} finally {
			this.closeClient();
		}
	}

	async getById ({ id }) {
		const db = await this.connect(collectionName);
		// const objectId = new UUID(id);
		try {
			return await db.findOne({ _id: id });
		} finally {
			this.closeClient(); ;
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
			this.closeClient();
		}
	}

	async delete ({ id }) {
		const db = await this.connect(collectionName);
		// const objectId = new ObjectId(id);
		try {
			const { deletedCount } = await db.deleteOne({ _id: id });
			return deletedCount > 0;
		} finally {
			this.closeClient();
		}
	}

	async update ({ id, input }) {
		const db = await this.connect(collectionName);
		// const objectId = new ObjectId(id);
		try {
			const { ok, value } = await db.findOneAndUpdate({ _id: id }, { $set: input }, { returnNewDocument: true });
			if (!ok) return false;
			return value;
		} finally {
			this.closeClient();
		}
	}
}
