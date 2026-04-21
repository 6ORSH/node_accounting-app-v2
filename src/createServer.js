'use strict';

import express from 'express';
import { expensesRouter } from './routes/expenses.route.js';
import { usersRouter } from './routes/users.route.js';

export const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};
