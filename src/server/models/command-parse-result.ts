import { CommandType } from "./command-type-enum";

export interface CommandParseResult {
  arguments: string;
  commandType: CommandType
}
