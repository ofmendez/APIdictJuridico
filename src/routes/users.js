export const createUserRouter = ({ route, userController }) => {
	route.get('/', userController.getAll);
	route.post('/', userController.create);

	route.get('/:id', userController.getById);
	route.delete('/:id', userController.delete);
	route.patch('/:id', userController.update);
};
