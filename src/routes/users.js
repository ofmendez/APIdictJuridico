// import { Router } from 'express'
import { UserController } from '../controllers/users.js';

export const createUserRouter = ({ user, userModel }) => {
  const userController = new UserController({ userModel });

  // const moviesRouter = Router()


  user.get('/', userController.getAll);
  user.post('/', userController.create);

  user.get('/:id', userController.getById);
  user.delete('/:id', userController.delete);
  user.patch('/:id', userController.update);

  // return moviesRouter
};
