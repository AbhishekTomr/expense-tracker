"use client";
import { IBudgetItem, IExpenses, IExpensesItem } from "@/lib";
import React, { useCallback, useEffect, useState } from "react";
import BudgetItem from "./BudgetItem";
import { Skeleton } from "../ui/skeleton";
import AddExpense from "./AddExpense";
import {
  createExpense,
  deleteExpenses,
  getBudgetById,
  getExpensesByBudget,
  editExpense as editExpenseItem,
} from "@/actions/expense";
import _ from "lodash";
import { useUser } from "@clerk/nextjs";
import ExpensesList from "./ExpensesList";

type Props = {
  budgetId: string;
};

const ExpensesHeader = ({ budgetId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedBudget, setSelectedBudget] = useState<IBudgetItem>();
  const [expenses, setExpenses] = useState<IExpensesItem[]>([]);
  const [expense, setExpense] = useState<IExpenses>({
    description: "",
    amount: "",
    date: new Date(),
    budgetId: +budgetId,
  });
  const [isEditingId, setIsEditing] = useState<number>(0);
  // will be zero or some number;

  const onChange = (id: string, value: string | Date) => {
    setExpense((expense: IExpenses) => ({ ...expense, [id]: value }));
  };

  const { user } = useUser();

  const fetchBudgets = useCallback(async () => {
    if (!budgetId) return;
    const budget = (
      await getBudgetById(
        +budgetId,
        user?.primaryEmailAddress?.emailAddress as string
      )
    )[0];
    if (!budget) return;
    const selectedBudget: IBudgetItem = {
      id: budget?.id,
      "budget-name": budget.name,
      "budget-amount": budget.amount,
      createdBy: budget.createdBy,
      emoji: budget.icon || "",
      totalCount: _.toNumber(budget.totalCount),
      totalSpend: _.toNumber(budget.totalSpend),
    };
    setSelectedBudget(selectedBudget);
  }, [user, budgetId]);

  const fetchExpenses = useCallback(async () => {
    const rowExpenses = await getExpensesByBudget(
      +budgetId,
      user?.primaryEmailAddress?.emailAddress as string
    );
    const newExpenses = rowExpenses.map((item) => ({
      id: item.id,
      description: item.description,
      date: item.date,
      amount: item.amount,
      budgetId: item.budgetId || -1,
    }));
    setExpenses(newExpenses);
  }, [budgetId, user]);

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, [fetchBudgets, fetchExpenses]);

  const addExpense = useCallback(
    async (expense: IExpenses) => {
      try {
        setIsLoading(true);
        if (isEditingId) {
          await editExpenseItem({ ...expense, id: isEditingId });
        } else {
          await createExpense(expense);
        }
        await fetchBudgets();
        await fetchExpenses();
        setExpense({
          description: "",
          amount: "",
          date: new Date(),
          budgetId: +budgetId,
        });
      } catch (error) {
        console.error("Error adding expense:", error);
      } finally {
        setIsLoading(false);
        setIsEditing(0);
      }
    },
    [budgetId, fetchBudgets, fetchExpenses, isEditingId]
  );

  const editExpense = useCallback((expense?: IExpensesItem) => {
    if (!expense) {
      setIsEditing(0);
      setExpense({
        description: "",
        amount: "",
        date: new Date(),
        budgetId: +budgetId,
      });
    } else {
      setIsEditing(expense.id);
      setExpense({
        description: expense.description,
        amount: expense.amount,
        date: expense.date,
        budgetId: expense.budgetId,
      });
    }
  }, []);

  const deleteExpenseById = useCallback(
    async (expenseId: number) => {
      await deleteExpenses(expenseId);
      await fetchBudgets();
      await fetchExpenses();
    },
    [fetchExpenses, fetchBudgets]
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 my-5 gap-5">
        {selectedBudget ? (
          <div className="h-[170px]">
            <BudgetItem budget={selectedBudget} hideDetailsButton={true} />
          </div>
        ) : (
          <div className="flex items-center space-x-4 shadow-sm h-40 p-5">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )}
        <AddExpense
          expense={expense}
          onChange={onChange}
          addExpense={addExpense}
          isEditingId={isEditingId}
        />
      </div>
      <div>
        <ExpensesList
          expenses={expenses}
          deleteExpense={deleteExpenseById}
          editExpense={editExpense}
          isEditingId={isEditingId}
        />
      </div>
    </>
  );
};

export default ExpensesHeader;
