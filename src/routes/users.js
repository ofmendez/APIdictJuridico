import { UserController } from '../controllers/users.js';

export const createUserRouter = ({ route, model }) => {
	const userController = new UserController({ model });

	route.get('/', userController.getAll);
	route.post('/', userController.create);

	route.get('/:id', userController.getById);
	route.delete('/:id', userController.delete);
	route.patch('/:id', userController.update);
};
