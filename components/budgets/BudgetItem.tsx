import { IBudgetItem } from "@/lib";
import Link from "next/link";
import { Button } from "../ui/button";
import { useMemo } from "react";
import { Trash, Pen } from "lucide-react";

type Props = {
  budget: IBudgetItem;
  hideDetailsButton?: boolean;
  onDelete: (budgetId: number) => void;
  onEdit: (budget: IBudgetItem) => void;
};

const BudgetItem = ({
  budget,
  hideDetailsButton = false,
  onDelete,
  onEdit,
}: Props) => {
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
        <div className="flex items-center justify-between">
          <Button asChild className="w-30">
            <Link href={`/expenses/${budget.id}`}>View Details</Link>
          </Button>
          <div className="flex gap-2">
            <Button
              variant={"ghost"}
              className="cursor-pointer"
              onClick={onEdit.bind(null, budget)}
            >
              <Pen size={20} />
            </Button>
            <Button
              variant={"ghost"}
              className="cursor-pointer"
              onClick={onDelete.bind(null, budget.id)}
            >
              <Trash size={20} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
