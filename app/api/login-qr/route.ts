import { auth } from "@/auth";
import { triggerPusherEvent } from "@/lib/pusher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { channelId, userId } = await request.json();
  console.log(channelId, userId);

  try {
    await triggerPusherEvent(channelId, "login-event", {
      success: true,
      userId: userId,
    });

    return NextResponse.json(
      { success: true, msg: "User authenticated" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
