import { Message } from "models/message";
import { User } from "models/user";
import { userMapFromList, notEmpty } from "./general";

export interface PieData {
  value: number;
  name: string;
}

export interface PlotData {
  x: number | string;
  y: number;
  name: string;
}

export const countKeyword = (keyword: string, messages: Message[]) => {
  let count = 0;
  let keyMessages: Message[] = [];
  for (const message of messages) {
    const regex = new RegExp(keyword, "g");
    const messageCount = message.text.match(regex)?.length || 0;
    if (messageCount > 0) {
      count += messageCount;
      keyMessages.push(message);
    }
  }
  return { count, keyMessages, keyword };
};

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

export function messagesPerUser(messages: Message[], users: User[]) {
  let userMessageCounts: { [id: string]: number } = {};
  messages.forEach((message) => {
    if (userMessageCounts[message.user] !== undefined) {
      userMessageCounts[message.user] += 1;
    } else {
      userMessageCounts[message.user] = 1;
    }
  });
  let userMap = userMapFromList(users);
  return Object.entries(userMessageCounts)
    .map(([id, count]) => {
      return userMap[id]?.profile
        ? {
            value: count,
            name:
              userMap[id].profile.display_name || userMap[id].profile.real_name,
          }
        : null;
    })
    .filter(notEmpty)
    .sort((a, b) => b.value - a.value);
}
