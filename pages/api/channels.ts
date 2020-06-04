import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let channels_string = await fs.promises.readFile(
    "public/data/channels.json",
    "utf8"
  );
  let channels = JSON.parse(channels_string);
  res.statusCode = 200;
  res.json({ channels });
};
