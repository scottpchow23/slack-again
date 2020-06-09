import { PieChart, Pie, Legend, Tooltip } from "recharts";
import { PlotData } from "utils/plotting";

export default (props: { messageRatioData: PlotData[] }) => {
  return (
    <PieChart width={500} height={700}>
      <Pie
        data={props.messageRatioData}
        dataKey="y"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        label
      />
      <Legend />
      <Tooltip />
    </PieChart>
  );
};
