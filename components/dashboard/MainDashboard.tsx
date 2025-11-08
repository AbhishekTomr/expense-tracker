import { IBudgetItem } from "@/lib";
import React from "react";
import CardInfo from "./CardInfo";
import BarChart from "../charts/BarChart";
import BudgetItem from "../budgets/BudgetItem";
import _ from "lodash";
import ExpensesHeader from "../budgets/ExpensesHeader";

type Props = { userName: string; budgets: IBudgetItem[] };

function MainDashboard({ userName, budgets }: Props) {
  return (
    <div>
      <h1 className="my-5 text-3xl capitalize font-bold">Hello, {userName}</h1>
      <p className="text-gray-600 font-semibold">
        Here's whats happening with your money, lets manage your expenses.
      </p>
      <CardInfo budgets={budgets} />
      <div className="grid grid-cols-1 md:grid-cols-3 my-10 gap-6">
        <div className="col-span-2">
          <BarChart budgets={budgets} />
          <div className="my-6 bg-white shadow-2xl p-6 rounded-2xl">
            <ExpensesHeader budgetId={null} />
          </div>
        </div>
        <div>
          <h2 className="text-[20px] font-semibold">Latest Budgets</h2>
          {_.sortBy(budgets, "created_ts")
            .slice(0, 4)
            .map((item) => (
              <div className="my-6" key={item.id}>
                <BudgetItem
                  budget={item}
                  hideDetailsButton={false}
                  hideActionBtns={true}
                  onDelete={(budgetId: number) => {}}
                  onEdit={(budget: IBudgetItem) => {}}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
