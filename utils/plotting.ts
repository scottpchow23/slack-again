import { Message } from "models/message";

export interface KeywordPlotData {
  x: number;
  y: number;
  name: string;
}

export function messagesToData(messages: Message[]) {
  let dataDictionary: { [id: string]: number } = {};
  messages.forEach((message: Message) => {
    let day = new Date(Number(message.ts) * 1000);
    if (dataDictionary[day.toDateString()]) {
      dataDictionary[day.toDateString()] += 1;
    } else {
      dataDictionary[day.toDateString()] = 1;
    }
  });
  return Object.entries(dataDictionary)
    .map(([key, value]) => {
      return {
        x: new Date(key).getTime(),
        y: value,
        name: key,
      };
    })
    .sort((a, b) => a.x - b.x);
}
