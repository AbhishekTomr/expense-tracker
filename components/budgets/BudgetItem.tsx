import { IBudgetItem } from "@/lib";

type Props = {
  budget: IBudgetItem;
};

const BudgetItem = ({ budget }: Props) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-2">
      <div className="flex gap-2 font-bold">
        <div className="text-2xl">{budget.emoji}</div>
        <div className="text-lg">{budget["budget-name"]}</div>
      </div>
      <div className="flex justify-between font-semibold">
        <div>{`${budget["totalCount"]} Items Added`}</div>
        <div className="text-primary">{`Total : ${budget["budget-amount"]}`}</div>
      </div>
      <div>Total Spend: {budget.totalSpend}</div>
      <div className="w-full bg-slate-300 h-2 rounded-2xl my-2">
        <div
          className="bg-primary h-2 rounded-2xl"
          style={{
            width: `${(budget.totalSpend / +budget["budget-amount"]) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default BudgetItem;
