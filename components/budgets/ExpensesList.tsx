"use client";
import { IExpensesItem } from "@/lib";
import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

interface IExpensesProps {
  expenses: IExpensesItem[];
  deleteExpense: (expenseId: number) => Promise<void>;
  editExpense: (expense?: IExpensesItem) => void;
  isEditingId: number;
}

const pageSize = 10;

function ExpensesList({
  expenses,
  deleteExpense,
  editExpense,
  isEditingId,
}: IExpensesProps) {
  const [currentPage, setPage] = useState<number>(1);

  const currentExpenses = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return expenses.slice(start, end);
  }, [currentPage, expenses]);

  return (
    <div className="w-full border-gray-200">
      <Table className="my-5 border-2 rounded-4xl">
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentExpenses.map((item) => (
            <TableRow key={item.id ?? item.description}>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{new Date(item.date).toDateString()}</TableCell>
              <TableCell>{item.budgetId}</TableCell>
              <TableCell width={"100px"}>
                <div className="flex gap-2">
                  <Button
                    className="w-[100px]"
                    onClick={
                      isEditingId
                        ? editExpense.bind(null, undefined)
                        : editExpense.bind(null, item)
                    }
                  >
                    {isEditingId === item.id ? "Cancel" : "Edit"}
                  </Button>
                  <Button
                    className="w-[100px]"
                    onClick={() => deleteExpense(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex gap-2 justify-end">
        <Button
          className="cursor-pointer"
          onClick={() => setPage((current) => current - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
        <Button
          className="cursor-pointer"
          onClick={() => setPage((current) => current + 1)}
          disabled={currentPage > Math.floor(expenses.length / pageSize)}
        >
          Next
        </Button>
      </div>
      {expenses.length === 0 && (
        <div className="p-4 text-center">No expenses found.</div>
      )}
    </div>
  );
}

export default ExpensesList;
