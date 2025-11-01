import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import DatePicker from "../common/DatePicker";
import { IExpenses } from "@/lib";

type Props = {
  budgetId: number;
  addExpense: (expense: IExpenses, formData: FormData) => void;
};

function AddExpense({ budgetId, addExpense }: Props) {
  const [expense, setExpense] = useState<IExpenses>({
    description: "",
    amount: "",
    date: new Date(),
    budgetId,
  });

  const onChange = (id: string, value: string | Date) => {
    setExpense((expense: IExpenses) => ({ ...expense, [id]: value }));
  };

  return (
    <div className="border-2 p-5 shadow-md rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <form
        action={addExpense.bind(null, expense)}
        id="create-expense"
        className="mt-9"
      >
        <div className="my-2 flex flex-col gap-2">
          <Label className="" htmlFor="description">
            Expense Name
          </Label>
          <Input
            id="description"
            name="description"
            className=""
            placeholder="eg. Sandwich"
            value={expense.description}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const value = event.target.value;
              onChange("description", value);
            }}
          />
        </div>
        <div className="my-2 flex flex-col gap-2">
          <Label className="" htmlFor="amount">
            Expense Amount
          </Label>
          <Input
            id="amount"
            name="amount"
            className=""
            placeholder="eg. 5000"
            type="number"
            value={expense.amount}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const value = event.target.value;
              onChange("amount", value);
            }}
          />
        </div>
        <DatePicker
          date={expense.date}
          setDate={(date: Date) => {
            onChange("date", date);
          }}
        />
        <Button form="create-expense" type="submit" className="w-full mt-5">
          Add Expense
        </Button>
      </form>
    </div>
  );
}

export default AddExpense;
