import { google } from "googleapis";

const calendarId =
  process.env.GOOGLE_CALENDAR_ID;

const clientId =
  process.env.GOOGLE_CLIENT_ID;

const clientSecret =
  process.env.GOOGLE_CLIENT_SECRET;

const refreshToken =
  process.env.GOOGLE_REFRESH_TOKEN;

export async function getCalendarClient() {
  if (
    !calendarId ||
    !clientId ||
    !clientSecret ||
    !refreshToken
  ) {
    return null;
  }

  const auth = new google.auth.OAuth2(
    clientId,
    clientSecret
  );

  auth.setCredentials({
    refresh_token: refreshToken,
  });

  return google.calendar({
    version: "v3",
    auth,
  });
}

export async function checkGoogleCalendarAvailability(
  date: string,
  time: string
) {
  const calendar = await getCalendarClient();

  if (!calendar) {
    return {
      configured: false,
      available: true,
      message:
        "Google Calendar is not configured. Using development availability.",
    };
  }

  const start = new Date(`${date}T${time}:00`);

  const end = new Date(
    start.getTime() + 30 * 60 * 1000
  );

  const response =
    await calendar.freebusy.query({
      requestBody: {
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        items: [
          {
            id: calendarId!,
          },
        ],
      },
    });

  const busy =
    response.data.calendars?.[calendarId!]?.busy ?? [];

  return {
    configured: true,
    available: busy.length === 0,
    message:
      busy.length === 0
        ? "Time slot is available"
        : "Time slot is already booked",
  };
}