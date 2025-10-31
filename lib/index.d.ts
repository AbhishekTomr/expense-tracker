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
