import { Request, Response } from "express";
import { TopInputParseService } from '../services/top-input-parse-service';
import { CrosswordEntryService } from "../services/crossword-entry-service";
import { CommandParseResult } from "../models/command-parse-result";
import { FormattedSlackResponse } from "../models/formatted-slack-response";

export function topTimes(req: Request, res: Response, commandResult: CommandParseResult) {
  const channelId = req.body.channel_id;
  if (!channelId) {
    res.status(400).send(`'channel_id' is a required parameter`)
  }

  const topCount = TopInputParseService.tryParse(commandResult.arguments);

  CrosswordEntryService.getTopTimes(topCount, channelId).then((result) => {
    if (result.length === 0) {
      return res.status(200).send(`No results found! Add crosswords results with '/crossword add'`);
    }

    if (result.length === 1) {
      const slackResponse: FormattedSlackResponse = {
        response_type: 'in_channel',
        text: `Your top result is ${result[0].completionTime}`
      }
      return res.status(200).send(slackResponse);
    }

    let responseText = `Your top ${result.length} times:`;
    result.forEach((entry, index) => {
      responseText += `\n${index + 1}) ${entry.completionTime}`;
    })

    const slackResponse: FormattedSlackResponse = {
      response_type: 'in_channel',
      text: responseText
    }

    res.status(200).send(slackResponse);
  });
}
