import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    console.log(
      "N8N WEBHOOK:",
      body
    );


    return NextResponse.json(
      {
        success: true,
        message:
          "n8n webhook received",
      },
      {
        status: 200,
      }
    );

  } catch (error) {

    console.error(
      "N8N WEBHOOK ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Invalid n8n webhook",
      },
      {
        status: 400,
      }
    );
  }
}