import { MovieController } from '../controllers/movies.js';

export const createMovieRouter = ({ movie, movieModel }) => {
	const movieController = new MovieController({ movieModel });

	movie.get('/', movieController.getAll);
	movie.post('/', movieController.create);

	movie.get('/:id', movieController.getById);
	movie.delete('/:id', movieController.delete);
	movie.patch('/:id', movieController.update);
};
