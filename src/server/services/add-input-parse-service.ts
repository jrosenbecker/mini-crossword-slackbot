import { CompletedTime } from "../models/completed-time";
import * as leftPad from 'left-pad';


class AddInputParseService {
  public tryParse(input: string): string | null {
    if (!input) {
      return null;
    }

    input = input.trim();
    console.log(input);
    try {
      const regexFormat = /([0-5]?\d):?([0-5]?\d)/;
      const regexMatch = input.match(regexFormat);


    console.log('regexMatch:');
    console.log(JSON.stringify(regexMatch));

    if (regexMatch && regexMatch.length === 3) {
      const minutes = regexMatch[1];
      const seconds = regexMatch[2];

      const paddedMinutes = leftPad(minutes, 2, '0');
      const paddedSeconds = leftPad(seconds, 2, '0');

      return `${paddedMinutes}:${paddedSeconds}`;
    }

    console.log(`Regex Groups`);
    if (regexMatch) {
      console.log(JSON.stringify(regexMatch.groups));
    }
  } catch (error) {
    console.log(JSON.stringify(error));
  }

    return null;
  }
}

const service = new AddInputParseService();

export { service as AddInputParseService };
