import { MovieController } from '../controllers/movies.js';

export const createMovieRouter = ({ route, model }) => {
	const movieController = new MovieController({ model });

	route.get('/', movieController.getAll);
	route.post('/', movieController.create);

	route.get('/:id', movieController.getById);
	route.delete('/:id', movieController.delete);
	route.patch('/:id', movieController.update);
};
