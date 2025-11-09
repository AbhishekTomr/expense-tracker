import { IBudgetItem } from "@/lib";
import _ from "lodash";
import { Wallet, PiggyBank, ReceiptIcon } from "lucide-react";

type Props = {
  budgets: IBudgetItem[];
};

const CardInfo = ({ budgets }: Props) => {
  const totalBudget = budgets.reduce(
    (sum: number, currentItem: IBudgetItem) => {
      return sum + _.toNumber(currentItem["budget-amount"]);
    },
    0
  );
  const totalExpense = budgets.reduce(
    (sum: number, currentItem: IBudgetItem) => {
      return sum + _.toNumber(currentItem["totalSpend"]);
    },
    0
  );
  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <div className="border-2 rounded-lg p-7 shadow-2xl">
        <h2>Total Budgets :</h2>
        <span className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{totalBudget}</h2>
          <PiggyBank className="bg-primary rounded-4xl h-10 w-10 text-white p-3" />
        </span>
      </div>
      <div className="border-2 rounded-lg p-7 shadow-2xl">
        <h2>Total Spend :</h2>
        <span className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{totalExpense}</h2>
          <ReceiptIcon className="bg-primary rounded-4xl h-10 w-10 text-white p-3" />
        </span>
      </div>
      <div className="border-2 rounded-lg p-7 shadow-2xl">
        <h2>Number Of Budgets :</h2>
        <span className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{budgets.length}</h2>
          <Wallet className="bg-primary rounded-4xl h-10 w-10 text-white p-3" />
        </span>
      </div>
    </div>
  );
};

export default CardInfo;
