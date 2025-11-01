"use server";
import { IBudget } from "@/lib";
import { db } from "@/lib/db-config";
import { Budgets, Expenses } from "@/lib/schema";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const getAllBugets = async (userEmail: string) => {
  return db
    .select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`,
      totalCount: sql`count(${Expenses.id})`,
    })
    .from(Budgets)
    .where(eq(Budgets.createdBy, userEmail))
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .groupBy(Budgets.id);
};

export const createBudget = async (budget: IBudget) => {
  console.log("its running *********", budget);
  return db
    .insert(Budgets)
    .values({
      name: budget["budget-name"],
      amount: budget["budget-amount"],
      icon: budget.emoji,
      createdBy: budget.createdBy,
    })
    .returning({ budgetId: Budgets.id });
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
