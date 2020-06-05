import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

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
  res.statusCode = 200;
  res.json({ channels });
};
