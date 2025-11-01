import { getBudgetById } from "@/actions/expense";
import AddExpense from "@/components/budgets/AddExpense";
import BudgetItem from "@/components/budgets/BudgetItem";
import ExpensesHeader from "@/components/budgets/ExpensesHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { IBudgetItem } from "@/lib";
import _ from "lodash";

const BudgetDetailsPage = async ({
  params,
}: {
  params: { budgetId: string };
}) => {
  const { budgetId } = await params;
  return (
    <>
      <h2 className="text-2xl font-bold">My Expenses</h2>
      <ExpensesHeader budgetId={budgetId} />
      <div>
        {/* {expense.map((item) => (
          <div key={item.id}>
            <div>{item.description}</div>
            <div>{item.amount}</div>
          </div>
        ))} */}
      </div>
    </>
  );
};

export default BudgetDetailsPage;
