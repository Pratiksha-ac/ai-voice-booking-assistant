export interface AvailabilityResult {
  available: boolean;
  date: string;
  time: string;
  message: string;
}

export async function checkCalendarAvailability(
  date: string,
  time: string
): Promise<AvailabilityResult> {

  /*
   * Google Calendar will be connected here later.
   *
   * For now, every requested slot is considered
   * available so we can develop and test the
   * booking system independently.
   */

  return {
    available: true,
    date,
    time,
    message: "Time slot is available",
  };
}