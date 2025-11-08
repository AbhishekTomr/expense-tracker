"use client";
import { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import {
  deleteBudget,
  getAllBugets,
  editBudget as editBudgetItem,
} from "@/actions/expense";
import { useUser } from "@clerk/nextjs";
import { IBudgetItem } from "@/lib";
import _, { set } from "lodash";
import BudgetItem from "./BudgetItem";
import { Skeleton } from "../ui/skeleton";

function BudgetList() {
  const [budgets, setBudgets] = useState<IBudgetItem[]>([]);
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editBudget, setEditBudget] = useState<IBudgetItem | null>(null);

  const fetchBudgets = (emailAddress: string) => {
    getAllBugets(emailAddress).then((budgets) => {
      const currentBudgets: IBudgetItem[] = budgets.map(
        ({ id, name, amount, icon, createdBy, totalSpend, totalCount }) => ({
          id,
          "budget-name": name,
          "budget-amount": amount,
          emoji: icon || "",
          createdBy: createdBy,
          totalSpend: _.toNumber(totalSpend) || 0,
          totalCount: _.toNumber(totalCount) || 0,
        })
      );
      setBudgets(currentBudgets);
    });
  };

  const onDeleteBudget = (budgetId: number) => {
    deleteBudget(budgetId).then(() => {
      fetchBudgets(user?.primaryEmailAddress?.emailAddress ?? "");
    });
  };

  const onEditBudget = (budget: IBudgetItem) => {
    setIsOpen(true);
    setEditBudget(budget);
  };

  const saveEditBudget = (editBudget: IBudgetItem) => {
    editBudgetItem(editBudget).then((res) => {
      fetchBudgets(user?.primaryEmailAddress?.emailAddress ?? "");
      setEditBudget(null);
    });
  };

  useEffect(() => {
    if (isOpen) return;
    fetchBudgets(user?.primaryEmailAddress?.emailAddress ?? "");
  }, [user?.primaryEmailAddress?.emailAddress, isOpen]);

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editBudget={editBudget}
          saveEditBudget={saveEditBudget}
        />
        {budgets.length ? (
          <>
            {budgets.map((item: IBudgetItem) => (
              <BudgetItem
                key={item["budget-name"]}
                budget={item}
                onDelete={onDeleteBudget}
                onEdit={onEditBudget}
              />
            ))}
          </>
        ) : (
          <>
            {" "}
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                className="flex items-center space-x-4 shadow-sm h-40 p-5"
                key={item}
              >
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default BudgetList;
