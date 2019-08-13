import { Request, Response } from 'express';
import { indicator } from 'ordinal';

import { CommandParseResult } from '../../../models/command-parse-result';
import { CrossworderType } from '../../../models/crossworder-type-enum';
import { AddInputParseService } from '../../../services/add-input-parse-service';
import { CrosswordEntryService } from '../../../services/crossword-entry-service';
import { DatesService } from '../../../services/dates-service';

export function addTime(req: Request, res: Response, commandResult: CommandParseResult) {
  console.log('Endpoint hit');
  console.log(JSON.stringify(req.body));
  const channelId = req.body.channel_id;
  const teamId = req.body.team_id;
  if (!channelId) {
    return res.status(400).send(`'channel_id' is a required parameter`)
  }

  let crossworderType = CrossworderType.USER;
  let crossworderId = req.body.user_id;

  if (AddInputParseService.isGroup(commandResult.arguments)) {
    crossworderType = CrossworderType.CHANNEL;
    crossworderId = req.body.channel_id;
  }

  const parsedResult = AddInputParseService.tryParse(req.body.text);
  console.log(`Parsed input: ${parsedResult}`);
  if (parsedResult && parsedResult !== null) {
    const completedTime = parsedResult as string;
    const date = DatesService.getCurrentDateString();
    console.log('Attempting save');
    const saveObject = {
      teamId,
      crossworderId,
      crossworderType,
      date,
      completionTime: completedTime
    }
    console.log(saveObject);
    CrosswordEntryService.save(saveObject).then(() => {

      CrosswordEntryService.getAllTopTimes(crossworderId).then((topTimes) => {
        const index = topTimes.findIndex(crosswordEntry => crosswordEntry.date === date);
        const rank = index + 1;
        return res.status(200).send({
          response_type: 'in_channel',
          text: `Successfully added completion time of *${completedTime}*! _This is your *${rank}${indicator(rank)}* best time out of ${topTimes.length}_`
        });
      }).catch((err) => {
        console.error(err);
        return res.status(200).send(`Successfully added completion time of *${completedTime}*! I messed up finding your rank though.`);
      })
      // return res.status(200).send(`Successfully added times to new database!!!`);


    }).catch((err) => {
      console.error(err);
      console.log('Record save issue');
      return res.status(200).send('Uh oh, something went wrong trying to save!');
    });

  } else {
    return res.status(200).send('Please enter a time of the format mm:ss');
  }
}
