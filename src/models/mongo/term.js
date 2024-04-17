// const uri = `mongodb://myUserAdmin:${process.env.LINODE_PASS}@172-233-187-25.ip.linodeusercontent.com:27017/?authMechanism=DEFAULT`;
import { randomUUID } from 'node:crypto';

const collectionName = 'terms';

export class TermModel {
	constructor () {
		console.log('->Mongo TermModel');
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
			this.closeClient(collectionName);
		}
	}

	async download () {
		const db = await this.connect(collectionName);
		try {
			return await db.find({}).toArray();
		} finally {
			this.closeClient(collectionName);
		}
	}

	async getById ({ id }) {
		const db = await this.connect(collectionName);
		// const objectId = new UUID(id);
		try {
			return await db.findOne({ _id: id });
		} finally {
			this.closeClient(collectionName);
		}
	}

	async getRandom () {
		const db = await this.connect(collectionName);
		try {
			return await db.aggregate([{ $sample: { size: 1 } }]).toArray();
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

	async update ({ id, input }) {
		const db = await this.connect(collectionName);
		// const objectId = new ObjectId(id);
		try {
			const { ok, value } = await db.findOneAndUpdate({ _id: id }, { $set: input }, { returnNewDocument: true });
			if (!ok) return false;
			return value;
		} finally {
			this.closeClient(collectionName);
		}
	}

	async delete ({ id }) {
		const db = await this.connect(collectionName);
		// const objectId = new ObjectId(id);
		try {
			const { deletedCount } = await db.deleteOne({ _id: id });
			return deletedCount > 0;
		} finally {
			this.closeClient(collectionName);
		}
	}

	async search ({ term }) {
		const db = await this.connect(collectionName);
		// return db.find({ $text: { $search: term } }).toArray();
		const cursor = db.aggregate(term);
		try {
			const result = await cursor.toArray();
			return {
				term,
				result
			};
		} finally {
			this.closeClient(collectionName);
		}
	}
}
