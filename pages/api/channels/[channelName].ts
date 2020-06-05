import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { Message } from "models/message";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { channelName },
  } = req;
  let messages: Message[] = [];
  try {
    let file_list = await fs.promises.readdir(
      `public/data/${channelName}`,
      "utf8"
    );

    await Promise.all(
      file_list.map(async (file) => {
        let file_messages_json_string = await fs.promises.readFile(
          `public/data/${channelName}/${file}`,
          "utf8"
        );
        const file_messages = JSON.parse(file_messages_json_string);
        messages = messages.concat(file_messages);
      })
    );
  } catch (err) {
    res.statusCode = 500;
    res.json({
      error: err.message,
      diagonosis: `${channelName} is either not a directory or does not contain any json files`,
    });
    return;
  }

  res.statusCode = 200;
  res.json({ messages });
};
