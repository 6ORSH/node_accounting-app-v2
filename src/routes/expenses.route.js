import { Router } from 'express';
import { expensesController } from '../controllers/expenses.controller.js';

export const expensesRouter = Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.get('/:id', expensesController.getOne);
expensesRouter.post('/', expensesController.create);
expensesRouter.delete('/:id', expensesController.deleteOne);
expensesRouter.patch('/:id', expensesController.update);
