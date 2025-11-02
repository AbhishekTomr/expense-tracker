"use client";
import { IBudgetItem, IExpenses } from "@/lib";
import React, { useCallback, useEffect, useState } from "react";
import BudgetItem from "./BudgetItem";
import { Skeleton } from "../ui/skeleton";
import AddExpense from "./AddExpense";
import { createExpense, getBudgetById } from "@/actions/expense";
import _ from "lodash";
import { useUser } from "@clerk/nextjs";
import ExpensesList from "./ExpensesList";

type Props = {
  budgetId: string;
};

const ExpensesHeader = ({ budgetId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedBudget, setSelectedBudget] = useState<IBudgetItem>();
  const { user } = useUser();

  const fetchBudgets = useCallback(async () => {
    const budget = (
      await getBudgetById(
        +budgetId,
        user?.primaryEmailAddress?.emailAddress as string
      )
    )[0];
    if (budget) {
      const selectedBudget: IBudgetItem = {
        id: budget.id,
        "budget-name": budget.name,
        "budget-amount": budget.amount,
        createdBy: budget.createdBy,
        emoji: budget.icon || "",
        totalCount: _.toNumber(budget.totalCount),
        totalSpend: _.toNumber(budget.totalSpend),
      };
      return selectedBudget;
    }
  }, [user, budgetId]);

  useEffect(() => {
    fetchBudgets().then((selectedBudget) => setSelectedBudget(selectedBudget));
  }, []);

  const addExpense = async (expense: IExpenses) => {
    setIsLoading(true);
    try {
      await createExpense(expense);
      const updatedBudget = await fetchBudgets();
      if (updatedBudget) {
        setSelectedBudget(updatedBudget);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
        <AddExpense budgetId={+budgetId} addExpense={addExpense} />
      </div>
      <div>
        <ExpensesList
          userEmail={user?.primaryEmailAddress?.emailAddress as string}
          budgetId={+budgetId}
        />
      </div>
    </>
  );
};

export default ExpensesHeader;
