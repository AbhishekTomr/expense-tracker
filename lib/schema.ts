import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  numeric,
} from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount").notNull(),
  icon: varchar("icon"),
  createdBy: varchar("createdBy").notNull(),
});

export const Expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  amount: numeric("amount").notNull(),
  description: varchar("description").notNull(),
  date: timestamp("date").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  budgetId: integer("budgetId").references(() => Budgets.id, {
    onDelete: "cascade",
  }),
});
