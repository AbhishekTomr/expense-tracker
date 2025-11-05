import { IBudgetItem } from "@/lib";
import Link from "next/link";
import { Button } from "../ui/button";
import { useMemo } from "react";

type Props = {
  budget: IBudgetItem;
  hideDetailsButton?: boolean;
};

const BudgetItem = ({ budget, hideDetailsButton = false }: Props) => {
  const percentage = useMemo(() => {
    if (budget.totalSpend > +budget["budget-amount"]) return 100;
    return (budget.totalSpend / +budget["budget-amount"]) * 100;
  }, [budget]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border-2 flex flex-col gap-2 hover:cursor-pointer">
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
          className={`bg-primary h-2 rounded-2xl`}
          style={{
            width: `${percentage}%`,
          }}
        ></div>
      </div>
      {!hideDetailsButton && (
        <Button asChild className="w-30">
          <Link href={`/expenses/${budget.id}`}>View Details</Link>
        </Button>
      )}
    </div>
  );
};

export default BudgetItem;
