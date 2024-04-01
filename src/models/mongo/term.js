// const uri = `mongodb://myUserAdmin:${process.env.LINODE_PASS}@172-233-187-25.ip.linodeusercontent.com:27017/?authMechanism=DEFAULT`;
import { MongoClient } from 'mongodb';
import { randomUUID } from 'node:crypto';

const uri = `mongodb+srv://ofmendez:${process.env.ATLAS_PASS}@cluster0.bss36fz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function connect () {
	try {
		await client.connect();
		const database = client.db('dictionary');
		return database.collection('terms');
	} catch (error) {
		console.error('Error connecting to the database');
		console.error(error);
		await client.close();
	}
}

export class TermModel {
	constructor () {
		console.log('->Mongo UserModel');
	};

	setEnv (env) {
		this.env = env;
	};

	async getAll ({ genre }) {
		const db = await connect();

		if (genre)
			return db.find({
				genre: {
					$elemMatch: {
						$regex: genre,
						$options: 'i'
					}
				}
			}).toArray();
		try {
			return await db.find({}).toArray();
		} finally {
			await client.close();
		}
	}

	async download () {
		const db = await connect();
		try {
			return await db.find({}).toArray();
		} finally {
			await client.close();
		}
	}

	async getById ({ id }) {
		const db = await connect();
		// const objectId = new UUID(id);
		try {
			return await db.findOne({ _id: id });
		} finally {
			await client.close();
		}
	}

	async create ({ input }) {
		const db = await connect();
		input._id = randomUUID();
		try {
			const { insertedId } = await db.insertOne(input);
			return {
				id: insertedId,
				...input
			};
		} finally {
			await client.close();
		}
	}

	async update ({ id, input }) {
		const db = await connect();
		// const objectId = new ObjectId(id);
		try {
			const { ok, value } = await db.findOneAndUpdate({ _id: id }, { $set: input }, { returnNewDocument: true });
			if (!ok) return false;
			return value;
		} finally {
			await client.close();
		}
	}

	async delete ({ id }) {
		const db = await connect();
		// const objectId = new ObjectId(id);
		try {
			const { deletedCount } = await db.deleteOne({ _id: id });
			return deletedCount > 0;
		} finally {
			await client.close();
		}
	}

	async search ({ term }) {
		const db = await connect();
		// return db.find({ $text: { $search: term } }).toArray();
		const cursor = db.aggregate(term);
		try {
			const result = await cursor.toArray();
			return {
				term,
				result
			};
		} finally {
			await client.close();
		}
	}
}
