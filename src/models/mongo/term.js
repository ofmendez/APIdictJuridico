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

		return db.find({}).toArray();
	}

	async download () {
		const db = await connect();
		return db.find({}).toArray();
	}

	async getById ({ id }) {
		const db = await connect();
		// const objectId = new UUID(id);
		return db.findOne({ _id: id });
	}

	async create ({ input }) {
		const db = await connect();
		input._id = randomUUID();
		const { insertedId } = await db.insertOne(input);

		return {
			id: insertedId,
			...input
		};
	}

	async update ({ id, input }) {
		const db = await connect();
		// const objectId = new ObjectId(id);

		const { ok, value } = await db.findOneAndUpdate({ _id: id }, { $set: input }, { returnNewDocument: true });

		if (!ok) return false;

		return value;
	}

	async delete ({ id }) {
		const db = await connect();
		// const objectId = new ObjectId(id);
		const { deletedCount } = await db.deleteOne({ _id: id });
		return deletedCount > 0;
	}

	async search ({ term }) {
		const db = await connect();
		// return db.find({ $text: { $search: term } }).toArray();
		const cursor = db.aggregate(term);
		const result = await cursor.toArray();
		await client.close();
		return {
			term,
			result
		};
	}
}
