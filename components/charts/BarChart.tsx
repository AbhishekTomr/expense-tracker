import { IBudgetItem } from "@/lib";
import {
  Bar,
  Legend,
  BarChart as ReBarCharts,
  ResponsiveContainer,
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
      <ResponsiveContainer width={"100%"} height={300}>
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
      </ResponsiveContainer>
    </div>
  );
}

export default BarChart;
