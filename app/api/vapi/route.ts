import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Vapi webhook is working",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("VAPI WEBHOOK:", body);

    return NextResponse.json({
      success: true,
      message: "Vapi webhook received",
    });
  } catch (error) {
    console.error("VAPI WEBHOOK ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid Vapi webhook request",
      },
      { status: 400 }
    );
  }
}