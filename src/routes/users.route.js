import { Router } from 'express';
import { usersController } from '../controllers/users.controller.js';

export const usersRouter = Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:id', usersController.getOne);
usersRouter.post('/', usersController.create);
usersRouter.delete('/:id', usersController.deleteOne);
usersRouter.patch('/:id', usersController.update);
