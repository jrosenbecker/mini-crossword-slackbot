import { CommandParseResult } from '../models/command-parse-result';
import { CommandType } from '../models/command-type-enum';

const invalidResult: CommandParseResult = { arguments: '', commandType: CommandType.INVALID };

class CommandParseService {
  parseCommand(rawInputText: string): CommandParseResult {
    if (!rawInputText) {
      return invalidResult;
    }

    const inputArray = rawInputText.split(' ');
    if (inputArray.length <= 0) {
      return invalidResult;
    }
    const inputCommand = inputArray[0].toLowerCase();
    let args = '';
    if (inputArray.length > 1) {
      args = rawInputText.substring(rawInputText.indexOf(' '));
    }

    switch (inputCommand) {
      case 'add':
        return { arguments: args, commandType: CommandType.ADD };
      case 'top':
        return { arguments: args, commandType: CommandType.TOP };
      case 'join':
        return { arguments: args, commandType: CommandType.JOIN };
      case 'leave':
        return { arguments: args, commandType: CommandType.LEAVE };
      default:
        return invalidResult;
    }

  }
}

const service = new CommandParseService();
export { service as CommandParseService };
