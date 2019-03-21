import { Request, Response } from "express";
import { CrosswordEntryService } from "../services/crossword-entry-service";

export function topTimes(req: Request, res: Response) {
  const channelId = req.body.channel_id;
  if (!channelId) {
    res.status(400).send(`'channel_id' is a required parameter`)
  }

  CrosswordEntryService.getTopTimes(10, channelId).then((result) => {
    res.status(200).send(result);
  })
}
