import { IBudgetItem } from "@/lib";
import {
  Bar,
  Legend,
  BarChart as ReBarCharts,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  budgets: IBudgetItem[];
};

function BarChart({ budgets }: Props) {
  return (
    <div className="border-2 shadow-2xl rounded-2xl p-10">
      <ReBarCharts
        width={500}
        height={300}
        data={budgets}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <XAxis dataKey={"budget-name"} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={"totalSpend"} stackId={"a"} fill={"#4845d2"} />
        <Bar dataKey={"budget-amount"} stackId={"a"} fill={"#C3C2FF"} />
      </ReBarCharts>
    </div>
  );
}

export default BarChart;
