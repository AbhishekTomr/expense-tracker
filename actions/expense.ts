"use server";
import { db } from "@/lib/db-config";
import { Budgets } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const getAllBugets = async (userEmail: string) => {
  return db.select().from(Budgets).where(eq(Budgets.createdBy, userEmail));
};
