import movies_ from './moviesJson.js';
import { randomUUID } from 'node:crypto';

const movies = JSON.parse(movies_);
export class MovieModel {
	constructor () {
		console.log('->Local MovieModel');
	};

	setEnv (env) {
		this.env = env;
	};

	async getAll ({ genre }) {
		if (genre)
			return movies.filter((movie) =>
				movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
			);

		return movies;
	}

	async getById ({ id }) {
		const movie = movies.find((movie) => movie.id.toString() === id.toString());
		return movie;
	}

	async create ({ input }) {
		const newMovie = {
			id: randomUUID(),
			...input
		};

		movies.push(newMovie);

		return newMovie;
	}

	async delete ({ id }) {
		const movieIndex = movies.findIndex((movie) => movie.id.toString() === id.toString());
		if (movieIndex === -1) return false;

		movies.splice(movieIndex, 1);
		return true;
	}

	async update ({ id, input }) {
		const movieIndex = movies.findIndex((movie) => movie.id.toString() === id.toString());
		if (movieIndex === -1) return false;

		movies[movieIndex] = {
			...movies[movieIndex],
			...input
		};

		return movies[movieIndex];
	}
}
