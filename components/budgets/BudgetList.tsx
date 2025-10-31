"use client";
import CreateBudget from "./CreateBudget";

type Props = {};

function BudgetList({}: Props) {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CreateBudget />
      </div>
    </div>
  );
}

export default BudgetList;
