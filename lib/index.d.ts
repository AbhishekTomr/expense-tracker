import { LucideProps } from "lucide-react";

interface INavItem {
  id: string;
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

interface IBudget {
  "budget-name": string;
  "budget-amount": string;
  emoji: string;
  createdBy: string;
}

interface IBudgetItem extends IBudget {
  id: number;
  totalSpend: number;
  totalCount: number;
}

interface IExpenses {
  description: string;
  amount: string;
  date: Date;
  budgetId: number;
}

interface IExpensesItem extends IExpenses {
  id: number;
  budgetName?: string;
}
