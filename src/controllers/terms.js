/* eslint-disable no-dupe-keys */
import { validateTerm, validatePartialTerm } from '../schemas/terms.js';
import redis from 'redis';
import { randomUUID } from 'node:crypto';

export class TermController {
	constructor ({ model }) {
		this.termModel = model;
		this.redisClient = redis.createClient();
		this.redisAviable = false;
		this.redisClient.connect();
		this.redisClient.on('connect', () => {
			this.redisAviable = false;
		});
	}

	getAll = async (c) => {
		const cachedTerms = this.redisAviable ? await this.redisClient.get('terms') : null;
		if (cachedTerms)
			return c.json(JSON.parse(cachedTerms));
		else {
			const { role } = c.req.query();
			// this.termModel.setMeaningIds();
			const terms = await this.termModel.getAll({ role });
			if (this.redisAviable) {
				await this.redisClient.set('terms', JSON.stringify(terms));
				await this.redisClient.expire('terms', 120);
			}
			return c.json(terms);
		}
	};

	download = async (c) => {
		let result = '';
		const cachedTerms = this.redisAviable ? await this.redisClient.get('downloadTerms') : null;
		// const cachedTerms = null;
		if (cachedTerms)
			result = JSON.parse(cachedTerms);
		else {
			const termsUnordered = await this.termModel.download();
			const subjectOrder = ['Norma', 'Jurisprudencia', 'Doctrina', 'MATERIA'];
			/* ordena los meanings de cada termino por materia y luego por año */
			termsUnordered.forEach((t) => {
				t.meanings.sort((a, b) => {
					if (a.subject === b.subject && a.year === b.year)
						return a.descriptor.localeCompare(b.descriptor, undefined, { numeric: true, sensitivity: 'base' });
					if (a.subject === b.subject)
						return b.year - a.year;
					return subjectOrder.indexOf(a.subject) - subjectOrder.indexOf(b.subject);
				});
			});
			const terms = termsUnordered.sort((a, b) => a.term.localeCompare(b.term, undefined, { numeric: true, sensitivity: 'base' }));
			terms.forEach((t, i) => {
				result += `\n\n${i + 1}) ${t.term}\n\n`;
				t.meanings.forEach((m, i) => {
					result += `DESCRIPTOR: ${m.descriptor}\n`;
					result += `AÑO: ${m.year}\n`;
					result += `MATERIA: ${m.subject}\n`;
					result += `${m.definition}\n`;
					result += `FUENTE: ${m.source}\n`;
					result += m.file ? `ENLACE: ${m.file}\n\n` : 'ENLACE: (pendiente) \n\n';
				});
			});
			// result = convertArrayToCSV(terms);
			if (this.redisAviable) {
				await this.redisClient.set('downloadTerms', JSON.stringify(result));
				await this.redisClient.expire('downloadTerms', 120);
			}
		}
		return c.text(result, {
			headers: {
				'Content-Type': 'text/txt',
				'Content-Disposition': 'attachment; filename=Términos.csv'
			}
		});
	};

	getById = async (c) => {
		const { id } = c.req.param();
		const cachedTerm = this.redisAviable ? await this.redisClient.get(`term/${id}`) : null;
		if (cachedTerm)
			return c.json(JSON.parse(cachedTerm));
		else {
			const term = await this.termModel.getById({ id });
			if (this.redisAviable) {
				await this.redisClient.set(`term/${id}`, JSON.stringify(term));
				await this.redisClient.expire(`term/${id}`, 120);
			}
			if (term) return c.json(term);
			return c.json({ message: 'Term not found w', id }, 404);
		}
	};

	getRandom = async (c) => {
		const term = await this.termModel.getRandom();
		if (term) return c.json(term);
		return c.json({ message: 'Term not generated' }, 404);
	};

	create = async (c) => {
		this.redisClient.del('terms');
		const body = await c.req.json();
		body.created_at = new Date();
		body.updated_at = new Date();
		body.meanings.forEach((m) => {
			m._id = randomUUID();
		});
		const result = validateTerm(body);

		console.log('create', body);
		if (!result.success)
			return c.json({ error: 'unprocessable', message: JSON.parse(result.error.message) }, 422);

		const newTerm = await this.termModel.create({ input: result.data });
		return c.json(newTerm, 201);
	};

	update = async (c) => {
		this.redisClient.del('terms');
		const body = await c.req.json();
		body.updated_at = new Date();
		body.meanings.forEach((m) => {
			if (!m._id)
				m._id = randomUUID();
		});
		const result = validatePartialTerm(body);
		if (!result.success)
			return c.json({ error: JSON.parse(result.error.message) }, 422);

		const { id } = c.req.param();
		const updatedTerm = await this.termModel.update({ id, input: result.data });
		return c.json(updatedTerm);
	};

	delete = async (c) => {
		this.redisClient.del('terms');
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

		const quotedPhrases = body.q.match(/"([^"]+)"/g) || [];
		const individualWords = body.q.split(/"([^"]+)"|\s+/).filter(Boolean);
		console.log('quotedPhrases: ', quotedPhrases);
		console.log('individualWords: ', individualWords);

		if (cachedResult)
			return c.json(JSON.parse(cachedResult));
		else {
			const paths = decodeURIComponent(body.content);
			const subjects = decodeURIComponent(body.subject);
			const pathArray = paths.split(',');
			const subjectArray = subjects.split(',');
			const term = [];
			let theCompound = {};
			if (quotedPhrases.length > 0) {
				const compound = {
					must: quotedPhrases.map(phrase => ({
						phrase: {
							query: phrase,
							path: pathArray
						}
					}))
				};
				theCompound = compound;
			} else {
				const compound = {
					should: individualWords.map(word => ({
						text: {
							query: word,
							path: pathArray
						}
					}))
				};
				theCompound = compound;
			}
			// Stage 0: Apply Atlas Search with highlighting
			const stage0 = {
				$search: {
					index: 'default', // Replace with your index name
					compound: theCompound,
					highlight: {
						path: pathArray,
						maxNumPassages: 1
					}
				}
			};
			term.push(stage0);
			const stage2 = {
				$match: { 'meanings.subject': { $in: subjectArray } }
			};
			if (subjectArray[0] !== '' && body.subject) term.push(stage2);

			const stage1 = {
				$project: {
					_id: 1,
					term: 1,
					meanings: 1,
					score: { $meta: 'searchScore' }, // Include search relevance score
					highlights: { $meta: 'searchHighlights' } // Preserve highlights
				}
			};
			term.push(stage1);
			// Stage 2: Filter by desired subject

			// Stage 3: Unwind the 'meanings' array
			const stage3 = {
				$unwind: '$meanings'
			};
			// term.push(stage3);
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
			// term.push(stage4);
			const stage5 = {
				$sort: { score: -1 }
			};
			term.push(stage5);
			const result = await this.termModel.search({ term });
			if (this.redisAviable) {
				await this.redisClient.set(queryCached, JSON.stringify(result));
				await this.redisClient.expire(queryCached, 120);
			}
			return c.json(result);
		}
	};
}
