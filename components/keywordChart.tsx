import { KeywordPlotData } from "utils/plotting";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function (props: { keywordData: KeywordPlotData[] }) {
  return (
    <LineChart width={500} height={500} data={props.keywordData}>
      <Line type="monotone" dataKey="y" stroke="#000"></Line>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}
