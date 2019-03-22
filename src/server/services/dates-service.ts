import { DateTime, Zone } from "luxon";

class DatesService {
  public getCurrentDateString(): string {
    return DateTime.utc().toISO();
  }

  public getCentralTimeDate(utcDateString: string ): string {
    const date: DateTime = DateTime.fromISO(utcDateString);
    return date.setZone('America/Chicago').toLocaleString(DateTime.DATE_SHORT);
  }
}

const service = new DatesService();

export { service as DatesService };
