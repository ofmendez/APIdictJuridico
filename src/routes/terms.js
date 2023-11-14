import { TermController } from '../controllers/terms.js';

export const createTermRouter = ({ route, model }) => {
	const termController = new TermController({ model });

	route.get('/', termController.getAll);
	route.post('/', termController.create);

	route.get('/:id', termController.getById);
	route.delete('/:id', termController.delete);
	route.patch('/:id', termController.update);
};
