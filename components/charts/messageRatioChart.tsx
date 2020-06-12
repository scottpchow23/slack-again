import { PieChart, Pie, Legend, Tooltip, PieLabelRenderProps } from "recharts";
import { SimpleData } from "utils/plotting";

const nameAndCountLabel = (entry: PieLabelRenderProps) => {
  return [entry.name, entry.value].join(" | ");
};

export default (props: { messageRatioData: SimpleData[] }) => {
  return (
    <PieChart width={700} height={600}>
      <Pie
        data={props.messageRatioData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#555"
        label={nameAndCountLabel}
      />
      <Tooltip />
    </PieChart>
  );
};
