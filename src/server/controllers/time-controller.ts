import { Request, Response, Router } from "express";
import { DatesService } from '../services/dates-service';
import { AddInputParseService } from '../services/add-input-parse-service';
import { CrosswordEntryService } from '../services/crossword-entry-service';
import { addTime } from "./add-time";
import { topTimes } from './top-times';
import { CommandParseService } from "../services/command-parse-service";
import { CommandType } from "../models/command-type-enum";
import { unknownCommand } from "./unknownCommand";

class TimeController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.post('/command', (req: Request, res: Response) => {
      const commandResult = CommandParseService.parseCommand(req.body.text);
      const commandType = commandResult.commandType;

      switch (commandType) {
        case CommandType.ADD:
          return addTime(req, res, commandResult);
        case CommandType.TOP:
          return topTimes(req, res, commandResult);
        case CommandType.INVALID:
        default:
          return unknownCommand(req, res);
      }
    });
  }
}

export default new TimeController().router;
