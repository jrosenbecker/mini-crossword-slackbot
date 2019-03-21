import { Request, Response, Router } from "express";
import { DatesService } from '../services/dates-service';
import { InputParseService } from '../services/input-parse-service';
import { CrosswordEntryService } from '../services/crossword-entry-service';

class TimeController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.post('/add', (req: Request, res: Response) => {
      console.log('Endpoint hit');
      console.log(JSON.stringify(req.body));
      const channelId = req.body.channel_id;
      if (!channelId) {
        res.status(400).send(`'channel_id' is a required parameter`)
      }
      const parsedResult = InputParseService.tryParse(req.body.text);
      console.log(`Parsed input: ${parsedResult}`);
      if (parsedResult && parsedResult !== null) {
        const completedTime = parsedResult as string;
        console.log('Attempting save');
        CrosswordEntryService.save({
          groupId: channelId,
          date: DatesService.getCurrentDateString(),
          completionTime: completedTime
        }).then(() => {
          res.status(200).send(`Successfully added completion time of ${completedTime}!`);
        }).catch((err) => {
          console.error(err);
          console.log('Record save issue');
          res.status(500).send('Something went wrong saving the record');
        });

      } else {
        res.status(400).send('Invalid Input');
      }
    });


    this.router.post('/top', (req: Request, res: Response) => {
      const channelId = req.body.channel_id;
      if (!channelId) {
        res.status(400).send(`'channel_id' is a required parameter`)
      }

      CrosswordEntryService.getTopTimes(10, channelId).then((result) => {

        res.status(200).send(result);
      })
    })
  }
}

export default new TimeController().router;
