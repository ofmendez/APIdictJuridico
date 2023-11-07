import { randomUUID } from 'node:crypto';
import movies_ from './moviesJson.js';

const movies = JSON.parse(movies_);
export class MovieModel {
	static async getAll ({ genre }) {
		if (genre) {
			return movies.filter((movie) =>
				movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
			);
		}

		return movies;
	}

	static async getById ({ id }) {
		const movie = movies.find((movie) => movie.id.toString() === id.toString());
		return movie;
	}

	static async create ({ input }) {
		const newMovie = {
			id: randomUUID(),
			...input
		};

		movies.push(newMovie);

		return newMovie;
	}

	static async delete ({ id }) {
		const movieIndex = movies.findIndex((movie) => movie.id.toString() === id.toString());
		if (movieIndex === -1) return false;

		movies.splice(movieIndex, 1);
		return true;
	}

	static async update ({ id, input }) {
		const movieIndex = movies.findIndex((movie) => movie.id.toString() === id.toString());
		if (movieIndex === -1) return false;

		movies[movieIndex] = {
			...movies[movieIndex],
			...input
		};

		return movies[movieIndex];
	}
}
