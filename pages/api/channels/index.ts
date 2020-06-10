import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { Channel } from "models/channel";
import { getMessagesForChannel, getUsers } from "./[channelName]";
import { Message } from "models/message";
import { User } from "models/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let channels_string = "";
  try {
    channels_string = await fs.promises.readFile(
      "public/data/channels.json",
      "utf8"
    );
  } catch (err) {
    res.statusCode = 500;
    res.json({
      error: err.message,
      diagonosis: "channels.json file is either missing or misplaced",
    });
    return;
  }
  let channels = JSON.parse(channels_string);
  let messages: Message[] = [];
  let users: User[];
  try {
    users = await getUsers();
    for (const channel of channels) {
      const messagesForChannel = await getMessagesForChannel(channel.name);
      messages = messages.concat(messagesForChannel);
    }
  } catch (err) {
    res.statusCode = 500;
    res.json({
      error: err.message,
      diagonosis:
        "something went wrong when retrieving messages or users for the workspace",
    });
    return;
  }
  res.statusCode = 200;
  res.json({ channels, users, messages });
};
