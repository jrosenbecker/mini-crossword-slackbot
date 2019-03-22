import { CompletedTime } from "../models/completed-time";
import * as leftPad from 'left-pad';


class TopInputParseService {
  public tryParse(input: string): number {
    if (!input) {
      return 1;
    }
    const result = new Number(input);
    if (!result) {
      return 1;
    }

    return result.valueOf();

  }
}

const service = new TopInputParseService();

export { service as TopInputParseService };
