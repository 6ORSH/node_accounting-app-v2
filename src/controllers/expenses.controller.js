import { expensesService } from '../services/expenses.service.js';
import { usersService } from '../services/users.service.js';

export const getAll = async (req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.json(expenses);
};

export const getOne = async (req, res) => {
  const id = +req.params.id;

  if (!Number.isInteger(id)) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

export const create = async (req, res) => {
  const userId = req.body.userId;

  const user = await usersService.getAll().find((u) => u.id === userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const expenseToCreate = req.body;

  const expense = await expensesService.create(expenseToCreate);

  res.status(201).json(expense);
};

export const deleteOne = async (req, res) => {
  const id = +req.params.id;

  const expense = await expensesService.deleteById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

export const update = async (req, res) => {
  const id = +req.params.id;
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expensesService.update({
    id,
    ...req.body,
  });

  res.json(updatedExpense);
};

export const expensesController = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
