"use server";
import { IBudget, IExpenses, IExpensesItem } from "@/lib";
import { db } from "@/lib/db-config";
import { Budgets, Expenses } from "@/lib/schema";
import { and, eq, getTableColumns, sql } from "drizzle-orm";

export const getAllBugets = async (userEmail: string) => {
  const result = await db
    .select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`,
      totalCount: sql`count(${Expenses.id})`,
    })
    .from(Budgets)
    .where(eq(Budgets.createdBy, userEmail))
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .groupBy(Budgets.id);
  return result;
};

export const createBudget = async (budget: IBudget) => {
  const result = await db
    .insert(Budgets)
    .values({
      name: budget["budget-name"],
      amount: budget["budget-amount"],
      icon: budget.emoji,
      createdBy: budget.createdBy,
    })
    .returning({ budgetId: Budgets.id });
  return result;
};

export const getExpensesByBudget = async (
  budgetId: number,
  userEmail: string
) => {
  return await db
    .select({ ...getTableColumns(Expenses), budgetName: Budgets.name })
    .from(Expenses)
    .leftJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
    .where(
      and(eq(Expenses.budgetId, budgetId), eq(Budgets.createdBy, userEmail))
    );
};

export const getBudgetById = async (budgetId: number, userEmail: string) => {
  const result = await db
    .select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`,
      totalCount: sql`count(${Expenses.id})`,
    })
    .from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(and(eq(Budgets.id, budgetId), eq(Budgets.createdBy, userEmail)))
    .groupBy(Budgets.id);
  return result;
};

export const createExpense = async (expense: IExpenses) => {
  const result = await db
    .insert(Expenses)
    .values({
      amount: expense.amount,
      description: expense.description,
      date: expense.date,
      budgetId: expense.budgetId,
    })
    .returning({ expenseId: Expenses.id });
  return result;
};

export const deleteExpenses = async (expenseId: number) => {
  const result = await db
    .delete(Expenses)
    .where(eq(Expenses.id, expenseId))
    .returning({ expenseId: Expenses.id });
  return result;
};

export const editExpense = async (expense: IExpensesItem) => {
  const result = await db
    .update(Expenses)
    .set({
      ...expense,
      updatedAt: new Date(),
    })
    .where(eq(Expenses.id, expense.id))
    .returning({ expenseId: Expenses.id });
  return result;
};
