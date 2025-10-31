"use server";
import { IBudget } from "@/lib";
import { db } from "@/lib/db-config";
import { Budgets } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const getAllBugets = async (userEmail: string) => {
  return db.select().from(Budgets).where(eq(Budgets.createdBy, userEmail));
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
