import { Request, Response } from 'express';

import { CommandParseResult } from '../../../models/command-parse-result';
import { FormattedSlackResponse } from '../../../models/formatted-slack-response';
import { AddInputParseService } from '../../../services/add-input-parse-service';
import { CrosswordEntryService } from '../../../services/crossword-entry-service';
import { DatesService } from '../../../services/dates-service';
import { TopInputParseService } from '../../../services/top-input-parse-service';

export function topTimes(req: Request, res: Response, commandResult: CommandParseResult) {
  const channelId = req.body.channel_id;
  if (!channelId) {
    res.status(400).send(`'channel_id' is a required parameter`)
  }

  const topCount = TopInputParseService.tryParse(commandResult.arguments);

  let crossworderId = req.body.user_id;
  if (AddInputParseService.isGroup(commandResult.arguments)) {
    crossworderId = req.body.channel_id;
  }

  console.log(`topCount: ${topCount}`);
  console.log(`crossworderId: ${crossworderId}`);
  CrosswordEntryService.getTopTimes(topCount, crossworderId).then((result) => {
    if (result.length === 0) {
      return res.status(200).send(`No results found! Add crosswords results with '/crossword add'`);
    }

    if (result.length === 1) {
      const slackResponse: FormattedSlackResponse = {
        response_type: 'in_channel',
        text: `Your top result is ${result[0].completionTime} on ${DatesService.getCentralTimeDate(result[0].date)}`
      }
      return res.status(200).send(slackResponse);
    }

    let responseText = `Your top ${result.length} times:`;
    result.forEach((entry, index) => {
      responseText += `\n${index + 1}) ${entry.completionTime} on ${DatesService.getCentralTimeDate(result[index].date)}`;
    })

    const slackResponse: FormattedSlackResponse = {
      response_type: 'in_channel',
      text: responseText
    }

    res.status(200).send(slackResponse);
  }).catch(err => console.error(err));
}
