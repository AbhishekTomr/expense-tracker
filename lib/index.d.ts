import { LucideProps } from "lucide-react";

interface INavItem {
  id: string;
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}
