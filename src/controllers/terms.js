/* eslint-disable no-dupe-keys */
import { validateTerm, validatePartialTerm } from '../schemas/terms.js';
import redis from 'redis';

export class TermController {
	constructor ({ model }) {
		this.redisClient = redis.createClient();
		this.termModel = model;
		console.log('TermController', typeof this.termModel);
		this.redisAviable = false;
		this.redisClient.connect();
		this.redisClient.on('connect', () => {
			this.redisAviable = true;
		});
	}

	getAll = async (c) => {
		if (this.redisAviable) console.log('//////// redisAviable');
		const cachedTerms = this.redisAviable ? await this.redisClient.get('terms') : null;
		if (cachedTerms)
			return c.json(JSON.parse(cachedTerms));
		else {
			const { role } = c.req.query();
			const terms = await this.termModel.getAll({ role });
			if (this.redisAviable)
				this.redisClient.set('terms', JSON.stringify(terms), 'EX', 60);
			return c.json(terms);
		}
	};

	getById = async (c) => {
		const { id } = c.req.param();
		const cachedTerm = this.redisAviable ? await this.redisClient.get(`term/${id}`) : null;
		if (cachedTerm)
			return c.json(JSON.parse(cachedTerm));
		else {
			const term = await this.termModel.getById({ id });
			if (this.redisAviable)
				this.redisClient.set(`term/${id}`, JSON.stringify(term), 'EX', 60);
			if (term) return c.json(term);
			return c.json({ message: 'Term not found w', id }, 404);
		}
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

	search = async (c) => {
		console.log('/*/*/*/*/*/*/*/*/*/*/*/ ');
		const body = await c.req.json();
		console.log('body: ', body);
		if (!body) return c.json({ message: 'No search term provided' }, 400);
		if (!body.q) return c.json({ message: 'No search query provided' }, 400);
		const queryCached = encodeURIComponent(JSON.stringify(body));
		const cachedResult = this.redisAviable ? await this.redisClient.get(queryCached) : null;
		if (cachedResult)
			return c.json(JSON.parse(cachedResult));
		else {
			const paths = decodeURIComponent(body.content);
			const subjects = decodeURIComponent(body.subject);
			const pathArray = paths.split(',');
			const subjectArray = subjects.split(',');
			const term = [];
			// Stage 0: Apply Atlas Search with highlighting
			const stage0 =	{
				$search: {
					index: 'default', // Replace with your index name
					text: {
						query: `${body.q}`, // Replace <search term>
						path: pathArray
					},
					highlight: {
						path: pathArray
					}
				}
			};
			term.push(stage0);

			const stage1 = {
				$project: {
					term: 1,
					'meanings.subject': 1,
					score: { $meta: 'searchScore' }, // Include search relevance score
					highlights: { $meta: 'searchHighlights' } // Preserve highlights
				}
			};
			term.push(stage1);
			// Stage 2: Filter by desired subject

			const stage2 =		{
				$match: { 'meanings.subject': { $in: subjectArray } }
			};
			if (subjectArray[0] !== '' && body.subject) term.push(stage2);
			// Stage 3: Unwind the 'meanings' array
			const stage3 = {
				$unwind: '$meanings'
			};
			term.push(stage3);
			// Stage 4: Re-group the results  (Optional)
			const stage4 = {
				$group: {
					_id: '$_id',
					term: { $first: '$term' },
					// meanings: { $push: '$meanings' },
					highlights: { $first: '$highlights' },
					score: { $max: '$score' }
				}
			};
			term.push(stage4);
			const stage5 = {
				$sort: { score: -1 }
			};
			term.push(stage5);
			const result = await this.termModel.search({ term });
			if (this.redisAviable)
				this.redisClient.set(queryCached, JSON.stringify(result), 'EX', 120);
			return c.json(result);
		}
	};
}
