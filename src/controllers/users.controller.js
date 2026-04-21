import { usersService } from '../services/users.service.js';

export const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
};

export const getOne = async (req, res) => {
  const user = await usersService.getById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

export const create = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersService.create(name);

  res.status(201).json(user);
};

export const deleteOne = async (req, res) => {
  const user = await usersService.deleteById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

export const update = async (req, res) => {
  const { name } = req.body;
  const user = await usersService.getById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await usersService.update({
    id: req.params.id,
    name,
  });

  res.json(updatedUser);
};

export const usersController = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
