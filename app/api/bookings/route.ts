import { NextResponse } from "next/server";
import { google } from "googleapis";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customer_name,
      customer_phone,
      appointment_date,
      appointment_time,
      appointment_type,
    } = body;

    if (
      !customer_name ||
      !customer_phone ||
      !appointment_date ||
      !appointment_time
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing booking information",
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
          success: false,
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

    const start = new Date(
      `${appointment_date}T${appointment_time}:00`
    );

    const end = new Date(
      start.getTime() + 30 * 60 * 1000
    );

    const event = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `Appointment - ${customer_name}`,

        description: `
Customer: ${customer_name}
Phone: ${customer_phone}
Appointment type: ${appointment_type ?? "General"}
        `,

        start: {
          dateTime: start.toISOString(),
          timeZone: "Asia/Kolkata",
        },

        end: {
          dateTime: end.toISOString(),
          timeZone: "Asia/Kolkata",
        },
      },
    });

    const { data, error } = await supabase
      .from("appointments")
      .insert([
        {
          customer_name,
          customer_phone,
          appointment_date,
          appointment_time,
          appointment_type:
            appointment_type ?? "General",
          status: "confirmed",
          google_event_id:
            event.data.id ?? null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(
        "SUPABASE BOOKING ERROR:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Calendar event created but database save failed",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Appointment booked successfully",
      booking: data,
      google_event_id: event.data.id,
    });

  } catch (error) {
    console.error("BOOKING ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create appointment",
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}