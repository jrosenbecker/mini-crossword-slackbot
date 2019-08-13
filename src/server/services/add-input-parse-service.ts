import * as leftPad from 'left-pad';


class AddInputParseService {
  public isGroup(input: string): boolean {
    const regexFormat = /.* group.*/
    const regexMatch = input.match(regexFormat);
    return !!regexMatch;
  }

  public tryParse(input: string): string | null {
    if (!input) {
      return null;
    }

    if (input.startsWith('add ')) {
      input = input.split(' ')[1];
    }
    input = input.trim();
    try {
      let minutes = 59;
      let seconds = 59;
      if (input.startsWith(':')) {
        minutes = 0;
        seconds = +input.substring(1);
      } else {
        const regexFormat = /([0-5]?\d):?([0-5]?\d)/;
        const regexMatch = input.match(regexFormat);
        if (regexMatch && regexMatch.length === 3) {
          minutes = +regexMatch[1];
          seconds = +regexMatch[2];
        }
      }

      const paddedMinutes = leftPad(minutes, 2, '0');
      const paddedSeconds = leftPad(seconds, 2, '0');

      return `${paddedMinutes}:${paddedSeconds}`;
    } catch (error) {
      console.log(JSON.stringify(error));
    }

    return null;
  }
}

const service = new AddInputParseService();

export { service as AddInputParseService };
