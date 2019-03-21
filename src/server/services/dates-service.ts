import { DateTime, Zone } from "luxon";

class DatesService {
  public getCurrentDateString(): string {
    return DateTime.utc().toISO();
  }
}

const service = new DatesService();

export { service as DatesService };
