import { v4 as uuidv4 } from 'uuid';

const users = [];

export function reset() {
  users.length = 0;
}

export function getAll() {
  return users;
}

export function getById(id) {
  return users.find((user) => user.id === id);
}

export function create(name) {
  const user = { id: uuidv4(), name };

  users.push(user);

  return user;
}

export function deleteById(id) {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
}

export function update({ id, name }) {
  const user = users.find((u) => u.id === id);

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
}

export function deleteMany(ids) {
  return ids.map(deleteById);
}

export function updateMany(usersToUpdate) {
  return usersToUpdate.map(update);
}

export const usersService = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  deleteMany,
  updateMany,
};
