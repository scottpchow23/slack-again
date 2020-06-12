import { BarChart, Tooltip, XAxis, YAxis, Bar, Legend } from "recharts";
import { NamedData } from "utils/plotting";

export default (props: { data: NamedData[] }) => {
  return (
    <BarChart width={800} height={500} data={props.data}>
      <Tooltip />
      <XAxis dataKey="displayName" />
      <YAxis />
      <Bar dataKey="value" />
    </BarChart>
  );
};
