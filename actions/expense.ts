"use server";
import { IBudget, IExpenses } from "@/lib";
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

export const addInitialData = async () => {
  await db.insert(Budgets).values([
    {
      name: "Food",
      amount: "5000",
      icon: "🍕",
      createdBy: "imabhishek111@gmail.com",
    },
    {
      name: "Travel",
      amount: "10000",
      icon: "✈️",
      createdBy: "imabhishek111@gmail.com",
    },
    {
      name: "Shopping",
      amount: "7000",
      icon: "🛍️",
      createdBy: "imabhishek111@gmail.com",
    },
  ]);
  await db.insert(Expenses).values([
    {
      amount: "100",
      description: "Chilli Patato",
      date: new Date("2025-10-20"),
      budgetId: 1,
    },
    {
      amount: "200",
      description: "Flights",
      date: new Date("2025-10-22"),
      budgetId: 2,
    },
    {
      amount: "300",
      description: "LV BAG",
      date: new Date("2025-10-23"),
      budgetId: 3,
    },
    {
      amount: "300",
      description: "Shoes",
      date: new Date("2025-10-25"),
      budgetId: 3,
    },
    {
      amount: "400",
      description: "SAMOSEE",
      date: new Date("2025-10-24"),
      budgetId: 1,
    },
  ]);
};

export const getExpensesByBudget = async (budgetId: number) => {
  return await db
    .select({ ...getTableColumns(Expenses) })
    .from(Expenses)
    .leftJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
    .where(and(eq(Expenses.budgetId, budgetId)));
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
