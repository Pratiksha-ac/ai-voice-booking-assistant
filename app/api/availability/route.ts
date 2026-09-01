import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { date, time } = body;

    if (!date || !time) {
      return NextResponse.json(
        {
          available: false,
          message: "Date and time are required",
        },
        { status: 400 }
      );
    }

    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (
      !calendarId ||
      !clientId ||
      !clientSecret ||
      !refreshToken
    ) {
      return NextResponse.json(
        {
          available: false,
          message: "Google Calendar is not configured",
        },
        { status: 500 }
      );
    }

    const auth = new google.auth.OAuth2(
      clientId,
      clientSecret
    );

    auth.setCredentials({
      refresh_token: refreshToken,
    });

    const calendar = google.calendar({
      version: "v3",
      auth,
    });

    const start = new Date(`${date}T${time}:00`);

    const end = new Date(
      start.getTime() + 30 * 60 * 1000
    );

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        items: [
          {
            id: calendarId,
          },
        ],
      },
    });

    const busy =
      response.data.calendars?.[calendarId]?.busy ?? [];

    if (busy.length === 0) {
      return NextResponse.json({
        available: true,
        message: "The requested time is available",
      });
    }

    return NextResponse.json({
      available: false,
      message: "The requested time is already booked",
    });
  } catch (error) {
    console.error("CALENDAR ERROR:", error);

    return NextResponse.json(
      {
        available: false,
        message: "Unable to check Google Calendar",
      },
      { status: 500 }
    );
  }
}