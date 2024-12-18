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
		try {
			return await db.findOne({ _id: id });
		} finally {
			this.closeClient(collectionName);
		}
	}

	async getRandom () {
		const db = await this.connect(collectionName);
		try {
			return await db.aggregate([
				{ $sort: { updated_at: -1 } }, // Sort by updated_at in descending order
				{ $limit: 10 }, // Limit to the last 10 modified terms
				{ $sample: { size: 1 } } // Get a random term from the last 10 modified terms
			]).toArray();
		} finally {
			this.closeClient(collectionName);
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
