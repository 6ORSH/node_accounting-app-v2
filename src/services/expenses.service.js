const expenses = [];
let lastExpenseId = 0;

export function reset() {
  expenses.length = 0;
  lastExpenseId = 0;
}

export function getAll(query) {
  const { userId, from, to, categories } = query;

  return expenses.filter((expense) => {
    if (userId && expense.userId !== userId) {
      return false;
    }

    const expenseDate = new Date(expense.spentAt);

    if (from && expenseDate < new Date(from)) {
      return false;
    }

    if (to && expenseDate > new Date(to)) {
      return false;
    }

    if (categories) {
      const categoriesArray = Array.isArray(categories)
        ? categories
        : categories.split(',');

      if (!categoriesArray.includes(expense.category)) {
        return false;
      }
    }

    return true;
  });
}

export function getById(id) {
  return expenses.find((expense) => expense.id === id);
}

export function create({ userId, spentAt, title, amount, category, note }) {
  const newExpense = {
    id: lastExpenseId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  lastExpenseId++;

  expenses.push(newExpense);

  return newExpense;
}

export function deleteById(id) {
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return;
  }

  const [expense] = expenses.splice(index, 1);

  lastExpenseId--;

  return expense;
}

export function update({ id, spentAt, title, amount, category, note }) {
  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return;
  }

  const updates = {};

  if (spentAt !== undefined) {
    updates.spentAt = spentAt;
  }

  if (title !== undefined) {
    updates.title = title;
  }

  if (amount !== undefined) {
    updates.amount = amount;
  }

  if (category !== undefined) {
    updates.category = category;
  }

  if (note !== undefined) {
    updates.note = note;
  }

  return Object.assign(expense, updates);
}

export function deleteMany(ids) {
  return ids.map(deleteById);
}

export function updateMany(expensesToUpdate) {
  return expenses.map(update);
}

export const expensesService = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  deleteMany,
  updateMany,
};
